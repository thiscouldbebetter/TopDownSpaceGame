
function Killable(integrityMax)
{
	this.integrityMax = integrityMax;
}

{
	Killable.prototype.initialize = function(universe, world, venue, entity)
	{
		this.integrity = this.integrityMax;
	}

	Killable.prototype.update = function(universe, world, venue, entity)
	{
		if (entity.Killable.integrity <= 0) { venue.entitiesToRemove.push(entity); }
	}
}
