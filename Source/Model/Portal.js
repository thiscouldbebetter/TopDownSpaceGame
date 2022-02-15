"use strict";
class Portal2 {
    constructor(destinationStarsystemName, destinationPos) {
        this.destinationStarsystemName = destinationStarsystemName;
        this.destinationPos = destinationPos;
    }
    static fromEntity(entity) {
        return entity.propertyByName(Portal2.name);
    }
    destinationStarsystem(world) {
        return world.starsystemByName(this.destinationStarsystemName);
    }
    initialize(universeWorldPlaceEntities) {
        var entity = universeWorldPlaceEntities.entity;
        entity.drawable().visual = new VisualGroup([
            entity.drawable().visual,
            new VisualOffset(new VisualText(DataBinding.fromContext("To " + this.destinationStarsystemName), null, // fontHeight
            Color.byName("White"), Color.byName("Black")), Coords.fromXY(0, 20)),
        ]);
    }
    // EntityPropertyBase.
    finalize(uwpe) { }
    equals(other) { return false; }
    updateForTimerTick(uwpe) { }
}
