function CameraDefn(camera)
{
	this.camera = camera;
}
{
	CameraDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		if (entity.camera == null)
		{
			entity.camera = this.camera;
		}
	}
}
