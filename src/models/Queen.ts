import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class Queen extends Piece {
	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.Queen;
	}

	public getPossibleMoves(board: Chessboard, position: { row: number, column: number }) {
		const moves: Vector2D[] = [];

		// The queen can move horizontally, vertically, and diagonally from its current position until it reaches the edge of the board or a piece of the same color.
		// The queen can move as far as it wants in any direction, but it cannot jump over pieces and if it lands on a piece of the same color, it cannot move past it.
		// The queen can take pieces of the opposite color.
		// The queen cannot take pieces of the same color.

		// Implement the queen's logic using a directional map.
		// The directional map is an array of vectors that represent the directions the queen can move in.
		// The vectors are relative to the queen's current position.
		// The vectors are in the form of { row: number, column: number }.

		const directionalMap: Vector2D[] = [
			{ row: -1, column: -1 },
			{ row: -1, column: 0 },
			{ row: -1, column: 1 },
			{ row: 0, column: -1 },
			{ row: 0, column: 1 },
			{ row: 1, column: -1 },
			{ row: 1, column: 0 },
			{ row: 1, column: 1 }
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