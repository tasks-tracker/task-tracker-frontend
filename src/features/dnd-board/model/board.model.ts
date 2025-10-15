import { createEffect, createStore, sample, createEvent } from "effector";
import { createGate } from "effector-react";
import { $user } from "@/entities/user";
import {
  BoardResponseResult,
  CreateTaskRequest,
  DeleteTaskRequest,
  RenameTaskRequest,
  TaskType,
} from "@/shared/api/generated";
import { api } from "@/shared/api";

// Создаем общий стор для доски
const $board = createStore<BoardResponseResult | null>(null);

// Для удобства создадим маленькие сторы для колонок с задачами (это не обязательно, просто показываю что так тоже делают)
const $columns = $board.map((board) => board?.columns || []);
const $taskTitle = createStore<RenameTaskRequest | null>(null);
const $task = createStore<TaskType | null>(null);

const DashboardGate = createGate("DashboardGate");

const taskTitleChanged = createEvent<RenameTaskRequest>();
const taskDeleted = createEvent<DeleteTaskRequest>();
const taskCreated = createEvent<CreateTaskRequest>();

// Тут я изменил на метод из api
// Получение доски
const fetchBoardFx = createEffect(async (userId: string) => {
  return await api.getFullBoard({
    userId,
  });
});

// Изменение названия задачи
const changeTaskTitleFx = createEffect(
  async ({ taskId, newTitle }: RenameTaskRequest) => {
    return await api.renameTask({
      taskId,
      newTitle,
    });
  },
);

// Удаление задачи
const deleteTaskFx = createEffect(async ({ taskId }: DeleteTaskRequest) => {
  return await api.deleteTask({
    taskId,
  });
});

// Создание задачи
const createTaskFx = createEffect(async (task: CreateTaskRequest) => {
  return await api.createTask({
    ...task,
  });
});

// Тут прогон такой, шо
// 1. Крче useGate это как useEffect только нужен для синхронизациии жизненного цикла компонента с эффектором,
// когда срабатывает событие open, то запускается прогон собственно
// 2. source: $user, это тот стор, из которого мы будем брать данные нужно для запроса на доску
// 3. filter: Boolean, это условие, при котором прогон будет происходить
// 4. fn: (user) => user.id ?? '', это функция, которая будет преобразовывать данные
// 5. target: fetchBoardFx это эфект, который будет происходить
sample({
  clock: DashboardGate.open,
  source: $user,
  filter: Boolean,
  fn: (user) => user.id ?? "",
  target: fetchBoardFx,
});

// Дополнительный sample: если пользователь загрузился позже, чем открылся Gate
// (например, при перезагрузке страницы /dashboard)
sample({
  clock: $user,
  source: DashboardGate.status,
  filter: (isOpen, user) => isOpen && Boolean(user),
  fn: (_, user) => user!.id ?? "",
  target: fetchBoardFx,
});

// Тут всё просто
// 1. Когда данные получены fetchBoardFx.doneData,
// 2. Берем только result из данных согласно ответу от бэка
// 3. И записываем в стор $board
sample({
  clock: fetchBoardFx.doneData,
  fn: (data) => data.result,
  target: $board,
});

sample({
  clock: taskTitleChanged,
  source: $taskTitle,
  filter: Boolean,
  fn: ({ newTitle, taskId }) => ({ newTitle: newTitle.trim(), taskId }),
  target: changeTaskTitleFx,
});

// Удаление задачи
sample({
  clock: taskDeleted,
  fn: ({ taskId }) => ({ taskId }),
  target: deleteTaskFx,
});

sample({
  clock: deleteTaskFx.doneData,
  source: $user,
  filter: (user, data) => Boolean(user) && data.status === "SUCCESS",
  fn: (user) => user!.id ?? "",
  target: fetchBoardFx,
});

// Создание задачи
sample({
  clock: taskCreated,
  fn: (task) => task,
  target: createTaskFx,
});

// После успешного создания задачи обновляем доску
sample({
  clock: createTaskFx.doneData,
  source: $user,
  filter: (user, data) => Boolean(user) && data.status === "SUCCESS",
  fn: (user) => user!.id ?? "",
  target: fetchBoardFx,
});

// Это нужно для того чтобы можно было использовать этот модуль в других модулях или компонентах
export const $$boardModel = {
  output: {
    board: $board,
    columns: $columns,
    task: $task,
    taskDeleted,
    taskCreated,
  },
  effects: {
    fetchBoardFx,
    createTaskFx,
  },
  gates: {
    DashboardGate,
  },
};
