
class ControllableDefn
{
	constructor(buildControlForEntity)
	{
		this.buildControlForEntity = buildControlForEntity;
	} 	

	initialize(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;
		var control = this.buildControlForEntity(entity);
		entity.controllable = new Controllable(control);
	}

	update(universeWorldPlaceEntities)
	{
		var universe = universeWorldPlaceEntities.universe;
		entity.controllable.control.draw(universe.display);
	}
}
