$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript("http://connect.facebook.net/en_US/all.js", function() {
		window.fbAsyncInit = function() {
			FB.init({
				appId: "324400870964487",
				channelUrl: "channel.html",
				xfbml: true
			});

			FB.Event.subscribe("auth.authResponseChange", function(response) {
				if (response.status === "connected") {
					facebookLogin();
				}
			});
		};
	});
});


function facebookLogin()
{
	FB.api("/me", function(response) {
		$("#Facebook_Login").remove();
		$("h1").html("Games List");
		$("#ClassyGames_GamesList").css("display", "inline");
		loadGamesList(response);
	});
}


function loadGamesList(response)
{
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

			$("#ClassyGames_GamesList_Loading").remove();
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


function highlightGame(element)
{
	$(element).css("background-color", "#FFFFFF");
}


function unhighlightGame(element)
{
	$(element).css("background-color", "");
}


function loadGame(id)
{
	alert(id);
}