"use client";

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Task } from "../model/types";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="shadow-sm border mb-2">
      <CardHeader className="p-2 pb-1">
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-0">
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
}
