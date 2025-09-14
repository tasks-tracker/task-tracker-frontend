"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";

interface TaskCardProps {
  title: string;
  description: string;
}

export function TaskCard({ title, description }: TaskCardProps) {
  return (
    <Card className="p-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
