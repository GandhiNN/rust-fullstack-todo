import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoApi = {
    // Get all todos
    getTodos: async (): Promise<Todo[]> => {
        const response = await api.get<Todo[]>('/todos');
        return response.data;
    },

    // Create a new todo
    createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
        const response = await api.post<Todo>('/todos', data);
        return response.data;
    },

    // Update a todo
    updateTodo: async (id: number, data: UpdateTodoRequest): Promise<Todo> => {
        const response = await api.put<Todo>(`/todos/${id}`, data);
        return response.data;
    },

    // Delete a todo
    deleteTodo: async (id: number): Promise<void> => {
        await api.delete(`/todos/${id}`);
    },
};
