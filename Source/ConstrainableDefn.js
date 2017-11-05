function ConstrainableDefn()
{
	// do nothing
}
{	
	ConstrainableDefn.prototype.propertyName = function() { return "Constrainable"; }	

	ConstrainableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var universe = Globals.Instance.universe;
		var world = universe.world;
		var place = venue;

		var constraints = entity.constrainable.constraints;
		for (var i = 0; i < constraints.length; i++)
		{
			var constraint = constraints[i];
			constraint.constrain(universe, world, place, entity, constraint.target);
		}
	}
}	

