
function KillableDefn(integrityMax)
{
	this.integrityMax = integrityMax;
}

{
	KillableDefn.prototype.propertyName = function() { return "Killable"; }

	KillableDefn.prototype.initializeEntityForVenue = function(entity, venue) 
	{ 
		entity.killable = new Killable(entity.defn().killable.integrityMax); 
	}

	KillableDefn.prototype.updateEntityForVenue = function(entity, venue) 
	{ 
		if (entity.killable.integrity <= 0) { venue.entitiesToRemove.push(entity); } 
	} 
}
