"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TaskCard } from "./task-card";
import { ColumnType, TaskType } from "@/shared/api/generated";

export function Column({ column }: { column: ColumnType }) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {column.tasks.map((task: TaskType) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
