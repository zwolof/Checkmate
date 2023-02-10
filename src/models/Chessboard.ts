import { PieceColor, PieceType, Vector2D } from "@/types/ChessPieces";
import Piece from "./Piece";
import { Rook, Knight, Bishop, King, Queen, Pawn } from "./_import";

export default class Chessboard {
	private defaultBoard: Array<Array<any | null>>;
	public current: Array<Array<Piece | null>>;

	constructor() {
		this.current = this.defaultBoard = [
			[
				new Rook(PieceColor.Black),
				new Knight(PieceColor.Black),
				new Bishop(PieceColor.Black),
				new Queen(PieceColor.Black),
				new King(PieceColor.Black),
				new Bishop(PieceColor.Black),
				new Knight(PieceColor.Black),
				new Rook(PieceColor.Black)
			],
			[
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black),
				new Pawn(PieceColor.Black)
			],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null],
			[
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White),
				new Pawn(PieceColor.White)
			],
			[
				new Rook(PieceColor.White),
				new Knight(PieceColor.White),
				new Bishop(PieceColor.White),
				new Queen(PieceColor.White),
				new King(PieceColor.White),
				new Bishop(PieceColor.White),
				new Knight(PieceColor.White),
				new Rook(PieceColor.White)
			],
		];
	};

	public getPieceAt(position: { row: number, column: number }) {
		return this.current[position.row][position.column];
	}

	public isOccupied(position: Vector2D) {
		return this.getPieceAt(position) !== null;
	}

	public tryMovePiece(playerColor: PieceColor, from: Vector2D, to: Vector2D) {
		const piece = this.getPieceAt(from);

		// check if the new position isnt the current position
		if (from.row === to.row && from.column === to.column) {
			return;
		}

		if (piece) {
			const possibleMoves = piece.getPossibleMoves(this, from);

			if (possibleMoves.some((move: any) => move.row === to.row && move.column === to.column)) {
				this.current[to.row][to.column] = piece;
				this.current[from.row][from.column] = null;
				
				if (this.current[to.row][to.column]?.hasOwnProperty('hasMoved')) {
					this.current[to.row][to.column]!.hasMoved = true;
				}
				// check if the pawn has reached the end of the board
				if (piece.type === PieceType.Pawn) {
					if (piece.color === PieceColor.White && to.row === 0) {
						this.current[to.row][to.column] = new Queen(PieceColor.White);
					} else if (piece.color === PieceColor.Black && to.row === 7) {
						this.current[to.row][to.column] = new Queen(PieceColor.Black);
					}
				}

				let opponentKingPos = this.getKingPosition(playerColor === PieceColor.White ? PieceColor.Black : PieceColor.White);
				if (opponentKingPos !== null) {
					if (this.isInCheck(opponentKingPos)) {
						alert('Check!');
					}
				}
			}
		}
	}

	public isOnBoard(position: { row: number, column: number }) {
		return position.row >= 0 && position.row <= 7 && position.column >= 0 && position.column <= 7;
	}

	public getKingPosition(color: PieceColor) {
		for (let row = 0; row < 8; row++) {
			for (let column = 0; column < 8; column++) {
				const piece = this.getPieceAt({ row, column });

				if (piece && piece.type === PieceType.King && piece.color === color) {
					return { row, column };
				}
			}
		}

		return null;
	}

	public isInCheck(position: Vector2D) {
		// check if the king is in check
		// the king is in check if any of the opponent's pieces can move to the king's position

		// const opponentColor = this.color === PieceColor.White ? PieceColor.Black : PieceColor.White;

		for (let row = 0; row < 8; row++) {
			for (let column = 0; column < 8; column++) {
				const piece = this.getPieceAt({ row, column });

				if (piece) {
					const possibleMoves = piece.getPossibleMoves(this, { row, column });

					for (const move of possibleMoves) {
						if (move.row === position.row && move.column === position.column) {
							return true;
						}
					}
				}
			}
		}

		return false;
	}
}