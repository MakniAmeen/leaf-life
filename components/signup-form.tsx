"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, UserPlus, Leaf, Heart } from "lucide-react";
import Image from "next/image";

export function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    job: "",
    passion: "",
    bestPlant: "",
    favoritePlantType: "",
    gardeningExperience: "",
    plantGoals: "",
    favoriteSeason: "",
    gardenSize: "",
    socialMedia: "",
    bio: "",
    avatar: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData((prev) => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await signUp(formData, formData.password);

      if (error) {
        alert(`Error creating account: ${error.message}`);
      } else {
        alert(
          "Account created successfully! Please check your email to verify your account."
        );
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join Our <span className="text-primary">Plant Community</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Create your profile and connect with fellow plant enthusiasts
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                    Basic Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Sarah Johnson"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., sarah@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Where are you from? *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job">What do you do for work? *</Label>
                    <Input
                      id="job"
                      name="job"
                      value={formData.job}
                      onChange={handleInputChange}
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Tell us about yourself</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Share a bit about yourself and your interests..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Plant Passion Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2 flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Your Plant Journey
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="passion">
                      What's your passion about plants? *
                    </Label>
                    <Textarea
                      id="passion"
                      name="passion"
                      value={formData.passion}
                      onChange={handleInputChange}
                      placeholder="e.g., I love watching them grow and caring for them..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestPlant">What's your best plant? *</Label>
                    <Input
                      id="bestPlant"
                      name="bestPlant"
                      value={formData.bestPlant}
                      onChange={handleInputChange}
                      placeholder="e.g., My Monstera Deliciosa"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoritePlantType">
                      Favorite plant type *
                    </Label>
                    <select
                      id="favoritePlantType"
                      name="favoritePlantType"
                      value={formData.favoritePlantType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select your favorite</option>
                      <option value="Succulents">Succulents</option>
                      <option value="Tropical Plants">Tropical Plants</option>
                      <option value="Flowering Plants">Flowering Plants</option>
                      <option value="Herbs">Herbs</option>
                      <option value="Trees">Trees</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Cacti">Cacti</option>
                      <option value="Ferns">Ferns</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gardeningExperience">
                      Gardening experience *
                    </Label>
                    <select
                      id="gardeningExperience"
                      name="gardeningExperience"
                      value={formData.gardeningExperience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select your level</option>
                      <option value="Beginner">Beginner (0-1 years)</option>
                      <option value="Intermediate">
                        Intermediate (1-5 years)
                      </option>
                      <option value="Advanced">Advanced (5-10 years)</option>
                      <option value="Expert">Expert (10+ years)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plantGoals">
                      What are your plant goals? *
                    </Label>
                    <Textarea
                      id="plantGoals"
                      name="plantGoals"
                      value={formData.plantGoals}
                      onChange={handleInputChange}
                      placeholder="e.g., Create a jungle in my living room, grow my own herbs..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteSeason">
                      Favorite growing season *
                    </Label>
                    <select
                      id="favoriteSeason"
                      name="favoriteSeason"
                      value={formData.favoriteSeason}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select season</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gardenSize">
                      Garden/Plant space size *
                    </Label>
                    <select
                      id="gardenSize"
                      name="gardenSize"
                      value={formData.gardenSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      required
                    >
                      <option value="">Select size</option>
                      <option value="Indoor only">Indoor only</option>
                      <option value="Small balcony">Small balcony</option>
                      <option value="Medium garden">Medium garden</option>
                      <option value="Large garden">Large garden</option>
                      <option value="Greenhouse">Greenhouse</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialMedia">Social Media (optional)</Label>
                    <Input
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
                      placeholder="e.g., @plantlover_instagram"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Profile Picture
                </h3>
                <div className="space-y-4">
                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  {avatarPreview && (
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 border rounded-full overflow-hidden">
                        <Image
                          src={avatarPreview}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your profile picture preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Join PlantCare Hub
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
