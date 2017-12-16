
function ControllableDefn(buildControlForEntity)
{
	this.buildControlForEntity = buildControlForEntity;
}

{
	ControllableDefn.prototype.propertyName = function() { return "Controllable"; }

	ControllableDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		var control = this.buildControlForEntity(entity);
		entity.controllable = new Controllable(control);
	}

	ControllableDefn.prototype.updateEntityForVenue = function(universe, entity, venue)
	{
		entity.controllable.control.draw(universe.display);
	}
}
