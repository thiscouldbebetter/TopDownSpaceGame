"use strict";
class FriendlyDefn {
    static fromEntity(entity) {
        return entity.propertyByName(FriendlyDefn.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
