
import { Fragment, useMemo, useState } from 'react';
import Cell from '../Cell';
import { PieceColor, pieceLetterMap, PieceType } from '../../types/ChessPieces';
import Piece, { Position } from '@/models/Piece';
import Rook from '@/models/Rook';
import Knight from '@/models/Knight';
import Queen from '@/models/Queen';
import Bishop from '@/models/Bishop';
import King from '@/models/King';
import Pawn from '@/models/Pawn';
import Chessboard from '@/models/Chessboard';


export default function Board() {
	const [board, setBoard] = useState<Chessboard>(new Chessboard());
	const [possibleMoves, setPossibleMoves] = useState([]);
	const [playerColor, setPlayerColor] = useState<PieceColor>(PieceColor.White);

	const [selectedCell, setSelectedCell] = useState<{ row: number; column: number} | null>(null);

	function getCellColor(i: number, j: number) {
		const isEven = (i + j) % 2 === 0;

		return isEven ? "White" : "Black";
	}

	function onCellClicked(row: number, column: number) {
		
		console.log("clicked", row, column)
		if (selectedCell === null && board.current[row][column]) {

			if (board.current[row][column].color !== playerColor) {
				return;
			}
			setSelectedCell({ row, column });

			// @ts-ignore
			const possiblemoves = board.current[row][column].getPossibleMoves(board, { row, column });

			setPossibleMoves(possiblemoves);

			return;
		}
		board.tryMovePiece(playerColor, { row: selectedCell!.row, column: selectedCell!.column }, { row, column });

		setSelectedCell(null);
		setPossibleMoves([]);
	}

	return (
		<div className="ChessBoard">
			{
				[...Array(8)].map((_: unknown, i: number) => {
					return [...Array(8)].map((_: unknown, j: number) => {
						const currentPiece = board.current[i][j];

						return (
							<Cell
								className={`Cell--${getCellColor(i, j)}`}
								key={`${i}-${j}`}
								piece={currentPiece}
								color={currentPiece?.color}
								selected={(selectedCell?.column == j && selectedCell.row == i) || possibleMoves.some((move: any) => move.row === i && move.column === j)}
								onClick={() => onCellClicked(i, j)}
							/>
						)
					})
				})
			}
		</div>
	)
}