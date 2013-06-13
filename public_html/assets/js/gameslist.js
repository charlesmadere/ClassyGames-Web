function loadGamesList(response)
{
	// this line requires that google chrome's security feature be disabled
	$.post("http://classygames.net/GetGames",
		{
			id: response.id
		},
		function(response) {
			var currentTime = (new Date).getTime() / 1000;

			var turnYours = response.result.success.turn_yours;
			var turnTheirs = response.result.success.turn_theirs;

			loadGamesListTurn(turnYours, "#ClassyGames_GamesList_YourTurn_List", currentTime);
			loadGamesListTurn(turnTheirs, "#ClassyGames_GamesList_TheirTurn_List", currentTime);

			$("#ClassyGames_GamesList_Loading").css("display", "none");
		}
	);
}


function loadGamesListTurn(turn, list, currentTime)
{
	if (turn.length >= 1)
	{
		$($(list).parent()).css("display", "inline");

		for (var i = 0; i < turn.length; ++i)
		{
			var game = new Game(turn[i]);
			var html = game.toList(currentTime);
			$(list).append(html);
		}
	}
}