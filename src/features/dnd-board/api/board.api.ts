import { createInstance } from "@/shared/api/api-instance";
import { BoardResponse } from "../model/types";

export const getDefaultBoard = (userId: string) => {
  return createInstance<BoardResponse>({
    url: `/board/get-full-board?userId=${userId}`,
    method: "GET",
  });
};
