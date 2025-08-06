import { api } from "@/shared/api/baseApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TasksKeys } from "./keys/tasksKets";
import { IGetTasksResponse } from "./responses/getTaskResponse";
import { ICreateTaskValues } from "./values/createTaskValue";


export const useTasksServices = (options: {id?: string }) => {

    const getTasks = useQuery({
        queryKey: [TasksKeys.GETTASKS],
        queryFn: async () => {
            return await api.get<IGetTasksResponse[]>('/tasks');
        }
    });

    const createTask = useMutation({
        mutationFn: (data: ICreateTaskValues) => {
            return api.post('/tasks', data.body);
        },
        mutationKey: [TasksKeys.CREATETASK],
        async onSuccess() {
            await getTasks.refetch();
        },
    })

    const updateTask = useMutation({
        mutationFn: (data: { id: string | number; body: any }) => {
            return api.put(`/tasks/${data.id}`, data.body);
        },
        mutationKey: [TasksKeys.UPDATETASK],
    });

    const deleteTask = useMutation({
        mutationFn: (id: string | number) => {
            return api.delete(`/tasks/${id}`);
        },
        mutationKey: [TasksKeys.DELETETASK],
    });

    const getTask = useQuery({
        queryKey: [TasksKeys.GETTASK, options.id],
        queryFn: ({ queryKey }) => {
            const [, id] = queryKey;
            return api.get<IGetTasksResponse>(`/tasks/${id}`);
        },
        enabled: options?.id !== undefined && options.id?.length > 0, // This query will be manually triggered
    });

    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        getTask,
    };

}
