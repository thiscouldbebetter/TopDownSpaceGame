
class BodyDefn
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
	}

	initialize(universe, world, venue, entity)
	{
		entity.locatable().loc.venue = venue;
	}
}
