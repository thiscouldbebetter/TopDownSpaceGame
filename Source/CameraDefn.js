function CameraDefn(camera)
{
	this.camera = camera;
}
{
	CameraDefn.prototype.propertyName = function() { return "Camera"; }

	CameraDefn.prototype.initializeEntityForVenue = function(universe, entity, venue)
	{
		if (entity.camera == null)
		{
			entity.camera = this.camera;
		}
	}
}
