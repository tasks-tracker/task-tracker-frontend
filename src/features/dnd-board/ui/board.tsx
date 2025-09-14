"use client";

import { TaskColumn } from "./task-column";

const columnsData = [
  {
    title: "To Do",
    tasks: [
      { id: 1, title: "Задача 1", description: "Описание задачи 1" },
      { id: 2, title: "Задача 2", description: "Описание задачи 2" },
    ],
  },
  {
    title: "In Progress",
    tasks: [{ id: 3, title: "Задача 3", description: "Описание задачи 3" }],
  },
  {
    title: "Done",
    tasks: [{ id: 4, title: "Задача 4", description: "Описание задачи 4" }],
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 flex gap-6">
      {columnsData.map((column) => (
        <TaskColumn
          key={column.title}
          title={column.title}
          tasks={column.tasks}
        />
      ))}
    </div>
  );
}
