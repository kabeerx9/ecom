"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ADDRESSES = [
  {
    id: "addr_0001",
    name: "Hostel Room",
    line1: "Room 204, Vyas Bhawan",
    line2: "BITS Pilani, Pilani Campus",
    city: "Pilani",
    state: "Rajasthan",
    zip: "333031",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr_0002",
    name: "Home",
    line1: "123 Lake View",
    line2: "Gandhinagar",
    city: "Ahmedabad",
    state: "Gujarat",
    zip: "380001",
    country: "India",
    isDefault: false,
  },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Addresses</h1>
          <p className="text-sm text-muted-foreground">Manage your shipping addresses.</p>
        </div>
        <Button size="sm">Add address</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ADDRESSES.map((a) => (
          <Card key={a.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">{a.name}</CardTitle>
              {a.isDefault ? <Badge variant="secondary">Default</Badge> : null}
            </CardHeader>
            <CardContent className="text-sm">
              <div className="text-foreground">
                {a.line1}
                <br />
                {a.line2}
                <br />
                {a.city}, {a.state} {a.zip}
                <br />
                {a.country}
              </div>
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
                {!a.isDefault && (
                  <Button size="sm" className="ml-auto">
                    Set default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
