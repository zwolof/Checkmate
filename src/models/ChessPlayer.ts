import { PieceColor } from "@/types/ChessPieces";
import Piece from "./Piece";

export default class ChessPlayer {
	private pieces: Piece[] = [];
	private color: PieceColor;

	constructor(color: PieceColor) {
		this.color = color;
	}

	getColor() {
		return this.color;
	}

	getPieces() {
		return this.pieces;
	}

	addPiece(piece: Piece) {
		this.pieces.push(piece);
	}
}