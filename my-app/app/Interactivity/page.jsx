"use client";

import { useState } from "react";

// Reqeust Counter Challenge
// export default function RequestTracker() {
// 	const [pending, setPending] = useState(0);
// 	const [completed, setCompleted] = useState(0);

// 	async function handleClick() {
// 		setPending(pending + 1);
// 		await delay(3000);
// 		setPending(pending - 1);
// 		setCompleted(completed + 1);
// 	}

// 	return (
// 		<>
// 			<h3>Pending: {pending}</h3>
// 			<h3>Completed: {completed}</h3>
// 			<button onClick={handleClick}>Buy</button>
// 		</>
// 	);
// }

// function delay(ms) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, ms);
// 	});
// }

//State Queue Challenge
// function increment(n) {
// 	return n + 1;
// }
// increment.toString = () => "n => n+1";

// function getFinalState(baseState, queue) {
// 	let state = baseState;

// 	for (const update of queue) {
// 		if (typeof update === "function") {
// 			state = update(state);
// 		} else {
// 			state = update;
// 		}
// 	}

// 	return state;
// }

// export default function App() {
// 	return (
// 		<>
// 			<TestCase baseState={0} queue={[1, 1, 1]} expected={1} />
// 			<hr />
// 			<TestCase baseState={0} queue={[increment, increment, increment]} expected={3} />
// 			<hr />
// 			<TestCase baseState={0} queue={[5, increment]} expected={6} />
// 			<hr />
// 			<TestCase baseState={0} queue={[5, increment, 42]} expected={42} />
// 		</>
// 	);
// }

// function TestCase({ baseState, queue, expected }) {
// 	const actual = getFinalState(baseState, queue);

// 	return (
// 		<>
// 			<p>
// 				Base state: <b>{baseState}</b>
// 			</p>

// 			<p>
// 				Queue: <b>[{queue.join(", ")}]</b>
// 			</p>

// 			<p>
// 				Expected result: <b>{expected}</b>
// 			</p>

// 			<p
// 				style={{
// 					color: actual === expected ? "green" : "red",
// 				}}
// 			>
// 				Your result: <b>{actual}</b> ({actual === expected ? "correct" : "wrong"})
// 			</p>
// 		</>
// 	);
// }

//Incorrect State Updates Challenge
export default function Scoreboard() {
	const [player, setPlayer] = useState({
		firstName: "Ranjani",
		lastName: "Shettar",
		score: 10,
	});

	function handlePlusClick() {
		setPlayer({
			...player,
			score: player.score + 1,
		});
	}

	function handleFirstNameChange(e) {
		setPlayer({
			...player,
			firstName: e.target.value,
		});
	}

	function handleLastNameChange(e) {
		setPlayer({
			...player,
			lastName: e.target.value,
		});
	}

	return (
		<>
			<label>
				Score: <b>{player.score}</b> <button onClick={handlePlusClick}>+1</button>
			</label>
			<label>
				First name:
				<input value={player.firstName} onChange={handleFirstNameChange} />
			</label>
			<label>
				Last name:
				<input value={player.lastName} onChange={handleLastNameChange} />
			</label>
		</>
	);
}

// Find and Fix Mutation Challenge

// const initialPosition = {
// 	x: 0,
// 	y: 0,
// };

// function Background({ position }) {
// 	return (
// 		<div
// 			style={{
// 				position: "absolute",
// 				width: 400,
// 				height: 400,
// 				border: "2px solid gray",
// 				transform: `translate(${position.x}px, ${position.y}px)`,
// 			}}
// 		/>
// 	);
// }

// export default function Canvas() {
// 	const [shape, setShape] = useState({
// 		color: "orange",
// 		position: initialPosition,
// 	});

// 	function handleMove(dx, dy) {
// 		setShape((prevShape) => ({
// 			...prevShape,
// 			position: {
// 				x: prevShape.position.x + dx,
// 				y: prevShape.position.y + dy,
// 			},
// 		}));
// 	}

// 	function handleColorChange(e) {
// 		setShape((prevShape) => ({
// 			...prevShape,
// 			color: e.target.value,
// 		}));
// 	}

// 	return (
// 		<>
// 			<select className="dropdown" value={shape.color} onChange={handleColorChange}>
// 				<option className="color-option" value="orange">
// 					orange
// 				</option>

// 				<option className="color-option" value="lightpink">
// 					lightpink
// 				</option>

// 				<option className="color-option" value="aliceblue">
// 					aliceblue
// 				</option>
// 			</select>

// 			<section>
// 				<Background position={initialPosition} />

// 				<Box color={shape.color} position={shape.position} onMove={handleMove}>
// 					Drag me!
// 				</Box>
// 			</section>
// 		</>
// 	);
// }

// function Box({ children, color, position, onMove }) {
// 	const [lastCoordinates, setLastCoordinates] = useState(null);

// 	function handlePointerDown(e) {
// 		e.target.setPointerCapture(e.pointerId);

// 		setLastCoordinates({
// 			x: e.clientX,
// 			y: e.clientY,
// 		});
// 	}

// 	function handlePointerMove(e) {
// 		if (lastCoordinates) {
// 			const dx = e.clientX - lastCoordinates.x;
// 			const dy = e.clientY - lastCoordinates.y;

// 			setLastCoordinates({
// 				x: e.clientX,
// 				y: e.clientY,
// 			});

// 			onMove(dx, dy);
// 		}
// 	}

// 	function handlePointerUp() {
// 		setLastCoordinates(null);
// 	}

// 	return (
// 		<div
// 			onPointerDown={handlePointerDown}
// 			onPointerMove={handlePointerMove}
// 			onPointerUp={handlePointerUp}
// 			style={{
// 				width: 100,
// 				height: 100,
// 				cursor: "grab",
// 				backgroundColor: color,
// 				position: "absolute",
// 				border: "1px solid black",
// 				display: "flex",
// 				justifyContent: "center",
// 				alignItems: "center",
// 				userSelect: "none",
// 				transform: `translate(${position.x}px, ${position.y}px)`,
// 			}}
// 		>
// 			{children}
// 		</div>
// 	);
// }
