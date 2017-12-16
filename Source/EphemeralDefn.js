
function EphemeralDefn(ticksToLive)
{
	this.ticksToLive = ticksToLive;
}

{
	EphemeralDefn.prototype.propertyName = function() { return "Ephemeral"; }

	EphemeralDefn.prototype.initializeEntityForVenue = function(universe, entity, venue) 
	{ 
		entity.ticksToLive = entity.defn(universe.world).ephemeral.ticksToLive; 
	}
	
	EphemeralDefn.prototype.updateEntityForVenue = function(universe, entity, venue) 
	{ 
		entity.ticksToLive--; 
		if (entity.ticksToLive <= 0)
		{
			venue.entitiesToRemove.push(entity);
		}
	}
}
