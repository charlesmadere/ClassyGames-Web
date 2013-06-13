function loadGamesList(response)
{
	$("h1").html("Games List");
	$("#ClassyGames_GamesList").css("display", "inline");

	// this line requires that google chrome's security feature be disabled
	$.post("http://classygames.net/GetGames",
		{
			id: response.id
		},
		function(response) {
			CURRENT_TIME = (new Date).getTime() / 1000;

			var turnYours = response.result.success.turn_yours;
			var turnTheirs = response.result.success.turn_theirs;

			loadGamesListTurn(turnYours, "#ClassyGames_GamesList_YourTurn_List");
			loadGamesListTurn(turnTheirs, "#ClassyGames_GamesList_TheirTurn_List");

			$("#ClassyGames_GamesList_Loading").css("display", "none");
		}
	);
}


function loadGamesListTurn(turn, list)
{
	if (turn.length >= 1)
	{
		$($(list).parent()).css("display", "inline");

		for (var i = 0; i < turn.length; ++i)
		{
			var game = new Game(turn[i]);
			var html = game.toList();
			$(list).append(html);
		}
	}
}