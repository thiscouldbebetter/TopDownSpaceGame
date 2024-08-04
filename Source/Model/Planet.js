"use strict";
class Planet {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.itemTradeOffer = ItemTradeOffer.random();
    }
    static fromEntity(entity) {
        return entity.propertyByName(Planet.name);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    initialize(uwpe) { }
    propertyName() { return Planet.name; }
    updateForTimerTick(uwpe) { }
}
