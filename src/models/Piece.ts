import { PieceColor, pieceLetterMap, PieceType } from "@/types/ChessPieces";
import { nanoid } from "nanoid";

class Position {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public get() {
		return { x: this.x, y: this.y };
	}
}

export default class Piece {
	public color: PieceColor;
	public type: PieceType | null;
	public id: string;

	constructor(color: PieceColor) {
		this.color = color;
		this.type = null;

		this.id = nanoid();
	}


	public getPieceLetter() {
		if (this.type === null) {
			return "";
		}
		return pieceLetterMap[this.type];
	}


	// canMove(target: Cell) : boolean {
	// 	if (target.figure?.color === this.color) {
	// 		return false
	// 	}

	// 	if (target.figure?.type === PieceType.King) {
	// 		return false
	// 	}
	// 	return true;
	// }
}

export { Position };