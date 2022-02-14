
class BodyDefn
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
	}

	initialize(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		entity.locatable().loc.placeName = universeWorldPlaceEntities.place.name;
	}
}
