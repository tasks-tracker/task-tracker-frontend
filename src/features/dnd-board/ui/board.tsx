"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";

const columns = [
  {
    id: "todo",
    title: "To Do",
    tasks: ["Сверстать логин", "Добавить валидацию", "Сделать регистрацию"],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: ["Подключить бэкенд", "Настроить Google Auth"],
  },
  {
    id: "done",
    title: "Done",
    tasks: ["Создать проект", "Поднять Next.js"],
  },
];

export default function DashboardPage() {
  return (
    <main className="flex gap-4 p-6 h-[calc(100vh-64px)] overflow-x-auto">
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex-1 min-w-[300px] max-w-[400px] bg-muted rounded-xl p-4 flex flex-col"
        >
          <h2 className="font-bold text-lg mb-4">{col.title}</h2>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {col.tasks.map((task, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">{task}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
