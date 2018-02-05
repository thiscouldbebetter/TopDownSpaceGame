
function KillableDefn(integrityMax)
{
	this.integrityMax = integrityMax;
}

{
	KillableDefn.prototype.propertyName = function() { return "Killable"; }

	KillableDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		entity.killable = new Killable(entity.defn(universe.world).killable.integrityMax);
	}

	KillableDefn.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		if (entity.killable.integrity <= 0) { venue.entitiesToRemove.push(entity); }
	}
}
