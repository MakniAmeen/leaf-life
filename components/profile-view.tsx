"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Briefcase,
  Heart,
  Leaf,
  Calendar,
  ShoppingBag,
  Edit3,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { ProfileEditForm } from "./profile-edit-form";

export function ProfileView() {
  const router = useRouter();
  const { user, signOut, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Please sign in to view your profile
          </h1>
          <div className="space-x-4">
            <Button onClick={() => router.push("/signin")}>Sign In</Button>
            <Button variant="outline" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return <ProfileEditForm onCancel={() => setIsEditing(false)} />;
  }

  const joinDate = new Date(user.joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            My <span className="text-primary">Profile</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="Profile picture"
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="flex-1"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Job
                    </p>
                    <p className="text-foreground">{user.job}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-foreground">{joinDate}</p>
                  </div>
                </div>
                {user.bio && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Bio
                    </p>
                    <p className="text-foreground">{user.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Plant Passion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Plant Passion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Passion
                  </p>
                  <p className="text-foreground">{user.passion}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Best Plant
                  </p>
                  <p className="text-foreground">{user.bestPlant}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Plant Goals
                  </p>
                  <p className="text-foreground">{user.plantGoals}</p>
                </div>
              </CardContent>
            </Card>

            {/* Plant Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Plant Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Favorite Plant Type
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {user.favoritePlantType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Experience Level
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {user.gardeningExperience}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Favorite Season
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {user.favoriteSeason}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Garden Size
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {user.gardenSize}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {user.totalOrders}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Orders Placed
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {user.favoriteCategories?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Favorite Categories
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {Math.floor(
                        (Date.now() - new Date(user.joinDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Days as Member
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {user.socialMedia && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Social Media
                  </p>
                  <p className="text-foreground">{user.socialMedia}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
