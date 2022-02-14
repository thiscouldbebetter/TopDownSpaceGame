
class Killable2
{
	constructor(integrityMax)
	{
		this.integrityMax = integrityMax;
	}

	initialize(universeWorldPlaceEntities)
	{
		this.integrity = this.integrityMax;
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		var killable = entity.propertyByName(Killable2.name);
		if (killable.integrity <= 0)
		{
			var place = universeWorldPlaceEntities.place;
			place.entitiesToRemove.push(entity);
		}
	}
}
