export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
}

export interface CreateTodoRequest {
    title: string;
}

export interface UpdateTodoRequest {
    title?: string;
    completed?: boolean;
}