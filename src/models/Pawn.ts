import { PieceColor, PieceType } from "@/types/ChessPieces";
import Chessboard from "./Chessboard";
import Piece from "./Piece";

export default class Pawn extends Piece {
	public hasMoved: boolean;

	constructor(color: PieceColor) {
		super(color);

		this.type = PieceType.Pawn;
		this.hasMoved = false;
	}
	
	public getPossibleMoves(board: Chessboard, position: { row: number, column: number }) {
		// a pawn can move forward one space, or two spaces if it hasn't moved yet
		// a pawn can capture diagonally
		// a pawn can promote to any piece except a king
		// a pawn can move forward two spaces if it is on its starting row


		const moves = [];
		const forwardOne = {
			row: this.color === PieceColor.White ? position.row - 1 : position.row + 1,
			column: position.column
		};

		const leftCapture = {
			row: this.color === PieceColor.White ? position.row - 1 : position.row + 1,
			column: position.column - 1
		};

		const rightCapture = {
			row: this.color === PieceColor.White ? position.row - 1 : position.row + 1,
			column: position.column + 1
		};

		const leftPiece = board.getPieceAt(leftCapture);
		if (leftPiece !== null && leftPiece?.color !== this.color) {
			moves.push(leftCapture);
		}
		
		const rightPiece = board.getPieceAt(rightCapture);
		if (rightPiece !== null && rightPiece?.color !== this.color) {
			moves.push(rightCapture);
		}
		
		const pieceInFront = board.getPieceAt(forwardOne);
		if (pieceInFront == null) {
			// check if the pawn can capture diagonally
			moves.push(forwardOne);


			if (!this.hasMoved) {
				const forwardTwo = {
					row: this.color === PieceColor.White ? position.row - 2 : position.row + 2,
					column: position.column
				};

				if (board.getPieceAt(forwardTwo) == null) {
					moves.push(forwardTwo);
				}
			}
		}

		
		return moves;
	}

	public canPromote() {

	}
}