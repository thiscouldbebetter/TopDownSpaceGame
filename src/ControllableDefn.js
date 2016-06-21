
function ControllableDefn(buildControlForEntity)
{
	this.buildControlForEntity = buildControlForEntity;
}

{
	ControllableDefn.prototype.propertyName = function() { return "Controllable"; }

	ControllableDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		var control = this.buildControlForEntity(entity);
		entity.controllable = new Controllable(control);
	}

	ControllableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		entity.controllable.control.draw(entity);
	}
}
