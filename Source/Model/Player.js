"use strict";
class Player {
    static fromEntity(entity) {
        return entity.propertyByName(Player.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
