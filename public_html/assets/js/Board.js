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
		}
	);
}


function measureBoard()
{
	var body = $("body");
	var bodyWidth = body.width();
	var board = $("#ClassyGames_Board_Board");
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


function showPositionInfo(position)
{
	var x = position.getAttribute("data-x");
	var y = position.getAttribute("data-y");
	var textToShow = "x: " + x + ", y: " + y;

	var positionInfo = document.getElementById("positionInfo");
	positionInfo.innerHTML = textToShow;
	positionInfo.style.display = "block";
}
