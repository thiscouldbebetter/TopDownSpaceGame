"use strict";
class FriendlyDefn {
    static fromEntity(entity) {
        return entity.propertyByName(FriendlyDefn.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return FriendlyDefn.name; }
    updateForTimerTick(uwpe) { }
}
