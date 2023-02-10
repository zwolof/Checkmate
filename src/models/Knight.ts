import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class Knight extends Piece {
	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.Knight;
	}
	
	public getPossibleMoves(board: Chessboard, position: Vector2D) {
		const moves: Vector2D[] = [];

		const directionalMap: Vector2D[] = [
			{ row: 2, column: 1 },
			{ row: 2, column: -1 },
			{ row: -2, column: 1 },
			{ row: -2, column: -1 },
			{ row: 1, column: 2 },
			{ row: 1, column: -2 },
			{ row: -1, column: 2 },
			{ row: -1, column: -2 }
		];

		for (const vector of directionalMap) {
			const row = position.row + vector.row;
			const column = position.column + vector.column;

			if (row < 0 || row > 7 || column < 0 || column > 7) {
				continue;
			}

			const piece = board.getPieceAt({ row, column });

			if (piece) {
				if (piece.color !== this.color) {
					moves.push({ row, column });
				}

				continue;
			}

			moves.push({ row, column });
		}
		
			
		return moves;
	}
}