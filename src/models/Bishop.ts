import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class Bishop extends Piece {
	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.Bishop;
	}
	
	public getPossibleMoves(board: Chessboard, position: { row: number, column: number }) {
		const moves: Vector2D[] = [];

		// The bishop can move diagonally.
		// The bishop can move in any direction, but only as far as it can go.
		// The bishop can capture a piece of the opposite color.
		// The bishop cannot move through a piece of the same color.
		// The bishop cannot move through a piece of the opposite color.
		// The bishop cannot move off the board.

		const directionalMap: Vector2D[] = [
			{ row: 1, column: 1 },
			{ row: 1, column: -1 },
			{ row: -1, column: 1 },
			{ row: -1, column: -1 }
		];

		// Loop through the directional map and add the possible moves to the moves array.
		// The loop should stop when the queen reaches the edge of the board or a piece of the same color.
		// The loop should also stop if the queen lands on a piece of the opposite color.
		for(const vector of directionalMap) {
			for(let i = 1; i < 8; i++) {
				const row = position.row + (vector.row * i);
				const column = position.column + (vector.column * i);

				if (row < 0 || row > 7 || column < 0 || column > 7) {
					break;
				}

				const piece = board.getPieceAt({ row, column });

				if(piece) {
					if (piece.color !== this.color) {
						moves.push({ row, column });
					}

					break;
				}

				moves.push({ row, column });
			}
		}
			
		return moves;
	}
}