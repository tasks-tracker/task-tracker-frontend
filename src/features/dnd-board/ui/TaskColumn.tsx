"use client";

import { TaskCard } from "./TaskCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";

interface TaskColumnProps {
  title: string;
  tasks: { id: number; title: string; description: string }[];
}

export function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div className="flex flex-col gap-4 w-64">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
