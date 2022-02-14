
class Constrainable2
{
	constructor(constraints)
	{
		this.constraints = constraints;
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		var constraints = entity.propertyByName(Constrainable2.name).constraints;
		for (var i = 0; i < constraints.length; i++)
		{
			var constraint = constraints[i];
			constraint.constrain(universeWorldPlaceEntities);
		}
	}
}

