import React, { useState, useEffect } from 'react';
import { todoApi } from './api';
import { Todo } from './types';
import './App.css';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTodos = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await todoApi.getTodos();
            setTodos(data);
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async () => {
        if (!newTodo.trim()) return;

        try {
            const todo = await todoApi.createTodo({ title: newTodo });
            setTodos([todo, ...todos]);
            setNewTodo('');
        } catch (err) {
            setError('Failed to add todo');
            console.error(err);
        }
    };

    const toggleTodo = async (id: number, completed: boolean) => {
        try {
            const updated = await todoApi.updateTodo(id, { completed: !completed });
            setTodos(todos.map(t => t.id === id ? updated : t));
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(todos.filter(t => t.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
            <h1>Rust + TypeScript Todo</h1>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What needs to be done?"
                    style={{ width: '70%', padding: '10px', marginRight: '10px' }}
                />
                <button onClick={addTodo} style={{ padding: '10px 20px' }}>
                    Add
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {todos.map(todo => (
                        <li key={todo.id} style={{
                            padding: '10px',
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, todo.completed)}
                                    style={{ marginRight: '10px' }}
                                />
                                <span style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#999' : '#000'
                                }}>
                                    {todo.title}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{ padding: '5px 10px', color: 'red' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;