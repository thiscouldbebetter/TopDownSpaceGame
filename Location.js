
function Location(pos)
{
	//this.venue = venue;
	this.pos = pos;
	this.orientation = new Orientation(new Coords(1, 0));

	this.vel = new Coords(0, 0);
	this.accel = new Coords(0, 0);
	this.force = new Coords(0, 0);
}

{
	Location.prototype.clone = function()
	{
		var returnValue = new Location
		(
			this.pos.clone()
		);

		returnValue.venue = returnValue.venue;
		returnValue.vel = returnValue.vel.clone();
		returnValue.accel = returnValue.accel.clone();
		returnValue.force = returnValue.force.clone();


		return returnValue;
	}

	Location.prototype.overwriteWith = function(other)
	{
		this.venue = other.venue;
		this.pos.overwriteWith(other.pos);
	}
}
