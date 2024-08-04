"use strict";
class CameraDefn {
    constructor(camera) {
        this.camera = camera;
    }
    static fromEntity(entity) {
        return entity.propertyByName(CameraDefn.name);
    }
    initialize(universeWorldPlaceEntities) {
        var entity = universeWorldPlaceEntities.entity;
        if (entity.camera == null) {
            entity.camera = () => this.camera;
        }
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    equals(other) { return false; }
    propertyName() { return CameraDefn.name; }
    updateForTimerTick(uwpe) { }
}
