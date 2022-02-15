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
    finalize(uwpe) { }
    initialize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
