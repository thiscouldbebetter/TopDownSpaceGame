
function KillableDefn(integrityMax)
{
	this.integrityMax = integrityMax;
}

{
	KillableDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		entity.killable = new Killable(entity.defn(world).killable.integrityMax);
	}

	KillableDefn.prototype.update = function(universe, world, venue, entity)
	{
		if (entity.killable.integrity <= 0) { venue.entitiesToRemove.push(entity); }
	}
}
