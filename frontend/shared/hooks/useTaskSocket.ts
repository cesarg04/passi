import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import io from "socket.io-client";
import { TasksKeys } from "../services/tasks/keys/tasksKets";
import { IGetTasksResponse } from "../services/tasks/responses/getTaskResponse";
import useAuthStore from "../store/auth/AuthStore";

export const useTaskSocket = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  useEffect(() => {
    const socket = io("http://localhost:3000/tasks", {
      auth: { token: token },
    });

    // Cuando una tarea es creada
    socket.on("task:created", (task: IGetTasksResponse) => {
      queryClient.setQueryData([TasksKeys.GETTASKS], (oldData: any) => {
        if (!oldData) return { data: [task] };
        return {
          ...oldData,
          data: [...oldData.data, task],
        };
      });
    });

    // Cuando una tarea es actualizada
    socket.on("task:updated", (updatedTask: IGetTasksResponse) => {
      console.log("Task updated:", updatedTask);

      queryClient.setQueryData([TasksKeys.GETTASKS], (oldData: any) => {
        console.log("old data", oldData);

        if (!oldData?.data) return oldData;

        return {
          ...oldData,
          data: oldData.data.map((task: IGetTasksResponse) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        };
      });
    });

    // Cuando una tarea es eliminada
    socket.on("task:deleted", ({ id }: { id: number }) => {
      queryClient.setQueryData([TasksKeys.GETTASKS], (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: oldData.data.filter(
            (task: IGetTasksResponse) => task.id !== id
          ),
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, token]);
};
