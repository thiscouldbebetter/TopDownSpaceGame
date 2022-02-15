"use strict";
class PlanetDefn {
    static fromEntity(entity) {
        return entity.propertyByName(PlanetDefn.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
