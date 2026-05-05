"use client";

import { useState } from "react";

function MyButton() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<button className="myButton" onClick={handleClick}>
			Clicked {count} times
		</button>
	);
}

export default function Page() {
	return (
		<div>
			<h1>Counters</h1>

			<MyButton />
			<br />
			<MyButton />
		</div>
	);
}
