"use client";

import { useState, useReducer, useContext, createContext } from "react";

/* ---------------- CONTEXT ---------------- */

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

/* ---------------- INITIAL TASKS ---------------- */

const initialTasks = [
	{ id: 0, text: "Philosopher’s Path", done: true },
	{ id: 1, text: "Visit the temple", done: false },
	{ id: 2, text: "Drink matcha", done: false },
];

let nextId = 3;

/* ---------------- REDUCER ---------------- */

function tasksReducer(tasks, action) {
	switch (action.type) {
		case "added":
			return [...tasks, { id: action.id, text: action.text, done: false }];

		case "changed":
			return tasks.map((t) => (t.id === action.task.id ? action.task : t));

		case "deleted":
			return tasks.filter((t) => t.id !== action.id);

		default:
			throw Error("Unknown action: " + action.type);
	}
}

/* ---------------- PROVIDER ---------------- */

function TasksProvider({ children }) {
	const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

	return (
		<TasksContext.Provider value={tasks}>
			<TasksDispatchContext.Provider value={dispatch}>
				{children}
			</TasksDispatchContext.Provider>
		</TasksContext.Provider>
	);
}

/* ---------------- HOOKS ---------------- */

function useTasks() {
	return useContext(TasksContext);
}

function useTasksDispatch() {
	return useContext(TasksDispatchContext);
}

/* ---------------- APP ---------------- */

export default function TaskApp() {
	return (
		<TasksProvider>
			<div className="task-app">
				<h1>Day off in Kyoto</h1>
				<AddTask />
				<TaskList />
			</div>
		</TasksProvider>
	);
}

/* ---------------- TASK LIST ---------------- */

function TaskList() {
	const tasks = useTasks();

	return (
		<ul className="task-list">
			{tasks.map((task) => (
				<Task key={task.id} task={task} />
			))}
		</ul>
	);
}

/* ---------------- TASK ITEM ---------------- */

function Task({ task }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(task.text);
	const dispatch = useTasksDispatch();

	return (
		<li className="task-item">
			{/* checkbox */}
			<input
				type="checkbox"
				checked={task.done}
				onChange={(e) =>
					dispatch({
						type: "changed",
						task: { ...task, done: e.target.checked },
					})
				}
			/>

			{/* text / edit mode */}
			{isEditing ? (
				<input value={editText} onChange={(e) => setEditText(e.target.value)} />
			) : (
				<span className={task.done ? "completed" : ""}>{task.text}</span>
			)}

			{/* actions */}
			{isEditing ? (
				<button
					onClick={() => {
						dispatch({
							type: "changed",
							task: { ...task, text: editText },
						});
						setIsEditing(false);
					}}
				>
					Save
				</button>
			) : (
				<button onClick={() => setIsEditing(true)}>Edit</button>
			)}

			<button
				className="delete-btn"
				onClick={() => dispatch({ type: "deleted", id: task.id })}
			>
				Delete
			</button>
		</li>
	);
}

/* ---------------- ADD TASK ---------------- */

function AddTask() {
	const [text, setText] = useState("");
	const dispatch = useTasksDispatch();

	return (
		<div className="task-input">
			<input
				placeholder="Add task"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button
				onClick={() => {
					if (!text.trim()) return;

					dispatch({
						type: "added",
						id: nextId++,
						text,
					});

					setText("");
				}}
			>
				Add
			</button>
		</div>
	);
}
