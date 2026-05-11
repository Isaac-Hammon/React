// function Clock({ time }) {
// 	const hours = time.getHours();
// 	let className;
// 	if (hours >= 0 && hours <= 6) {
// 		className = "night";
// 	} else {
// 		className = "day";
// 	}
// 	return (
// 		<h1 className="className">
// 			{className} - {time.toLocaleTimeString()}
// 		</h1>
// 	);
// }

// export default function T() {
// 	return <Clock time={new Date()}></Clock>;
// }

"use client";

import { useState } from "react";

// function Panel({ children }) {
// 	const [open, setOpen] = useState(true);
// 	return (
// 		<section className="panel">
// 			<button onClick={() => setOpen(!open)}>{open ? "Collapse" : "Expand"}</button>
// 			{open && children}
// 		</section>
// 	);
// }

// function Profile({ person }) {
// 	person = person;
// 	return (
// 		<Panel>
// 			<Header person={person} />
// 			<Avatar person={person} />
// 		</Panel>
// 	);
// }

// function Header({ person }) {
// 	return <h1>{person.name}</h1>;
// }

// function getImageUrl(person, size = "s") {
// 	return "https://react.dev/images/docs/scientists/" + person.imageId + size + ".jpg";
// }

// function Avatar({ person }) {
// 	return (
// 		<img
// 			className="avatar"
// 			src={getImageUrl(person)}
// 			alt={person.name}
// 			width={50}
// 			height={50}
// 		/>
// 	);
// }

// export default function App() {
// 	return (
// 		<>
// 			<Profile
// 				person={{
// 					imageId: "lrWQx8l",
// 					name: "Subrahmanyan Chandrasekhar",
// 				}}
// 			/>
// 			<Profile
// 				person={{
// 					imageId: "MK3eW3A",
// 					name: "Creola Katherine Johnson",
// 				}}
// 			/>
// 		</>
// 	);
// }

import { useEffect } from "react";

function StoryTray({ stories }) {
	return (
		<ul>
			{stories.map((story) => (
				<li key={story.id}>{story.label}</li>
			))}
			<li>Create Story</li>
		</ul>
	);
}

const initialStories = [
	{ id: 0, label: "Ankit's Story" },
	{ id: 1, label: "Taylor's Story" },
];

function useTime() {
	const [time, setTime] = useState(() => new Date());
	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(id);
	}, []);
	return time;
}

export default function App() {
	const [stories, setStories] = useState([...initialStories]);
	const time = useTime();

	if (stories.length > 100) {
		stories.length = 100;
	}

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				textAlign: "center",
			}}
		>
			<h2>It is {time.toLocaleTimeString()} now.</h2>
			<div className="stories">
				<StoryTray stories={stories} />
			</div>
		</div>
	);
}
