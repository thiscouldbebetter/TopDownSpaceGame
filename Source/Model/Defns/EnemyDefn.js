"use strict";
class Enemy {
    static fromEntity(entity) {
        return entity.propertyByName(Enemy.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    propertyName() { return Enemy.name; }
    updateForTimerTick(uwpe) { }
}
