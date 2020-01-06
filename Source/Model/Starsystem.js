
function Starsystem(name, defnName, sizeInPixels, entities)
{
	this.name = name;
	this.defnName = defnName;
	this.sizeInPixels = sizeInPixels;
	this.entities = [];

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);

	this.entitiesByPropertyName = [];
	this.entitiesToSpawn = entities.slice();
	this.entitiesToRemove = [];
}

{
	// instance methods

	Starsystem.prototype.defn = function(world)
	{
		return world.defns.starsystemDefns[this.defnName];
	}

	Starsystem.prototype.initialize = function(universe)
	{
		var world = universe.world;
		var entityDefns = world.defns.entityDefns;

		for (var i = 0; i < entityDefns.length; i++)
		{
			var properties = entityDefns[i].properties;

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

		var entityDefnCamera = entityDefns["Camera"];
		var camera = entityDefnCamera.CameraDefn.camera;
		var cameraViewSizeInPixels = camera.viewSize;
		var cameraLoc = camera.loc;
		var cameraPos = cameraLoc.pos;

		this.camera = entityDefnCamera.clone().nameAndPropertiesAdd
		(
			"Camera",
			[
				new Locatable(cameraLoc),
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
			]
		);

		this.camera.Locatable.loc.venue = this;

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

	Starsystem.prototype.updateForTimerTick = function(universe, world)
	{
		this.draw(universe, world);

		this.update_EntitiesToSpawn(universe, world);

		var propertyNames =
		[
			Locatable.name,
			ActorDefn.name,
			MoverDefn.name,
			//Controllable.name,
			Constrainable.name,
			Killable.name,
			EphemeralDefn.name,
			Collidable.name,
		];

		var numberOfProperties = propertyNames.length;

		for (var c = 0; c < numberOfProperties; c++)
		{
			var propertyName = propertyNames[c];

			var entitiesWithProperty = this.entitiesByPropertyName[propertyName];

			var numberOfEntitiesWithProperty = entitiesWithProperty.length;

			for (var b = 0; b < numberOfEntitiesWithProperty; b++)
			{
				var entity = entitiesWithProperty[b];

				var property = entity[propertyName];

				if (property.update != null)
				{
					property.update(universe, world, this, entity);
				}
			}
		}

		this.update_EntitiesToRemove(universe, world);
	}

	Starsystem.prototype.update_EntitiesToRemove = function(universe, world)
	{
		for (var i = 0; i < this.entitiesToRemove.length; i++)
		{
			var entityToRemove = this.entitiesToRemove[i];

			this.entities.remove(entityToRemove);
			delete this.entities[entityToRemove.name];

			var entityProperties = entityToRemove.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];
				var entityPropertyName = entityProperty.constructor.name;
				var entitiesForProperty = this.entitiesByPropertyName[entityPropertyName];
				entitiesForProperty.remove(entityToRemove);
			}
		}

		this.entitiesToRemove.length = 0;
	};

	Starsystem.prototype.update_EntitiesToSpawn = function(universe, world)
	{
		for (var i = 0; i < this.entitiesToSpawn.length; i++)
		{
			var entityToSpawn = this.entitiesToSpawn[i];

			this.entities.push(entityToSpawn);
			this.entities[entityToSpawn.name] = entityToSpawn;

			var entityProperties = entityToSpawn.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				this.update_EntitiesToSpawn_Spawn
				(
					universe, world, entityToSpawn, entityProperties[c]
				);
			}
		}

		this.entitiesToSpawn.length = 0;
	};

	Starsystem.prototype.update_EntitiesToSpawn_Spawn = function
	(
		universe, world, entity, entityProperty
	)
	{
		var entityPropertyName = entityProperty.constructor.name;
		var entitiesForPropertyName = this.entitiesByPropertyName[entityPropertyName];
		if (entitiesForPropertyName == null)
		{
			entitiesForPropertyName = [];
			this.entitiesByPropertyName[entityPropertyName] = entitiesForPropertyName;
		}

		if (entitiesForPropertyName.contains(entity) == false)
		{
			entitiesForPropertyName.push(entity);
		}

		if (entityProperty.initialize != null)
		{
			entityProperty.initialize(universe, world, this, entity);
		}
	}

	// draw

	Starsystem.prototype.draw = function(universe, world)
	{
		var display = universe.display;
		display.drawRectangle
		(
			Coords.Instances().Zeroes,
			this.sizeInPixels,
			"rgb(32, 0, 32)", // dark purple
			"Black"
		);

		var drawables = this.drawables();

		for (var i = 0; i < drawables.length; i++)
		{
			var entityDrawable = drawables[i];
			var drawable = entityDrawable.Drawable;
			drawable.update(universe, world, this, entityDrawable);
		}
	};

	// helpers

	Starsystem.prototype.drawables = function()
	{
		return this.entitiesByPropertyName[Drawable.name];
	};

	Starsystem.prototype.enemies = function()
	{
		return this.entitiesByPropertyName[Enemy.name];
	};

	Starsystem.prototype.planets = function()
	{
		return this.entitiesByPropertyName[Planet.name];
	};

	Starsystem.prototype.players = function()
	{
		return this.entitiesByPropertyName[Player.name];
	};

	Starsystem.prototype.portals = function()
	{
		return this.entitiesByPropertyName[Portal.name];
	};

	Starsystem.prototype.stars = function()
	{
		return this.entitiesByPropertyName[Star.name];
	};
}
