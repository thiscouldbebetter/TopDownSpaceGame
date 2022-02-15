"use strict";
class Star {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    static fromEntity(entity) {
        return entity.propertyByName(Star.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
