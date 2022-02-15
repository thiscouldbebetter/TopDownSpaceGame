
class VisualCameraProjection implements VisualBase
{
	camera: Camera;
	child: any;

	_drawablePosToRestore: Coords;

	constructor(camera: Camera, child: any)
	{
		this.camera = camera;
		this.child = child;

		this._drawablePosToRestore = Coords.create();
	}

	draw
	(
		universeWorldPlaceEntities: UniverseWorldPlaceEntities,
		display: Display
	): void
	{
		var entity = universeWorldPlaceEntities.entity;

		var camera = this.camera;
		var cameraViewSizeHalf = camera.viewSizeHalf;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;
		var cameraOrientation = cameraLoc.orientation;

		var drawPos = entity.locatable().loc.pos;
		this._drawablePosToRestore.overwriteWith(drawPos);

		drawPos.subtract(cameraPos);
		cameraOrientation.projectCoords(drawPos);
		var drawPosZ = drawPos.z;
		if (drawPosZ != 0)
		{
			drawPos.clearZ();
			drawPos.multiplyScalar(camera.focalLength).divideScalar(drawPosZ);
			drawPos.z = drawPosZ;
		}
		drawPos.add(cameraViewSizeHalf);

		this.child.draw(universeWorldPlaceEntities, display);

		drawPos.overwriteWith(this._drawablePosToRestore);
	}

	// VisualBase.

	clone(): VisualBase { return this; }
	overwriteWith(other: VisualBase): VisualBase { return this; }
	transform(transformToApply: TransformBase): VisualBase { return this; }
}
