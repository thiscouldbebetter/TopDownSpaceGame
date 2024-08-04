"use strict";
class PlanetDefn {
    static fromEntity(entity) {
        return entity.propertyByName(PlanetDefn.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return PlanetDefn.name; }
    updateForTimerTick(uwpe) { }
}
