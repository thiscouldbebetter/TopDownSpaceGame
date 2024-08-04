"use strict";
class PortalDefn {
    constructor(colorName) {
        this.colorName = colorName;
    }
    static fromEntity(entity) {
        return entity.propertyByName(PortalDefn.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return PortalDefn.name; }
    updateForTimerTick(uwpe) { }
}
