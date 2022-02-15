
class Starsystem extends Place
{
	sizeHalf: Coords;

	constructor
	(
		name: string,
		defnName: string,
		sizeInPixels: Coords,
		entities: Entity[]
	)
	{
		super
		(
			name,
			defnName,
			null, // parentName
			sizeInPixels,
			entities
		)

		this.sizeHalf = this.size.clone().divideScalar(2);
	}

	defn(world: WorldExtended): StarsystemDefn
	{
		return (world.defn as WorldDefnExtended).starsystemDefnByName(this.defnName);
	}

	initialize(universeWorldPlaceEntities: UniverseWorldPlaceEntities): void
	{
		var world = universeWorldPlaceEntities.world as WorldExtended;

		universeWorldPlaceEntities.placeSet(this);

		var entityDefns = world.defn.entityDefns;

		for (var i = 0; i < entityDefns.length; i++)
		{
			var entityDefn = entityDefns[i];
			var properties = entityDefn.properties;

			for (var c = 0; c < properties.length; c++)
			{
				var property = properties[c];
				var propertyName = property.constructor.name;

				var entitiesWithProperty = this.entitiesByPropertyName(propertyName);
				if (entitiesWithProperty == null)
				{
					this._entitiesByPropertyName.set
					(
						propertyName, new Array<Entity>()
					);
				}
			}
		}

		var entityDefnCamera = (world.defn as WorldDefnExtended).entityDefnByName("Camera");
		var camera = CameraDefn.fromEntity(entityDefnCamera).camera;
		var cameraViewSizeInPixels = camera.viewSize;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;

		var camera2 = entityDefnCamera.clone().nameSet
		(
			"Camera"
		).propertyAddForPlace
		(
			new Locatable(cameraLoc), null // place
		).propertyAddForPlace
		(
			new Constrainable
			(
				[
					new Constraint_FollowEntityByName("Player"),
					new Constraint_ConformToBounds
					(
						new Box
						(
							cameraPos,
							cameraViewSizeInPixels
						)
					),
				]
			),
			null // place
		);

		camera2.locatable().loc.placeName = this.name;

		this.camera = () => camera2;

		this.entitiesToSpawn.push(camera2);

		for (var b = 0; b < this.entities.length; b++)
		{
			var entity = this.entities[b];

			var entityProperties = entity.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initialize != null)
				{
					universeWorldPlaceEntities.entitySet(entity);
					entityProperty.initialize(universeWorldPlaceEntities);
				}
			}
		}
	}

	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void
	{
		this.draw(uwpe.universe, uwpe.world, uwpe.universe.display);
		super.updateForTimerTick(uwpe);
	}

	// draw

	draw(universe: Universe, world: World, display: Display): void
	{
		display.drawBackground
		(
			Color.Instances().VioletEighth, // dark purple
			Color.Instances().Black
		);

		var drawables = this.drawables();

		var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);
		for (var i = 0; i < drawables.length; i++)
		{
			var entityDrawable = drawables[i];
			uwpe.entitySet(entityDrawable);
			var drawable = entityDrawable.drawable();
			drawable.updateForTimerTick(uwpe);
		}
	}

	// helpers

	enemies(): Entity[]
	{
		return this.entitiesByPropertyName(Enemy.name);
	}

	planets(): Entity[]
	{
		return this.entitiesByPropertyName(Planet.name);
	}

	players(): Entity[]
	{
		return this.entitiesByPropertyName(Player.name);
	}

	portals(): Entity[]
	{
		return this.entitiesByPropertyName(Portal2.name);
	}

	stars(): Entity[]
	{
		return this.entitiesByPropertyName(Star.name);
	}
}
