"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TaskCard } from "./task-card";
import { ColumnType, TaskType } from "@/shared/api/generated";
import { Modal } from "@/shared/ui-kit/modal/ui/modal";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { $$boardModel } from "../model/board.model";

export function Column({ column }: { column: ColumnType }) {
  const { taskCreated } = useUnit({
    taskCreated: $$boardModel.output.taskCreated,
  });

  const formSchema = z.object({
    taskName: z.string().min(1, "Название задачи обязательно"),
    taskDescription: z.string().min(1, "Описание задачи обязательно"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      taskName: "",
      taskDescription: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    taskCreated({
      title: data.taskName,
      description: data.taskDescription,
      columnId: column.id,
      userId: column.ownerId,
      order: column.tasks.length + 1,
    });
  };

  return (
    <Modal data={{ onSubmit, form, columnId: column.id }}>
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{column.title}</CardTitle>
          <Modal.Trigger>
            <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent cursor-pointer transition-colors">
              <Plus />
            </div>
          </Modal.Trigger>

          <Modal.Content>
            <Modal.Header
              title="Добавить задачу"
              description="Добавьте новую задачу в колонку"
            />
            <Modal.Input
              label="Task Name"
              name="taskName"
              placeholder="Введите название задачи"
            />

            <Modal.Input
              label="Task Description"
              name="taskDescription"
              placeholder="Введите описание задачи"
            />
            <Modal.Footer>
              <DialogClose asChild>
                <Button variant="outline">Отменить</Button>
              </DialogClose>
              <Button type="submit" disabled={!form.formState.isValid}>
                Добавить задачу
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 flex-grow overflow-y-auto">
          {column.tasks.map((task: TaskType) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </CardContent>
      </Card>
    </Modal>
  );
}
