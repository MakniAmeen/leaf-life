"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, Save, X } from "lucide-react";
import Image from "next/image";

interface ProfileEditFormProps {
  onCancel: () => void;
}

export function ProfileEditForm({ onCancel }: ProfileEditFormProps) {
  const { user, updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    location: user?.location || "",
    job: user?.job || "",
    passion: user?.passion || "",
    bestPlant: user?.bestPlant || "",
    favoritePlantType: user?.favoritePlantType || "",
    gardeningExperience: user?.gardeningExperience || "",
    plantGoals: user?.plantGoals || "",
    favoriteSeason: user?.favoriteSeason || "",
    gardenSize: user?.gardenSize || "",
    socialMedia: user?.socialMedia || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
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

    try {
      updateProfile(formData);
      alert("Profile updated successfully!");
      onCancel();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Edit <span className="text-primary">Profile</span>
          </h1>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Your Information</CardTitle>
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
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job">Job *</Label>
                    <Input
                      id="job"
                      name="job"
                      value={formData.job}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Plant Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                    Plant Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="passion">Passion about plants *</Label>
                    <Textarea
                      id="passion"
                      name="passion"
                      value={formData.passion}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestPlant">Best plant *</Label>
                    <Input
                      id="bestPlant"
                      name="bestPlant"
                      value={formData.bestPlant}
                      onChange={handleInputChange}
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
                      Experience level *
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
                    <Label htmlFor="plantGoals">Plant goals *</Label>
                    <Textarea
                      id="plantGoals"
                      name="plantGoals"
                      value={formData.plantGoals}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteSeason">Favorite season *</Label>
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
                    <Label htmlFor="gardenSize">Garden size *</Label>
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
                    <Label htmlFor="socialMedia">Social Media</Label>
                    <Input
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
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

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
