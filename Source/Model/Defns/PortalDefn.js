"use strict";
class PortalDefn {
    constructor(colorName) {
        this.colorName = colorName;
    }
    static fromEntity(entity) {
        return entity.propertyByName(PortalDefn.name);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
