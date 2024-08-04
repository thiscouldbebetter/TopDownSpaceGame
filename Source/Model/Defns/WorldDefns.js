"use strict";
class WorldDefnExtended extends WorldDefn {
    constructor(colors, itemDefns, actions, activityDefns, entityDefns, starsystemDefns) {
        super([
            entityDefns // entityDefns
        ]);
        this.colors = colors;
        this.colorsByName = ArrayHelper.addLookupsByName(this.colors);
        this.itemDefns = itemDefns;
        this._itemDefnsByName =
            ArrayHelper.addLookupsByName(this.itemDefns);
        this.actions = actions;
        this._actionsByName =
            ArrayHelper.addLookupsByName(this.actions);
        this.activityDefns = activityDefns;
        this._activityDefnsByName =
            ArrayHelper.addLookupsByName(this.activityDefns);
        this.starsystemDefns = starsystemDefns;
        this.starsystemDefnsByName =
            ArrayHelper.addLookupsByName(this.starsystemDefns);
    }
    actionByName(name) { return this._actionsByName.get(name); }
    activityDefnByName(name) { return this._activityDefnsByName.get(name); }
    entityDefnByName(name) {
        return this.entityDefnsByName.get(name);
    }
    itemDefnByName(name) { return this._itemDefnsByName.get(name); }
    starsystemDefnByName(name) {
        return this.starsystemDefnsByName.get(name);
    }
}
