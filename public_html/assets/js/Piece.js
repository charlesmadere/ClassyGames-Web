function Piece(team, piece)
{
	this.coordinate = new Coordinate(piece.coordinate[0], piece.coordinate[1]);
	this.team = team;
	this.type = piece.type;
}


Piece.prototype.isNormal = function()
{
	return this.type == 1;
}


Piece.prototype.isKing = function()
{
	return this.type == 2;
}


Piece.prototype.isPlayers = function()
{
	return this.team == 1;
}


Piece.prototype.isOpponents = function()
{
	return this.team == 2;
}