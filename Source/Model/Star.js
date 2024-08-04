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
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return Star.name; }
    updateForTimerTick(uwpe) { }
}
