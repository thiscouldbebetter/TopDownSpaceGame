function ConstrainableDefn()
{
	// do nothing
}
{	
	ConstrainableDefn.prototype.propertyName = function() { return "Constrainable"; }	

	ConstrainableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var constraints = entity.constrainable.constraints;
		for (var i = 0; i < constraints.length; i++)
		{
			var constraint = constraints[i];
			constraint.constrainEntity(entity);
		}
	}
}	

