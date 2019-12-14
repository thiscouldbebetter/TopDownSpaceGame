
function BodyDefn(sizeInPixels)
{
	this.sizeInPixels = sizeInPixels;

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
}

{
	BodyDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		entity.body.loc.venue = venue;
	}
}
