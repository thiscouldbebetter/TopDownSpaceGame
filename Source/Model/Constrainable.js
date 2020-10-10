
class Constrainable
{
	constructor(constraints)
	{
		this.constraints = constraints;
	}

	update(universe, world, venue, entity)
	{
		var constraints = entity.Constrainable.constraints;
		for (var i = 0; i < constraints.length; i++)
		{
			var constraint = constraints[i];
			constraint.constrain(universe, world, venue, entity);
		}
	}
}

