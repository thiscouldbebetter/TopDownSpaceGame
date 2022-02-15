"use strict";
class BodyDefn {
    constructor(sizeInPixels) {
        this.sizeInPixels = sizeInPixels;
        this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
    }
    static fromEntity(entity) {
        return entity.propertyByName(BodyDefn.name);
    }
    initialize(universeWorldPlaceEntities) {
        var entity = universeWorldPlaceEntities.entity;
        entity.locatable().loc.placeName = universeWorldPlaceEntities.place.name;
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
