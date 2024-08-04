"use strict";
class WorldExtended extends World {
    constructor(name, defn, starsystems) {
        super(name, DateTime.now(), defn, (name) => starsystems.find(x => x.name == name), starsystems[0].name);
        this.starsystems = starsystems;
        this.starsystemsByName =
            ArrayHelper.addLookupsByName(this.starsystems);
        this.timerTicksSoFar = 0;
        // hack
        this.initialize(null);
    }
    // static methods
    static create(universe, worldCreator) {
        return new Demo().worldGrid(universe, null);
    }
    // instance methods
    draw() {
        // todo
    }
    initialize(uwpe) {
        this.starsystemNext = this.starsystems[0];
    }
    placeByName(name) {
        return this.starsystemsByName.get(name);
    }
    secondsSoFar(universe) {
        return Math.round(this.timerTicksSoFar / universe.timerHelper.ticksPerSecond);
    }
    starsystemByName(name) {
        return this.starsystemsByName.get(name);
    }
    toControl() {
        return new ControlNone();
    }
    toVenue() {
        return new VenueWorld(this);
    }
    updateForTimerTick(universeWorldPlaceEntities) {
        universeWorldPlaceEntities.worldSet(this);
        if (this.starsystemNext != null) {
            this.starsystemNext.initialize(universeWorldPlaceEntities);
            this.starsystemCurrent = this.starsystemNext;
            this.starsystemNext = null;
        }
        this.starsystemCurrent.updateForTimerTick(universeWorldPlaceEntities);
        this.timerTicksSoFar++;
    }
}
