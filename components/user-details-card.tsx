"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Mail, Clock, IdCard } from "lucide-react";

interface UserDetailsCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{user.name}</CardTitle>
            <CardDescription className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User ID */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <IdCard className="h-4 w-4" />
              User ID
            </div>
            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
              {user.id}
            </p>
          </div>

          {/* Email Verification Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Mail className="h-4 w-4" />
              Email Status
            </div>
            <Badge variant={user.emailVerified ? "default" : "destructive"}>
              {user.emailVerified ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          {/* Account Created - only show if available */}
          {user.createdAt && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Account Created
              </div>
              <p className="text-sm">{formatDate(user.createdAt)}</p>
            </div>
          )}

          {/* Last Updated - only show if available */}
          {user.updatedAt && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last Updated
              </div>
              <p className="text-sm">{formatDate(user.updatedAt)}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Simplified Account Summary */}
        <div className="space-y-4">
          <h4 className="font-medium">Account Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {user.emailVerified ? "✅" : "❌"}
              </div>
              <div className="text-sm font-medium">Email Verification</div>
              <div className="text-xs text-muted-foreground">
                {user.emailVerified ? "Verified" : "Pending"}
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">👤</div>
              <div className="text-sm font-medium">Account Type</div>
              <div className="text-xs text-muted-foreground">
                Google Account
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
