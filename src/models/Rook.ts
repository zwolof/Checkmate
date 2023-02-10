import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class Rook extends Piece {
	public hasMoved: boolean;

	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.Rook;
		this.hasMoved = false;
	}
	
	public getPossibleMoves(board: Chessboard, position: { row: number, column: number }) {
		const moves: Vector2D[] = [];

		// The rook can move horizontally and vertically.
		// The rook can move as far as it wants in a direction until it reaches the edge of the board or a piece of the same color.
		// The rook can also capture a piece of the opposite color.
		// The rook cannot move through a piece of the same color.

		const directionalMap: Vector2D[] = [
			{ row: 0, column: 1 },
			{ row: 0, column: -1 },
			{ row: 1, column: 0 },
			{ row: -1, column: 0 }
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