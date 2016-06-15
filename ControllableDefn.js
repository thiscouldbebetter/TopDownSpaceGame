
function ControllableDefn(buildControlForEntityAndVenue)
{
	this.buildControlForEntityAndVenue = buildControlForEntityAndVenue;
}

{
	ControllableDefn.prototype.propertyName = function() { return "Controllable"; }

	ControllableDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		var control = this.buildControlForEntityAndVenue(entity, venue);
		entity.controllable = new Controllable(control);
	}

	ControllableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		entity.controllable.control.draw();
	}
}
