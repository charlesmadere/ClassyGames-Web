var BOARD;


function findBoardPosition(coordinate)
{
	return $("[data-x=" + coordinate.x + "][data-y=" + coordinate.y + "]");
}


function highlightBoardPosition(coordinate)
{
	var position = findBoardPosition(coordinate);
	position.css("background-color", "#FFCCCC")
}


function unhighlightBoardPosition(coordinate)
{
	var position = findBoardPosition(coordinate);
	position.css("background-color", "#FFFFFF");
}


function loadBoard(gameId, personId, personName)
{
	$("#ClassyGames_GamesList").css("display", "none");
	$("#ClassyGames_GamesList_ActionBar").css("display", "none");
	$("#ClassyGames_Board").css("display", "inline");

	// this line requires that google chrome's security feature be disabled
	$.post("http://classygames.net/GetGame",
		{
			id: gameId
		},
		function(response)
		{
			$("#ClassyGames_Board_Loading").css("display", "none");
			$("#ClassyGames_Board_Board").css("display", "inline");
			$("#ClassyGames_Board_ActionBar").css("display", "inline");
			$("h1").html("Game against " + personName);
			measureBoard();
			var person = new Person(personId, personName);
			BOARD = new Board(response, gameId, person);
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
	var x = Math.round(position.getAttribute("data-x"));
	var y = Math.round(position.getAttribute("data-y"));
	var coordinate = new Coordinate(x, y);

	if (coordinate.isWhitePosition() && !BOARD.isLocked)
	{
		BOARD.selectPiece(coordinate);
	}
	else
	{
		BOARD.unselectPiece();
	}
}


function Board(response, gameId, person)
{
	this.gameId = gameId;
	this.person = person;
	this.response = response.result.success;
	this.json = JSON.parse(this.response);
	this.board = this.json.board;
	this.teams = this.board.teams;

	this.build();
}


Board.prototype.build = function()
{
	this.teamPlayer = this.buildTeam(1, this.teams[0]);
	this.teamOpponent = this.buildTeam(2, this.teams[1]);

	this.isLocked = false;
	this.lastMovedCoordinate = null;
	this.selectedPiece = null;
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


Board.prototype.eraseBoard = function(board)
{
	for (var x = 0; x <= 7; ++x)
	{
		for (var y = 0; y <= 7; ++y)
		{
			var coordinate = new Coordinate(x, y);
			var position = findBoardPosition(coordinate);
			position.html("");

			if (coordinate.isWhitePosition())
			{
				position.css("background-color", "#FFFFFF");
			}
		}
	}
}


Board.prototype.findPieceAtPosition = function(coordinate)
{
	var piece = this.findTeamPieceAtPosition(coordinate, this.teamPlayer);

	if (piece != null)
	{
		return piece;
	}

	piece = this.findTeamPieceAtPosition(coordinate, this.teamOpponent);

	return piece;
}


Board.prototype.findTeamPieceAtPosition = function(coordinate, team)
{
	for (var i = 0; i < team.length; ++i)
	{
		var piece = team[i];

		if (piece.coordinate.equals(coordinate))
		{
			return piece;
		}
	}

	return null;
}


Board.prototype.flush = function()
{
	var board = $("#ClassyGames_Board_Board");
	this.eraseBoard(board);
	this.flushTeam(board, this.teamPlayer);
	this.flushTeam(board, this.teamOpponent);

	if (this.selectedPiece != null)
	{
		highlightBoardPosition(this.selectedPiece.coordinate);
	}
}


Board.prototype.flushTeam = function(board, team)
{
	for (var i = 0; i < team.length; ++i)
	{
		var piece = team[i];
		var position = findBoardPosition(piece.coordinate);

		if (piece.isAlive)
		{
			if (piece.isPlayers())
			{
				if (piece.isNormal())
				{
					position.html("<img src=\"assets/img/game/normal/pink/piece.png\" style=\"margin-top: 12%;\" />");
				}
				else
				{
					position.html("<img src=\"assets/img/game/king/pink/piece.png\" style=\"margin-top: 4%;\" />");
				}
			}
			else
			{
				if (piece.isNormal())
				{
					position.html("<img src=\"assets/img/game/normal/blue/piece.png\" style=\"margin-top: 12%;\" />");
				}
				else
				{
					position.html("<img src=\"assets/img/game/king/blue/piece.png\" style=\"margin-top: 4%;\" />");
				}
			}
		}
	}
}


Board.prototype.makeJSON = function()
{
	var board = "{\"board\":{" + this.makeJSONTeams() + "}}";
	return board;
}


Board.prototype.makeJSONTeams = function()
{
	var teams = "\"teams\":[" + this.makeJSONTeam(this.teamPlayer) + "," + this.makeJSONTeam(this.teamOpponent) + "]";
	return teams;
}


Board.prototype.makeJSONTeam = function(team)
{
	var pieces = "";

	for (var i = 0; i < team.length; )
	{
		var piece = team[i];

		if (piece.isAlive)
		{
			var pieceJSON = "{" + piece.makeJSON() + "}";

			if (++i < team.length)
			{
				pieceJSON = pieceJSON + ",";
			}

			pieces = pieces + pieceJSON;
		}
		else
		{
			++i;
		}
	}

	return "[" + pieces + "]";
}


Board.prototype.selectPiece = function(coordinate)
{
	var piece = this.findPieceAtPosition(coordinate);

	if (this.selectedPiece == null && piece != null && piece.isPlayers())
	// player has selected a piece
	{
		this.selectedPiece = piece;
		highlightBoardPosition(coordinate);
	}
	else if (this.selectedPiece != null && piece == null)
	// player is attempting to move the piece
	{
		var pieceCoordinate = this.selectedPiece.coordinate;
		var changeInX = coordinate.x - pieceCoordinate.x;
		var changeInY = coordinate.y - pieceCoordinate.y;

		if (this.lastMovedCoordinate == null && Math.abs(changeInX) == 1 && (changeInY == 1 || changeInY == -1))
		// regular move
		{
			if (this.selectedPiece.isNormal() && changeInY == -1)
			{
				this.unselectPiece();
			}
			else
			{
				if (coordinate.y == 7)
				{
					this.selectedPiece.ascendToKing();
				}

				this.selectedPiece.coordinate = coordinate;
				this.isLocked = true;
				this.flush();
			}
		}
		else if (Math.abs(changeInX) == 2 && (changeInY == 2 || changeInY == -2))
		// jump move
		{
			if (this.selectedPiece.isNormal() && changeInY == -2)
			{
				this.unselectPiece();
			}
			else
			{
				var newX = (pieceCoordinate.x + coordinate.x) / 2;
				var newY = (pieceCoordinate.y + coordinate.y) / 2;
				var middleCoordinate = new Coordinate(newX, newY);
				var middlePiece = this.findPieceAtPosition(middleCoordinate);

				if (this.lastMovedCoordinate == null || this.lastMovedCoordinate.equals(this.selectedPiece.coordinate))
				{
					if (middlePiece != null && middlePiece.isOpponents() && middlePiece.isAlive)
					{
						middlePiece.kill();

						if (coordinate.y == 7)
						{
							this.selectedPiece.ascendToKing();
						}

						this.lastMovedCoordinate = coordinate;
						this.selectedPiece.coordinate = coordinate;
						this.flush();
					}
					else
					{
						this.unselectPiece();
					}
				}
				else
				{
					this.unselectPiece();
				}
			}
		}
		else
		// invalid move
		{
			this.unselectPiece();
		}
	}
	else
	{
		this.unselectPiece();
	}
}


Board.prototype.send = function()
{
	if (this.isLocked || this.lastMovedCoordinate != null)
	{
		// this line requires that google chrome's security feature be disabled
		$.post("http://classygames.net/NewMove",
			{
				user_challenged: this.person.id,
				name: this.person.name,
				user_creator: MY_FACEBOOK_IDENTITY.id,
				game_id: this.gameId,
				board: this.makeJSON()
			},
			function(response)
			{
				console.log(response);
				loadGamesList();
			}
		);
	}
}


Board.prototype.undo = function()
{
	this.build();
	this.flush();
}


Board.prototype.unselectPiece = function()
{
	if (this.selectedPiece != null)
	{
		unhighlightBoardPosition(this.selectedPiece.coordinate);
	}

	this.selectedPiece = null;
}