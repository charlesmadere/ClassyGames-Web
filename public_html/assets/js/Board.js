var BOARD;


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

						if (pieceImage.tagName === "IMG")
						{
							resizePieceImage(pieceImage, rowHeight);
						}
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
	alert("(" + x + ", " + y + ")");
}


function Board(response)
{
	this.response = response.result.success;
	this.json = JSON.parse(this.response);
	this.board = this.json.board;
	this.teams = this.board.teams;
	this.teamPlayer = this.buildTeam(1, this.teams[0]);
	this.teamOpponent = this.buildTeam(2, this.teams[1]);
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
		var x = piece.coordinate.x;
		var y = piece.coordinate.y;

		var position = $("[data-x=" + x + "][data-y=" + y + "]");

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