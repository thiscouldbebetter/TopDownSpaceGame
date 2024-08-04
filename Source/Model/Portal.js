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
        var colors = Color.Instances();
        entity.drawable().visual = new VisualGroup([
            entity.drawable().visual,
            new VisualOffset(Coords.fromXY(0, 20), new VisualText(DataBinding.fromContext("To " + this.destinationStarsystemName), null, // font,
            colors.White, colors.Black)),
        ]);
    }
    // EntityPropertyBase.
    equals(other) { return false; }
    finalize(uwpe) { }
    propertyName() { return Portal2.name; }
    updateForTimerTick(uwpe) { }
}
