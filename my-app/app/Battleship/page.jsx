"use client";

import { useState } from "react";

const SIZE = 4;

/* ---------------- SHIPS ---------------- */

const PLAYER_SHIPS = [0, 5, 10];
const COMPUTER_SHIPS = [3, 6, 15];

/* ---------------- SQUARE ---------------- */

function Square({ value, onClick }) {
	return (
		<button className="tttButton" onClick={onClick}>
			{value}
		</button>
	);
}

/* ---------------- BOARD ---------------- */

function Board({ title, tiles, onTileClick }) {
	return (
		<div>
			<h3>{title}</h3>

			{Array(SIZE)
				.fill(null)
				.map((_, row) => (
					<div className="board-row" key={row}>
						{Array(SIZE)
							.fill(null)
							.map((_, col) => {
								const index = row * SIZE + col;

								return (
									<Square
										key={index}
										value={tiles[index]}
										onClick={() => onTileClick(index)}
									/>
								);
							})}
					</div>
				))}
		</div>
	);
}

/* ---------------- GAME ---------------- */

export default function BattleshipGame() {
	const emptyBoard = Array(SIZE * SIZE).fill(null);

	const [playerBoard, setPlayerBoard] = useState(emptyBoard);
	const [computerBoard, setComputerBoard] = useState(emptyBoard);
	const [playerTurn, setPlayerTurn] = useState(true);

	/* ---------------- SHIP COUNTS ---------------- */

	const playerSunk = PLAYER_SHIPS.filter((i) => playerBoard[i] === "X").length;

	const computerSunk = COMPUTER_SHIPS.filter((i) => computerBoard[i] === "X").length;

	/* ---------------- CLICK HANDLER ---------------- */

	function handlePlayerMove(index) {
		if (!playerTurn || computerBoard[index]) return;

		const newBoard = [...computerBoard];

		newBoard[index] = COMPUTER_SHIPS.includes(index) ? "X" : "O";

		setComputerBoard(newBoard);
		setPlayerTurn(false);

		setTimeout(computerMove, 500);
	}

	/* ---------------- COMPUTER MOVE ---------------- */

	function computerMove() {
		let index;

		do {
			index = Math.floor(Math.random() * 16);
		} while (playerBoard[index]);

		const newBoard = [...playerBoard];

		newBoard[index] = PLAYER_SHIPS.includes(index) ? "X" : "O";

		setPlayerBoard(newBoard);
		setPlayerTurn(true);
	}

	/* ---------------- WIN CHECK ---------------- */

	function isSunk(ships, board) {
		return ships.every((index) => board[index] === "X");
	}

	const playerWins = isSunk(COMPUTER_SHIPS, computerBoard);
	const computerWins = isSunk(PLAYER_SHIPS, playerBoard);

	let status;

	if (playerWins) status = "Player Wins!";
	else if (computerWins) status = "Computer Wins!";
	else status = playerTurn ? "Your turn" : "Computer thinking...";

	/* ---------------- RENDER ---------------- */

	return (
		<>
			<h2>{status}</h2>
			<p>Player ships sunk: {playerSunk}</p>
			<p>Computer ships sunk: {computerSunk}</p>

			<div className="game">
				<div style={{ display: "flex", gap: "40px" }}>
					<Board title="Player Board" tiles={playerBoard} onTileClick={() => {}} />

					<Board
						title="Computer Board"
						tiles={computerBoard}
						onTileClick={handlePlayerMove}
					/>
				</div>
			</div>
		</>
	);
}
