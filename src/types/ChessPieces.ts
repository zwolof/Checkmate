export enum PieceColor {
	White = "white",
	Black = "black"
}

export enum PieceType {
	Pawn = 0,
	Knight,
	Bishop,
	Rook,
	King,
	Queen,
}

const pieceLetterMap: Record<PieceType, string> = {
	[PieceType.Pawn]: "p",
	[PieceType.Knight]: "n",
	[PieceType.Bishop]: "b",
	[PieceType.Rook]: "r",
	[PieceType.Queen]: "q",
	[PieceType.King]: "k",
};
export type Vector2D = { row: number, column: number };

export { pieceLetterMap };
