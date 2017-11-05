
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

	Starsystem.prototype.defn = function()
	{
		var world = Globals.Instance.universe.world;
		return world.starsystemDefns[this.defnName];
	}

	Starsystem.prototype.initialize = function()
	{
		var world = Globals.Instance.universe.world;
		var entityDefns = world.entityDefns;

		for (var i = 0; i < entityDefns.length; i++)
		{
			var properties = entityDefns[i].properties;

			for (var c = 0; c < properties.length; c++)
			{
				var property = properties[c];
				var propertyName = property.propertyName();

				if (this.entitiesByPropertyName[propertyName] == null)
				{
					this.entitiesByPropertyName[propertyName] = [];
				}
			}
		}
		
		var cameraPos = new Coords(0, 0, 0);
		var cameraViewSizeInPixels = Globals.Instance.display.sizeInPixels.clone();
		var cameraViewSizeInPixelsHalf = cameraViewSizeInPixels.clone().divideScalar(2);

		this.camera = new Entity
		(
			"Camera",
			"Camera", // entityDefnName
			[
				new Body(new Location(cameraPos)),
				new Camera(cameraViewSizeInPixels),
				new Constrainable
				(
					[
						new Constraint("FollowEntityByName", "Player"),
						new Constraint
						(
							"ConformToBounds", 						
							new Bounds
							(
								cameraPos,
								cameraViewSizeInPixels
							)
						),
					]
				),
			]
		);
	
		this.camera.body.loc.venue = this;
	
		this.entitiesToSpawn.push(this.camera);

		for (var b = 0; b < this.entities.length; b++)
		{
			var entity = this.entities[b];

			var entityProperties = entity.defn().properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initializeEntityForVenue != null)
				{
					entityProperty.initializeEntityForVenue(entity, this);
				}
			}

			var entityProperties = entity.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];

				if (entityProperty.initializeEntityForVenue != null)
				{
					entityProperty.initializeEntityForVenue(entity, this);
				}
			}
		}
	}

	Starsystem.prototype.updateForTimerTick = function()
	{
		this.draw();
		
		this.update_EntitiesToSpawn();

		var propertyNames = 
		[
			"Actor",
			"Mover",		
			"Controllable",
			"Constrainable",
			"Killable",
			"Ephemeral",
			"Collidable",			
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

				var property = entity.defn().properties[propertyName];
				
				if (property == null)
				{
					property = entity.properties[propertyName];
				}

				if (property.updateEntityForVenue != null)
				{
					property.updateEntityForVenue(entity, this);
				}
			}
		}

		this.update_EntitiesToRemove();
	}

	Starsystem.prototype.update_EntitiesToRemove = function()
	{
		for (var i = 0; i < this.entitiesToRemove.length; i++)
		{
			var entityToRemove = this.entitiesToRemove[i];

			this.entities.remove(entityToRemove);
			delete this.entities[entityToRemove.name];

			var entityProperties = entityToRemove.defn().properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				var entityProperty = entityProperties[c];
				var entityPropertyName = entityProperty.propertyName();
				var entitiesForProperty = this.entitiesByPropertyName[entityPropertyName];
				entitiesForProperty.remove(entityToRemove);
			}
		}

		this.entitiesToRemove.length = 0;
	}

	Starsystem.prototype.update_EntitiesToSpawn = function()
	{
		for (var i = 0; i < this.entitiesToSpawn.length; i++)
		{
			var entityToSpawn = this.entitiesToSpawn[i];

			this.entities.push(entityToSpawn);		
			this.entities[entityToSpawn.name] = entityToSpawn;

			var entityToSpawnDefn = entityToSpawn.defn();

			var entityProperties = entityToSpawnDefn.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				this.update_EntitiesToSpawn_Spawn(entityToSpawn, entityProperties[c]);
			}

			var entityProperties = entityToSpawn.properties;
			for (var c = 0; c < entityProperties.length; c++)
			{
				this.update_EntitiesToSpawn_Spawn(entityToSpawn, entityProperties[c]);
			}

		}

		this.entitiesToSpawn.length = 0;
	}

	Starsystem.prototype.update_EntitiesToSpawn_Spawn = function(entity, entityProperty)
	{	
		var entityPropertyName = entityProperty.propertyName();
		var entitiesForPropertyName = this.entitiesByPropertyName[entityPropertyName];
		if (entitiesForPropertyName.contains(entity) == false)
		{
			entitiesForPropertyName.push(entity);
		}

		if (entityProperty.initializeEntityForVenue != null)
		{
			entityProperty.initializeEntityForVenue(entity, this);
		}
	}
	
	// draw
	
	Starsystem.prototype.draw = function()
	{		
		var display = Globals.Instance.display;
		display.drawRectangle
		(
			Coords.Instances.Zeroes, 
			this.sizeInPixels, 
			"rgb(32, 0, 32)", // dark purple 
			"Black"
		);
		
		var drawables = this.drawables();
		
		for (var i = 0; i < drawables.length; i++)
		{
			var drawable = drawables[i];			
			var drawableDefn = drawable.defn();
			drawableDefn.drawable.updateEntityForVenue(drawable, this);
		}
	}
	
	// helpers
	
	Starsystem.prototype.drawables = function()
	{
		return this.entitiesByPropertyName["Drawable"];
	}
	
	Starsystem.prototype.enemies = function()
	{
		return this.entitiesByPropertyName["Enemy"];
	}

	Starsystem.prototype.planets = function()
	{
		return this.entitiesByPropertyName["Planet"];
	}
	
	Starsystem.prototype.players = function()
	{
		return this.entitiesByPropertyName["Player"];
	}
	
	Starsystem.prototype.portals = function()
	{
		return this.entitiesByPropertyName["Portal"];
	}
	
	Starsystem.prototype.stars = function()
	{
		return this.entitiesByPropertyName["Star"];
	}
}
