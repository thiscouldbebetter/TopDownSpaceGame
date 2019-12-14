function ConstrainableDefn()
{
	// do nothing
}
{
	ConstrainableDefn.prototype.update = function(universe, world, venue, entity)
	{
		var constraints = entity.constrainable.constraints;
		for (var i = 0; i < constraints.length; i++)
		{
			var constraint = constraints[i];
			constraint.constrain(universe, world, venue, entity);
		}
	}
}

