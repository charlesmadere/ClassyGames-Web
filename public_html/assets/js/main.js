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