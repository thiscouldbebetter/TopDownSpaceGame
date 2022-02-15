"use strict";
class Starsystem extends Place {
    constructor(name, defnName, sizeInPixels, entities) {
        super(name, defnName, null, // parentName
        sizeInPixels, entities);
        this.sizeHalf = this.size.clone().divideScalar(2);
    }
    defn(world) {
        return world.defn.starsystemDefnByName(this.defnName);
    }
    initialize(universeWorldPlaceEntities) {
        var world = universeWorldPlaceEntities.world;
        universeWorldPlaceEntities.placeSet(this);
        var entityDefns = world.defn.entityDefns;
        for (var i = 0; i < entityDefns.length; i++) {
            var entityDefn = entityDefns[i];
            var properties = entityDefn.properties;
            for (var c = 0; c < properties.length; c++) {
                var property = properties[c];
                var propertyName = property.constructor.name;
                var entitiesWithProperty = this.entitiesByPropertyName(propertyName);
                if (entitiesWithProperty == null) {
                    this._entitiesByPropertyName.set(propertyName, new Array());
                }
            }
        }
        var entityDefnCamera = world.defn.entityDefnByName("Camera");
        var camera = CameraDefn.fromEntity(entityDefnCamera).camera;
        var cameraViewSizeInPixels = camera.viewSize;
        var cameraLoc = camera.loc;
        var cameraPos = cameraLoc.pos;
        var camera2 = entityDefnCamera.clone().nameSet("Camera").propertyAddForPlace(new Locatable(cameraLoc), null // place
        ).propertyAddForPlace(new Constrainable([
            new Constraint_FollowEntityByName("Player"),
            new Constraint_ConformToBounds(new Box(cameraPos, cameraViewSizeInPixels)),
        ]), null // place
        );
        camera2.locatable().loc.placeName = this.name;
        this.camera = () => camera2;
        this.entitiesToSpawn.push(camera2);
        for (var b = 0; b < this.entities.length; b++) {
            var entity = this.entities[b];
            var entityProperties = entity.properties;
            for (var c = 0; c < entityProperties.length; c++) {
                var entityProperty = entityProperties[c];
                if (entityProperty.initialize != null) {
                    universeWorldPlaceEntities.entitySet(entity);
                    entityProperty.initialize(universeWorldPlaceEntities);
                }
            }
        }
    }
    updateForTimerTick(uwpe) {
        this.draw(uwpe.universe, uwpe.world, uwpe.universe.display);
        super.updateForTimerTick(uwpe);
    }
    // draw
    draw(universe, world, display) {
        display.drawBackground(Color.Instances().VioletEighth, // dark purple
        Color.Instances().Black);
        var drawables = this.drawables();
        var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
        for (var i = 0; i < drawables.length; i++) {
            var entityDrawable = drawables[i];
            uwpe.entitySet(entityDrawable);
            var drawable = entityDrawable.drawable();
            drawable.updateForTimerTick(uwpe);
        }
    }
    // helpers
    enemies() {
        return this.entitiesByPropertyName(Enemy.name);
    }
    planets() {
        return this.entitiesByPropertyName(Planet.name);
    }
    players() {
        return this.entitiesByPropertyName(Player.name);
    }
    portals() {
        return this.entitiesByPropertyName(Portal2.name);
    }
    stars() {
        return this.entitiesByPropertyName(Star.name);
    }
}
