
class Killable
{
	constructor(integrityMax)
	{
		this.integrityMax = integrityMax;
	}

	initialize(universe, world, venue, entity)
	{
		this.integrity = this.integrityMax;
	}

	update(universe, world, venue, entity)
	{
		if (entity.Killable.integrity <= 0) { venue.entitiesToRemove.push(entity); }
	}
}
