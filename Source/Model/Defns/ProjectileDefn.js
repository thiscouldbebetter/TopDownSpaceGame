"use strict";
class ProjectileDefn {
    constructor(damage) {
        this.damage = damage;
    }
    static fromEntity(entity) {
        return entity.propertyByName(ProjectileDefn.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return ProjectileDefn.name; }
    updateForTimerTick(uwpe) { }
}
