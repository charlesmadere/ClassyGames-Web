function Coordinate(x, y)
{
	this.x = x;
	this.y = y;
}


Coordinate.prototype.equals = function(coordinate)
{
	if (this.x == coordinate.x && this.y == coordinate.y)
	{
		return true;
	}
	else
	{
		return false;
	}
}


Coordinate.prototype.isWhitePosition = function()
{
	if (this.x % 2 == 0)
	{
		if (this.y % 2 == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		if (this.y % 2 == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}


Coordinate.prototype.makeJSON = function()
{
	return "\"coordinate\":[" + this.x + "," + this.y + "]";
}