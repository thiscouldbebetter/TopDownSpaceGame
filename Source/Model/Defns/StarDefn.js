"use strict";
class StarDefn {
    static fromEntity(entity) {
        return entity.propertyByName(StarDefn.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return StarDefn.name; }
    updateForTimerTick(uwpe) { }
}
