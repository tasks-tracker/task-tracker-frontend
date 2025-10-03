"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TaskCard } from "./task-card";
import { ColumnType } from "@/entities/column/model/types";
import { TaskType } from "@/entities/task/model/types";

export function Column({ column }: { column: ColumnType }) {
  return (
    <Card className="w-72 flex-shrink-0 h-full flex flex-col">
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
