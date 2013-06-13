function Piece(team, piece)
{
	this.coordinate = new Coordinate(piece.coordinate);
	this.team = team;
	this.type = piece.type;
}


Piece.prototype.isNormalPiece = function()
{
	return this.type === 1;
}


Piece.prototype.isKingPiece = function()
{
	return this.type === 2;
}


Piece.prototype.isPlayerPiece = function()
{
	return this.team === 1;
}


Piece.prototype.isOpponentPiece = function()
{
	return this.team === 2;
}


Piece.prototype.getPieceType = function()
{
	return this.type;
}


Piece.prototype.getPieceTeam = function()
{
	return this.team;
}