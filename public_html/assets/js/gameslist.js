var CURRENT_TIME;


function loadGamesList()
{
	$("h1").html("Games List");
	$("#ClassyGames_Board").css("display", "none");
	$("#ClassyGames_Board_ActionBar").css("display", "none");
	$("#ClassyGames_GamesList").css("display", "inline");

	// this line requires that google chrome's security feature be disabled
	$.post("http://classygames.net/GetGames",
		{
			id: MY_FACEBOOK_IDENTITY.id
		},
		function(response) {
			CURRENT_TIME = (new Date).getTime() / 1000;

			var turnYours = response.result.success.turn_yours;
			var turnTheirs = response.result.success.turn_theirs;

			loadGamesListTurn(turnYours, "#ClassyGames_GamesList_YourTurn_List", true);
			loadGamesListTurn(turnTheirs, "#ClassyGames_GamesList_TheirTurn_List", false);

			$("#ClassyGames_GamesList_Loading").css("display", "none");
			$("#ClassyGames_GamesList_ActionBar").css("display", "inline");
		}
	);
}


function loadGamesListTurn(turn, list, isYourTurn)
{
	if (turn.length >= 1)
	{
		$($(list).parent()).css("display", "inline");
		var listElement = $(list);
		listElement.html("");

		for (var i = 0; i < turn.length; ++i)
		{
			var game = new Game(turn[i], isYourTurn);
			var html = game.toList();
			listElement.append(html);
		}
	}
	else
	{
		$($(list).parent()).css("display", "none");
		var listElement = $(list);
		listElement.html("");
	}
}