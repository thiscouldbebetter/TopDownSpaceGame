"use strict";
class StarsystemDefn extends PlaceDefn {
    constructor(name, actionToInputsMappings) {
        super(name, null, // soundForMusicName: string,
        null, // actions: Action[],
        null, // actionToInputsMappings: ActionToInputsMapping[],
        null, // propertyNamesToProcess: string[],
        null, // placeInitialize: (uwpe: UniverseWorldPlaceEntities) => void,
        null // placeFinalize: (uwpe: UniverseWorldPlaceEntities) => void
        );
        this.actionToInputsMappings = actionToInputsMappings;
        this.actionToInputsMappingsByInputName = ArrayHelper.addLookupsMultiple(this.actionToInputsMappings, (x) => { return x.inputNames; });
        this.propertyNamesToProcess =
            [
                Locatable.name,
                Actor.name,
                MoverDefn.name,
                Constrainable.name,
                Killable.name,
                Ephemeral.name,
                Collidable.name,
            ];
    }
}
