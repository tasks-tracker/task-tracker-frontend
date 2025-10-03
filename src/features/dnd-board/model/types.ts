import type { BoardType } from "@/entities/board/model/types";
import type { ColumnType } from "@/entities/column/model/types";

export type BoardResponse = {
  board: BoardType;
  columns: ColumnType[];
};
