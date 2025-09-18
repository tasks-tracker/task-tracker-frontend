"use client";

"use client";

import { Column } from "./task-column";

const columns = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { title: "Сверстать логин", description: "Сделать форму с валидацией" },
      {
        title: "Добавить регистрацию",
        description: "Подключить zod + react-hook-form",
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [
      { title: "Google Auth", description: "Интеграция через NextAuth" },
      { title: "Подключить бэкенд", description: "REST API + Effector" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        title: "Создать проект",
        description: "Next.js + Tailwind + shadcn/ui",
      },
      { title: "Сверстать главную", description: "Простой layout" },
    ],
  },
];

export function Board() {
  return (
    <main className="flex gap-4 p-6 h-[calc(100vh-64px)] overflow-x-auto">
      {columns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </main>
  );
}
