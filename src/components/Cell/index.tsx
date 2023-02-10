import Piece from "@/models/Piece";
import { useEffect } from "react";
import { PieceColor, pieceLetterMap, PieceType } from "../../types/ChessPieces";

interface Props {
	piece: Piece | null;
	[key: string]: any;
}

export default function Cell(props: Props) {
	const classes = ["Cell"];

	if (props.className) {
		classes.push(props.className);
	}

	if (props.selected) {
		classes.push("Cell--Selected");
	}

	function getPieceUrl() {
		const baseUrl = "https://www.chess.com/chess-themes/pieces/neo/150/";
		return baseUrl+`${props.color === PieceColor.White ? "w" : "b"}${props.piece?.getPieceLetter()}.png`;
	}

	return (
		<div {...props} className={classes.join(" ")}>
			{props.piece !== null ? (<img src={getPieceUrl()}  />) : null}
		</div>
	)
}
