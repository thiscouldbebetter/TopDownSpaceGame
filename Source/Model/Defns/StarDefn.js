"use strict";
class StarDefn {
    static fromEntity(entity) {
        return entity.propertyByName(StarDefn.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
