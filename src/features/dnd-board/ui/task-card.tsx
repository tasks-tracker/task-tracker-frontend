"use client";

"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

interface TaskCardProps {
  title: string;
  description: string;
}

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition">
      <CardHeader className="p-3 space-y-2">
        <CardTitle className="text-base font-semibold leading-tight">
          {title}
        </CardTitle>

        <CardDescription className="text-sm text-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
