"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { TaskType } from "@/shared/api/generated";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui-kit/modal/ui/modal";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DialogClose } from "@/shared/ui/dialog";
import { useUnit } from "effector-react";
import { $$boardModel } from "../model/board.model";

export function TaskCard({ task }: { task: TaskType }) {
  const { deleteTask } = useUnit({
    deleteTask: $$boardModel.output.taskDeleted,
  });

  const handleDeleteTask = () => {
    deleteTask({ taskId: task.id });
  };

  return (
    <Card className="shadow-sm border mb-2 p-2 flex flex-col gap-4 min-h-[100px]">
      <CardHeader className="p-0 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-base">{task.title}</CardTitle>

        <div className="flex gap-1">
          <Modal>
            <Modal.Trigger>
              <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent cursor-pointer transition-colors">
                <Pencil className="h-3.5 w-3.5" />
              </div>
            </Modal.Trigger>

            <Modal.Content>
              <Modal.Header
                title="Редактировать задачу"
                description="Внесите изменения в задачу"
              />

              <Modal.Input
                label="Название"
                name="title"
                value={task.title}
                placeholder="Введите название задачи"
              />

              <Modal.Input
                label="Описание"
                name="description"
                value={task.description || ""}
                placeholder="Введите описание задачи"
              />

              <Modal.Footer>
                <Button type="submit">Сохранить изменения</Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Trigger>
              <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors">
                <Trash className="h-3.5 w-3.5" />
              </div>
            </Modal.Trigger>

            <Modal.Content>
              <Modal.Header
                title="Удалить задачу"
                description="Вы уверены, что хотите удалить эту задачу? Это действие нельзя отменить."
              />

              <Modal.Footer>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Отмена
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDeleteTask}
                >
                  Удалить
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>

      <CardFooter className="p-0 flex items-center gap-2 justify-between">
        {/* TODO: add assignee avatar */}
        <Avatar className="h-6 w-6">
          <AvatarImage alt="avatar" src={"https://github.com/shadcn.png"} />
          <AvatarFallback>{task.title?.charAt(0)}</AvatarFallback>
        </Avatar>

        <p className="text-sm text-muted-foreground">{task.createdAt}</p>
      </CardFooter>
    </Card>
  );
}
