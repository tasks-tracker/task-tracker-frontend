import type { TaskType } from "@/entities/task/model/types";

export type ColumnType = {
  id: string;
  title: string;
  order: number;
  boardId: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  creatorId: string;
  tasks: TaskType[];
};
