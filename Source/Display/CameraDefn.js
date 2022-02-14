
class CameraDefn
{
	constructor(camera)
	{
		this.camera = camera;
	}

	initialize(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;

		if (entity.camera == null)
		{
			entity.camera = this.camera;
		}
	}
}
