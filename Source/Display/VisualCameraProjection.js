"use strict";
class VisualCameraProjection {
    constructor(camera, child) {
        this.camera = camera;
        this.child = child;
        this._drawablePosToRestore = Coords.create();
    }
    draw(universeWorldPlaceEntities, display) {
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
        if (drawPosZ != 0) {
            drawPos.clearZ();
            drawPos.multiplyScalar(camera.focalLength).divideScalar(drawPosZ);
            drawPos.z = drawPosZ;
        }
        drawPos.add(cameraViewSizeHalf);
        this.child.draw(universeWorldPlaceEntities, display);
        drawPos.overwriteWith(this._drawablePosToRestore);
    }
    // VisualBase.
    clone() { return this; }
    overwriteWith(other) { return this; }
    transform(transformToApply) { return this; }
}
