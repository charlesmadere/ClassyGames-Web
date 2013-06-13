var BOARD;


function findBoardPosition(coordinate)
{
	return $("[data-x=" + coordinate.x + "][data-y=" + coordinate.y + "]");
}


function highlightBoardPosition(coordinate)
{
	var position = findBoardPosition(coordinate);
	position.css("background-color", "#FFFF00")
}


function loadBoard(gameId, personId, personName)
{
	$("#ClassyGames_GamesList").css("display", "none");
	$("#ClassyGames_Board").css("display", "inline");

	// this line requires that google chrome's security feature be disabled
	$.post("http://classygames.net/GetGame",
		{
			id: gameId
		},
		function(response) {
			$("#ClassyGames_Board_Loading").css("display", "none");
			$("#ClassyGames_Board_Board").css("display", "inline");
			$("h1").html("Game against " + personName);
			measureBoard();
			BOARD = new Board(response);
			BOARD.flush();
		}
	);
}


function measureBoard()
{
	var board = $("#ClassyGames_Board_Board");

	if (board.css("display") === "inline")
	{
		var body = $("body");
		var bodyWidth = body.width();
		board.height(bodyWidth);
		board.width(bodyWidth);

		var rows = board.children();
		var rowHeight = bodyWidth / 8;

		for (var i = 0; i < rows.length; ++i)
		{
			var row = rows[i];

			if (row.className === "ClassyGames_Board_Board_Row")
			{
				row.style.height = rowHeight + "px";
				var positions = row.childNodes;

				for (var j = 0; j < positions.length; ++j)
				{
					var position = positions[j];
					var piece = position.childNodes;

					for (var k = 0; k < piece.length; ++k)
					{
						var pieceImage = piece[k];
					}
				}
			}
		}
	}
}


function selectBoardPosition(position)
{
	var x = position.getAttribute("data-x");
	var y = position.getAttribute("data-y");
	var coordinate = new Coordinate(x, y);

	if (coordinate.isWhitePosition())
	{
		BOARD.selectPiece(coordinate);
	}
	else
	{
		BOARD.unselectPieces();
	}
}


function Board(response)
{
	this.response = response.result.success;
	this.json = JSON.parse(this.response);
	this.board = this.json.board;
	this.teams = this.board.teams;
	this.teamPlayer = this.buildTeam(1, this.teams[0]);
	this.teamOpponent = this.buildTeam(2, this.teams[1]);

	this.previousPiece = null;
	this.currentPiece = null;
}


Board.prototype.buildTeam = function(team, array)
{
	var builtTeam = new Array(array.length);

	for (var i = 0; i < array.length; ++i)
	{
		builtTeam[i] = new Piece(team, array[i])
	}

	return builtTeam;
}


Board.prototype.findPieceAtPosition = function(coordinate)
{
	var piece = this.findTeamPieceAtPosition(coordinate, this.teamPlayer);

	if (piece != null)
		return piece;

	piece = this.findTeamPieceAtPosition(coordinate, this.teamOpponent);

	return piece;
}


Board.prototype.findTeamPieceAtPosition = function(coordinate, team)
{
	for (var i = 0; i < team.length; ++i)
	{
		var piece = team[i];

		if (piece.coordinate.x === coordinate.x && piece.coordinate.y === coordinate.y)
			return piece;
	}

	return null;
}


Board.prototype.flush = function()
{
	var board = $("#ClassyGames_Board_Board");

	this.flushTeam(board, this.teamPlayer);
	this.flushTeam(board, this.teamOpponent);
}


Board.prototype.flushTeam = function(board, team)
{
	for (var i = 0; i < team.length; ++i)
	{
		var piece = team[i];
		var position = findBoardPosition(piece.coordinate);

		if (piece.isPlayerPiece())
		{
			if (piece.isNormalPiece())
			{
				position.html("<img src=\"assets/img/game/normal/pink/piece.png\" />");
			}
			else
			{
				position.html("<img src=\"assets/img/game/king/pink/piece.png\" />");
			}
		}
		else
		{
			if (piece.isNormalPiece())
			{
				position.html("<img src=\"assets/img/game/normal/blue/piece.png\" />");
			}
			else
			{
				position.html("<img src=\"assets/img/game/king/blue/piece.png\" />");
			}
		}
	}
}


Board.prototype.selectPiece = function(coordinate)
{
	var piece = this.findPieceAtPosition(coordinate);

	if (this.previousPiece == null)
	{
		if (piece != null)
		{
			this.previousPiece = piece;
			highlightBoardPosition(coordinate);
		}
	}
	else
	{
		if (piece == null)
		{
			this.previousPiece = null;
			this.currentPiece = null;
		}
		else
		{

		}
	}
}


Board.prototype.unselectPieces = function()
{
	this.previousPiece = null;
	this.currentPiece = null;
}