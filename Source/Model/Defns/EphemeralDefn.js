
class EphemeralDefn
{
	constructor(ticksToLive)
	{
		this.ticksToLive = ticksToLive;
	}

	initialize(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		entity.ticksToLive =
			entity.propertyByName(EphemeralDefn.name).ticksToLive;
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		entity.ticksToLive--;
		if (entity.ticksToLive <= 0)
		{
			var place = universeWorldPlaceEntities.place;
			place.entitiesToRemove.push(entity);
		}
	}
}
