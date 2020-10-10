
class CameraDefn
{
	constructor(camera)
	{
		this.camera = camera;
	}

	initialize(universe, world, venue, entity)
	{
		if (entity.camera == null)
		{
			entity.camera = this.camera;
		}
	}
}
