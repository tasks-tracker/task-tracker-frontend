"use client";

import { TaskCard } from "./task-card";

interface Task {
  title: string;
  description: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="flex-1 min-w-[300px] max-w-[400px] bg-muted rounded-xl p-4 flex flex-col">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.map((task, i) => (
          <TaskCard key={i} title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
}
