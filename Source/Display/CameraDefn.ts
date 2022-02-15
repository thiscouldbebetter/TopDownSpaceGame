
class CameraDefn implements EntityPropertyBase
{
	camera: Camera;

	constructor(camera: Camera)
	{
		this.camera = camera;
	}

	static fromEntity(entity: Entity): CameraDefn
	{
		return entity.propertyByName(CameraDefn.name) as CameraDefn;
	}

	initialize(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var entity = universeWorldPlaceEntities.entity;

		if (entity.camera == null)
		{
			entity.camera = () => this.camera;
		}
	}

	// EntityPropertyBase.

	finalize(uwpe: UniverseWorldPlaceEntities): void {}
	equals(other: CameraDefn): boolean { return false; }
	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void {}

}
