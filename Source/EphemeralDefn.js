
function EphemeralDefn(ticksToLive)
{
	this.ticksToLive = ticksToLive;
}

{
	EphemeralDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		entity.ticksToLive = entity.defn(world).ephemeral.ticksToLive;
	}

	EphemeralDefn.prototype.update = function(universe, world, venue, entity)
	{
		entity.ticksToLive--;
		if (entity.ticksToLive <= 0)
		{
			venue.entitiesToRemove.push(entity);
		}
	}
}
