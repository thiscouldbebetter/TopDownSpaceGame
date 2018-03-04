
function ControllableDefn(buildControlForEntity)
{
	this.buildControlForEntity = buildControlForEntity;
}

{
	ControllableDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		var control = this.buildControlForEntity(entity);
		entity.controllable = new Controllable(control);
	}

	ControllableDefn.prototype.update = function(universe, world, venue, entity)
	{
		entity.controllable.control.draw(universe.display);
	}
}
