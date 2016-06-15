
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	// constants

	Coords.NumberOfDimensions = 2;

	// instances

	Coords.Instances = new Coords_Instances();

	function Coords_Instances()
	{
		this.Ones = new Coords(1, 1);
		this.Twos = new Coords(2, 2);
		this.Zeroes = new Coords(0, 0);
	}

	// instance methods

	Coords.prototype.absolute = function()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	Coords.prototype.addXY = function(x, y)
	{
		this.x += x;
		this.y += y;
		return this;
	}

	Coords.prototype.clear = function()
	{
		this.x = 0;
		this.y = 0;
		return this;
	}

	Coords.prototype.clone = function()
	{
		var returnValue = new Coords(this.x, this.y);
		return returnValue;
	}

	Coords.prototype.dimension = function(dimensionIndex)
	{
		var returnValue;

		if (dimensionIndex == 0)
		{
			returnValue = this.x;
		}
		else
		{
			returnValue = this.y;
		}

		return returnValue;
	}

	Coords.prototype.directions = function()
	{
		if (this.x > 0)
		{
			this.x = 1;
		}
		else if (this.x < 0)
		{
			this.x = -1;
		}

		if (this.y > 0)
		{
			this.y = 1;
		}
		else if (this.y < 0)
		{
			this.y = -1;
		}

		return this;
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	Coords.prototype.equals = function(other)
	{
		return (this.x == other.x && this.y == other.y);
	}

	Coords.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	Coords.prototype.magnitude = function()
	{
		var returnValue = Math.sqrt(this.x * this.x + this.y * this.y);

		return returnValue;
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	Coords.prototype.normalize = function()
	{
		var returnValue;

		var magnitude = this.magnitude();
		if (magnitude == 0)
		{
			returnValue = this;
		}
		{
			returnValue = this.divideScalar(magnitude);
		}

		return returnValue;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	Coords.prototype.overwriteWithDimensions = function(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	Coords.prototype.randomize = function()
	{
		this.x = Math.random();
		this.y = Math.random();
		return this;
	}

	Coords.prototype.round = function()
	{
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	Coords.prototype.sumOfXAndY = function()
	{
		return this.x + this.y;
	}

	Coords.prototype.toString = function()
	{
		return this.x + "x" + this.y;
	}

	Coords.prototype.trimToRange = function(rangeToTrimTo)
	{
		if (this.x < 0)
		{
			this.x = 0;
		}
		else if (this.x > rangeToTrimTo.x)
		{
			this.x = rangeToTrimTo.x;
		}

		if (this.y < 0)
		{
			this.y = 0;
		}
		else if (this.y > rangeToTrimTo.y)
		{
			this.y = rangeToTrimTo.y;
		}

		return this;
	}

	Coords.prototype.wrapToRange = function(range)
	{
		if (this.x < 0)
		{
			this.x += range.x;
		}
		else if (this.x >= range.x)
		{
			this.x -= range.x;
		}

		if (this.y < 0)
		{
			this.y += range.y;
		}
		else if (this.y >= range.y)
		{
			this.y -= range.y;
		}

		return this;
	}
}
