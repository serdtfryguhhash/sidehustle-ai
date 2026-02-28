"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User, Lock, Bell, CreditCard, Shield, Trash2,
  Camera, Save,
} from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    full_name: "John Doe",
    email: "john@example.com",
    avatar_url: "",
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account, billing, and preferences</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">JD</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5"><Camera className="w-3.5 h-3.5" />Change Photo</Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>
            <Button className="gap-1.5"><Save className="w-4 h-4" />Save Changes</Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" />Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold">Free Plan</span>
                  <Badge variant="outline">Current</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Basic access to SideHustle.ai</p>
              </div>
              <Button className="gap-1.5">Upgrade to Pro</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Weekly newsletter", description: "Side hustle tips and ideas every Tuesday", defaultChecked: true },
              { label: "Income milestones", description: "Get notified when you hit income milestones", defaultChecked: true },
              { label: "Community replies", description: "When someone replies to your forum posts", defaultChecked: true },
              { label: "Product updates", description: "New features and improvements", defaultChecked: false },
            ].map((notif) => (
              <div key={notif.label} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{notif.label}</div>
                  <div className="text-xs text-muted-foreground">{notif.description}</div>
                </div>
                <input type="checkbox" defaultChecked={notif.defaultChecked} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" />Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="gap-1.5"><Lock className="w-4 h-4" />Change Password</Button>
            <Separator />
            <div>
              <h4 className="font-medium text-sm text-destructive mb-2">Danger Zone</h4>
              <Button variant="destructive" size="sm" className="gap-1.5"><Trash2 className="w-3.5 h-3.5" />Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
