
function BodyDefn(sizeInPixels)
{
	this.sizeInPixels = sizeInPixels;

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
}

{
	BodyDefn.prototype.propertyName = function() { return "Body"; }

	BodyDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		entity.body.loc.venue = venue;
	}
}
