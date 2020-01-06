
function VisualCameraProjection(camera, child)
{
	this.camera = camera;
	this.child = child;

	this._drawablePosToRestore = new Coords();
}
{
	VisualCameraProjection.prototype.draw = function(universe, world, display, drawable, entity)
	{
		var camera = this.camera;
		var cameraViewSizeHalf = camera.viewSizeHalf;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;
		var cameraOrientation = cameraLoc.orientation;

		var drawPos = entity.Locatable.loc.pos;
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

		this.child.draw(universe, world, display, drawable, entity);

		drawPos.overwriteWith(this._drawablePosToRestore);
	};
}
