
class EphemeralDefn
{
	constructor(ticksToLive)
	{
		this.ticksToLive = ticksToLive;
	}

	initialize(universe, world, venue, entity)
	{
		entity.ticksToLive = entity.EphemeralDefn.ticksToLive;
	}

	update(universe, world, venue, entity)
	{
		entity.ticksToLive--;
		if (entity.ticksToLive <= 0)
		{
			venue.entitiesToRemove.push(entity);
		}
	}
}
