"use strict";
class ProjectileDefn {
    constructor(damage) {
        this.damage = damage;
    }
    static fromEntity(entity) {
        return entity.propertyByName(ProjectileDefn.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
