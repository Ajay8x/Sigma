import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDoList.css";

export default function TodoList() {
    let [todos, setTodos] = useState([
        { task: "sample-task", id: uuidv4(), isDone: false }
    ]);

    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { task: newTodo, id: uuidv4(), isDone: false }
        ]);
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== id)
        );
    };

    let markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true
            }))
        );
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: true } : todo
            )
        );
    };

    return (
        <div className="todo-container">
            <h2 className="title">My Todo App</h2>

            <div className="input-group">
                <input
                    placeholder="Add a task..."
                    value={newTodo}
                    onChange={updateTodoValue}
                />
                <button onClick={addNewTask}>Add</button>
            </div>

            <h4>Tasks</h4>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={todo.isDone ? "done" : ""}>
                        <span>{todo.task}</span>
                        <div className="actions">
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                            <button className="done-btn" onClick={() => markAsDone(todo.id)}>
                                Done
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <button className="mark-all" onClick={markAllDone}>
                Mark All Done
            </button>
        </div>

    );
}
