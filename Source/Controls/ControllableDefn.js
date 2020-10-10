
class ControllableDefn
{
	constructor(buildControlForEntity)
	{
		this.buildControlForEntity = buildControlForEntity;
	}

	initialize(universe, world, venue, entity)
	{
		var control = this.buildControlForEntity(entity);
		entity.controllable = new Controllable(control);
	}

	update(universe, world, venue, entity)
	{
		entity.controllable.control.draw(universe.display);
	}
}
