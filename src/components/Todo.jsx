import { useState } from "react";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim) return;
        setTodos((prev) => [
            ...prev,
            { text: input, completed: false, id: Date.now() },
        ]);
        setInput("");
    };

    const deleteTask = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };
    const taskStatus = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(({ text, completed, id }) => (
                    <li key={id}>
                        <span
                            style={{
                                textDecoration: completed
                                    ? "line-through"
                                    : "none",
                            }}>
                            {text}
                        </span>

                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={() => taskStatus(id)}
                        />

                        <button onClick={() => deleteTask(id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
