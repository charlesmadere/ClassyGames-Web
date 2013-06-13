function Game(game, isYourTurn)
{
	this.id = game.game_id;
	this.isYourTurn = isYourTurn;
	this.type = game.game_type;
	this.lastMove = game.last_move;
	this.person = new Person(game.id, game.name);
}


Game.prototype.calculateLastMoveTimeAgo = function()
{
	var timeDifference = CURRENT_TIME - this.lastMove;
	var timeAgoAsString = timeDifference + " seconds ago";

	// calculate number of weeks
	var timeAgo = Math.round(timeDifference / 604800);

	if (timeAgo >= 1)
	{
		if (timeAgo == 1)
		{
			timeAgoAsString = timeAgo + " week ago";
		}
		else if (timeAgo == 2)
		{
			timeAgoAsString = timeAgo + " weeks ago";
		}
		else
		{
			timeAgoAsString = "more than 2 weeks ago";
		}
	}
	else
	{
		// calculate number of days
		timeAgo = Math.round(timeDifference / 86400);

		if (timeAgo >= 1)
		{
			if (timeAgo == 1)
			{
				timeAgoAsString = timeAgo + " day ago";
			}
			else if (timeAgo >= 2 && timeAgo <= 5)
			{
				timeAgoAsString = timeAgo + " days ago";
			}
			else
			{
				timeAgoAsString = "almost a week ago";
			}
		}
		else
		{
			// calculate number of hours
			timeAgo = Math.round(timeDifference / 3600);

			if (timeAgo >= 1)
			{
				if (timeAgo == 1)
				{
					timeAgoAsString = timeAgo + " hour ago";
				}
				else if (timeAgo >= 2 && timeAgo <= 12)
				{
					timeAgoAsString = timeAgo + " hours ago";
				}
				else if (timeAgo > 12 && timeAgo <= 18)
				{
					timeAgoAsString = "about half a day ago";
				}
				else
				{
					timeAgoAsString = "almost a day ago";
				}
			}
			else
			{
				// calculate number of minutes
				timeAgo = Math.round(timeDifference / 60);

				if (timeAgo >= 1)
				{
					if (timeAgo == 1)
					{
						timeAgoAsString = "1 minute ago";
					}
					else if (timeAgo >= 2 && timeAgo <= 45)
					{
						timeAgoAsString = timeAgo + " minutes ago";
					}
					else
					{
						timeAgoAsString = "almost an hour ago";
					}
				}
				else
				{
					timeAgoAsString = "just now";
				}
			}
		}
	}

	return timeAgoAsString;
}


Game.prototype.print = function()
{
	console.log(this.toString());
}


Game.prototype.toList = function()
{
	var begin = "<li";

	if (this.isYourTurn)
	{
		begin = begin + " onclick=\"loadBoard('" + this.id + "', " + this.person.id + ", '" + this.person.name + "');\"";
	}

	begin = begin + ">";
	var img = "<img src=\"https://graph.facebook.com/" + this.person.id + "/picture?type=square\" />";
	var name = "<div class=\"ClassyGames_GamesList_Game_Name\">" + this.person.name + "</div>";
	var time = "<div class=\"ClassyGames_GamesList_Game_Time\">" + this.calculateLastMoveTimeAgo() + "</div>";
	var clear = "<div class=\"clear\"></div>";
	var end = "</li>";

	return begin + img + name + time + clear + end + "\n";
}


Game.prototype.toString = function()
{
	return this.id + " " + this.type + " " + this.lastMove + " " + this.person.toString();
}