"use strict";
class Player {
    static fromEntity(entity) {
        return entity.propertyByName(Player.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return Player.name; }
    updateForTimerTick(uwpe) { }
}
