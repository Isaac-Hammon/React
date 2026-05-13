"use client";

import { useState, useRef } from "react";

//FIX BROKEN CHAT INPUT
export default function Chat() {
	const [text, setText] = useState("");
	const [isSending, setIsSending] = useState(false);
	const timeoutRef = useRef(null);

	function handleSend() {
		setIsSending(true);
		timeoutRef.current = setTimeout(() => {
			alert("Sent!");
			setIsSending(false);
		}, 3000);
	}

	function handleUndo() {
		setIsSending(false);
		clearTimeout(timeoutRef.current);
	}

	return (
		<>
			<input
				disabled={isSending}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button disabled={isSending} onClick={handleSend}>
				{isSending ? "Sending..." : "Send"}
			</button>
			{isSending && <button onClick={handleUndo}>Undo</button>}
		</>
	);
}

// 	return (
// 		<>
// 			<input
// 				disabled={isSending}
// 				value={text}
// 				onChange={(e) => setText(e.target.value)}
// 			/>
// 			<button disabled={isSending} onClick={handleSend}>
// 				{isSending ? "Sending..." : "Send"}
// 			</button>
// 			{isSending && <button onClick={handleUndo}>Undo</button>}
// 		</>
// 	);
// }

// ON/OFF BUTTON CHALLENGE
// export default function Toggle() {
// 	const [isOn, setIsOn] = useState(false);

// 	return (
// 		<button
// 			onClick={() => {
// 				setIsOn(!isOn);
// 			}}
// 		>
// 			{isOn ? "On" : "Off"}
// 		</button>
// 	);
// }

//FIX DEBOUNCING CHALLENGE
// function DebouncedButton({ onClick, children }) {
// 	const timeoutRef = useRef(null);
// 	return (
// 		<button
// 			onClick={() => {
// 				clearTimeout(timeoutRef.current);
// 				timeoutRef.current = setTimeout(() => {
// 					onClick();
// 				}, 1000);
// 			}}
// 		>
// 			{children}
// 		</button>
// 	);
// }

// export default function Dashboard() {
// 	return (
// 		<>
// 			<DebouncedButton onClick={() => alert("Spaceship launched!")}>
// 				Launch the spaceship
// 			</DebouncedButton>
// 			<DebouncedButton onClick={() => alert("Soup boiled!")}>
// 				Boil the soup
// 			</DebouncedButton>
// 			<DebouncedButton onClick={() => alert("Lullaby sung!")}>
// 				Sing a lullaby
// 			</DebouncedButton>
// 		</>
// 	);
// }

//LATEST STATE CHALLENGE
// export default function Chat() {
// 	const [text, setText] = useState("");
// 	const textRef = useRef(text);

// 	function handleChange(e) {
// 		setText(e.target.value);
// 		textRef.current = e.target.value;
// 	}

// 	function handleSend() {
// 		setTimeout(() => {
// 			alert("Sending: " + textRef.current);
// 		}, 3000);
// 	}

// 	return (
// 		<>
// 			<input value={text} onChange={handleChange} />
// 			<button onClick={handleSend}>Send</button>
// 		</>
// 	);
// }

//PLAY AND PAUSE VIDEO CHALLENGE
// export default function VideoPlayer() {
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const ref = useRef(null);

// 	function handleClick() {
// 		const nextIsPlaying = !isPlaying;
// 		setIsPlaying(nextIsPlaying);

// 		if (nextIsPlaying) {
// 			ref.current.play();
// 		} else {
// 			ref.current.pause();
// 		}
// 	}

// 	return (
// 		<>
// 			<button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
// 			<video
// 				width="250"
// 				ref={ref}
// 				onPlay={() => setIsPlaying(true)}
// 				onPause={() => setIsPlaying(false)}
// 			>
// 				<source
// 					src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
// 					type="video/mp4"
// 				/>
// 			</video>
// 		</>
// 	);
// }

//FOCUS SEARCH FIELD CHALLENGE
// export default function Page() {
// 	const inputRef = useRef(null);
// 	return (
// 		<>
// 			<nav>
// 				<button
// 					onClick={() => {
// 						inputRef.current.focus();
// 					}}
// 				>
// 					Search
// 				</button>
// 			</nav>
// 			<input ref={inputRef} placeholder="Looking for something?" />
// 		</>
// 	);
// }

//SCROLL CHALLENGE
// import { flushSync } from "react-dom";

// export default function CatFriends() {
// 	const selectedRef = useRef(null);
// 	const [index, setIndex] = useState(0);

// 	return (
// 		<>
// 			<nav>
// 				<button
// 					onClick={() => {
// 						flushSync(() => {
// 							if (index < catList.length - 1) {
// 								setIndex(index + 1);
// 							} else {
// 								setIndex(0);
// 							}
// 						});
// 						selectedRef.current.scrollIntoView({
// 							behavior: "smooth",
// 							block: "nearest",
// 							inline: "center",
// 						});
// 					}}
// 				>
// 					Next
// 				</button>
// 			</nav>
// 			<div>
// 				<ul>
// 					{catList.map((cat, i) => (
// 						<li key={cat.id} ref={index === i ? selectedRef : null}>
// 							<img
// 								className={index === i ? "active" : ""}
// 								src={cat.imageUrl}
// 								alt={"Cat #" + cat.id}
// 							/>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</>
// 	);
// }

// const catCount = 10;
// const catList = new Array(catCount);
// for (let i = 0; i < catCount; i++) {
// 	const bucket = Math.floor(Math.random() * catCount) % 2;
// 	let imageUrl = "";
// 	switch (bucket) {
// 		case 0: {
// 			imageUrl = "https://placecats.com/neo/250/200";
// 			break;
// 		}
// 		case 1: {
// 			imageUrl = "https://placecats.com/millie/250/200";
// 			break;
// 		}
// 		case 2:
// 		default: {
// 			imageUrl = "https://placecats.com/bella/250/200";
// 			break;
// 		}
// 	}
// 	catList[i] = {
// 		id: i,
// 		imageUrl,
// 	};
// }

//FOCUS SEARCH WITH SEPARATE COMPONENTS CHALLENGE

// import React, { forwardRef } from "react";

// export default function Page() {
// 	const inputRef = useRef(null);

// 	const SearchInput = forwardRef((props, ref) => {
// 		return <input ref={ref} placeholder="Looking for something?" />;
// 	});

// 	return (
// 		<>
// 			<nav>
// 				<button
// 					onClick={() => {
// 						inputRef.current?.focus();
// 					}}
// 				>
// 					Search
// 				</button>
// 			</nav>

// 			<SearchInput ref={inputRef} />
// 		</>
// 	);
// }
