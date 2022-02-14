
class Starsystem extends Place
{
	constructor(name, defnName, sizeInPixels, entities)
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

	defn(world)
	{
		return world.defn.starsystemDefnsByName.get(this.defnName);
	}

	initialize(universeWorldPlaceEntities)
	{
		var universe = universeWorldPlaceEntities.universe;
		var world = universeWorldPlaceEntities.world;

		var entityDefns = world.defn.entityDefns;

		for (var i = 0; i < entityDefns.length; i++)
		{
			var entityDefn = entityDefns[i];
			var properties = entityDefn.properties;

			for (var c = 0; c < properties.length; c++)
			{
				var property = properties[c];
				var propertyName = property.constructor.name;

				if (this.entitiesByPropertyName[propertyName] == null)
				{
					this.entitiesByPropertyName[propertyName] = [];
				}
			}
		}

		var entityDefnCamera = world.defn.entityDefnByName("Camera");
		var camera = entityDefnCamera.propertyByName(CameraDefn.name).camera;
		var cameraViewSizeInPixels = camera.viewSize;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;

		this.camera = entityDefnCamera.clone().nameSet
		(
			"Camera"
		).propertyAddForPlace
		(
			new Locatable(cameraLoc), null // place
		).propertyAddForPlace
		(
			new Constrainable2
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

		this.camera.locatable().loc.venue = this;

		this.entitiesToSpawn.push(this.camera);

		for (var b = 0; b < this.entities.length; b++)
		{
			var entity = this.entities[b];

			var entityProperties = entity.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initialize != null)
				{
					entityProperty.initialize(universe, world, this, entity);
				}
			}
		}
	}

	updateForTimerTick(uwpe)
	{
		this.draw(uwpe);
		super.updateForTimerTick(uwpe);
	}

	// draw

	draw(universeWorldPlaceEntities)
	{
		var universe = universeWorldPlaceEntities.universe;

		var display = universe.display;
		display.drawBackground
		(
			Color.Instances().VioletEighth, // dark purple
			Color.Instances().Black
		);

		var drawables = this.drawables();

		for (var i = 0; i < drawables.length; i++)
		{
			var entityDrawable = drawables[i];
			universeWorldPlaceEntities.entitySet(entityDrawable);
			var drawable = entityDrawable.drawable();
			drawable.updateForTimerTick(universeWorldPlaceEntities);
		}
	}

	// helpers

	enemies()
	{
		return this.entitiesByPropertyName(Enemy.name);
	}

	planets()
	{
		return this.entitiesByPropertyName(Planet.name);
	}

	players()
	{
		return this.entitiesByPropertyName(Player.name);
	}

	portals()
	{
		return this.entitiesByPropertyName(Portal.name);
	}

	stars()
	{
		return this.entitiesByPropertyName(Star.name);
	}
}
