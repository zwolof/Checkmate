import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class King extends Piece {

	public hasMoved: boolean;
	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.King;
		this.hasMoved = false;
	}
	
	public getPossibleMoves(board: Chessboard, position: Vector2D) {
		const moves: Vector2D[] = [];

		// The king can move one space in any direction
		// The king can castle if it hasn't moved yet
		// The king can't move into check
		// The king can capture any piece that is not the same color

		
		const directionalMap: Vector2D[] = [
			{ row: 1, column: 1 },
			{ row: 1, column: -1 },
			{ row: -1, column: 1 },
			{ row: -1, column: -1 },
			{ row: 1, column: 0 },
			{ row: -1, column: 0 },
			{ row: 0, column: 1 },
			{ row: 0, column: -1 }
		];

		for (const vector of directionalMap) {
			const row = position.row + vector.row;
			const column = position.column + vector.column;

			if (row < 0 || row > 7 || column < 0 || column > 7) {
				continue;
			}

			// If there is a piece at the position, check if it is the same color
			// If it is the same color, the king can't move there
			// If it is a different color, the king can capture it

			if (board.getPieceAt({ row, column })?.color === this.color) {
				continue;
			}

			moves.push({ row, column });
			

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