function Coordinate(x, y)
{
	this.x = x;
	this.y = y;
}


Coordinate.prototype.isWhitePosition = function()
{
	if (this.x % 2 === 0)
	{
		if (this.y % 2 === 0)
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
		if (this.y % 2 === 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}