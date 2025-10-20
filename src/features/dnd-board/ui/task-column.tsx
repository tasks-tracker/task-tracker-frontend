"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { TaskCard } from "./task-card";
import { ColumnType, TaskType } from "@/shared/api/generated";
import { Modal } from "@/shared/ui-kit/modal/ui/modal";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { $$boardModel } from "../model/board.model";

export function Column({ column }: { column: ColumnType }) {
  const { taskCreated, columnDeleted } = useUnit({
    taskCreated: $$boardModel.output.taskCreated,
    columnDeleted: $$boardModel.output.columnDeleted,
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

  const handleDeleteColumn = () => {
    columnDeleted({ columnId: column.id });
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{column.title}</CardTitle>

        <div className="flex items-center gap-2">
          <Modal data={{ onSubmit, form, columnId: column.id }}>
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
          </Modal>

          <Modal
            data={{
              onSubmit: handleDeleteColumn,
              form: form,
              columnId: column.id,
            }}
          >
            <Modal.Trigger>
              <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent cursor-pointer transition-colors">
                <Trash />
              </div>
            </Modal.Trigger>
            <Modal.Content>
              <Modal.Header
                title="Удалить колонку"
                description="Вы уверены, что хотите удалить эту колонку? Это действие нельзя отменить."
              />
              <Modal.Footer>
                <DialogClose asChild>
                  <Button variant="outline">Отменить</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  type="button"
                  className="cursor-pointer"
                  onClick={handleDeleteColumn}
                >
                  Удалить
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 flex-grow overflow-y-auto">
        {column.tasks.map((task: TaskType) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </CardContent>
    </Card>
  );
}
