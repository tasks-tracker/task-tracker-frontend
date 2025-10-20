"use client";

import { useGate, useUnit } from "effector-react";
import { $$boardModel } from "../model/board.model";
import { Column } from "./task-column";
import { ColumnType } from "@/shared/api/generated";
import { Plus } from "lucide-react";
import { Modal } from "@/shared/ui-kit/modal";
import { Button } from "@/shared/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Board() {
  const formSchema = z.object({
    title: z.string().min(1, "Название колонки обязательно"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
    },
  });

  useGate($$boardModel.gates.DashboardGate);

  const { columns, isLoading, board, columnCreated } = useUnit({
    board: $$boardModel.output.board,
    columns: $$boardModel.output.columns,
    isLoading: $$boardModel.output.boardPending,
    columnCreated: $$boardModel.output.columnCreated,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    columnCreated({
      title: data.title,
      boardId: board?.board.id ?? "",
      order: columns.length + 1,
    });
  };

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Modal data={{ onSubmit, form }}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{board?.board.title}</h1>
          <Modal.Trigger>
            <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent cursor-pointer transition-colors">
              <Plus />
            </div>
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header
              title="Добавить колонку"
              description="Добавьте новую колонку в доску"
            />
            <Modal.Input
              label="Название колонки"
              name="title"
              placeholder="Введите название колонки"
            />
            <Modal.Footer>
              <Button type="submit" className="cursor-pointer">
                Добавить колонку
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </div>

        <div className="flex gap-4 overflow-x-auto h-screen p-4">
          {columns.map((column: ColumnType) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
