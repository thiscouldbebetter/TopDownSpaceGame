
function Venue(name, defnName, sizeInPixels, entities)
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

	Venue.prototype.defn = function()
	{
		return Globals.Instance.universe.venueDefns[this.defnName];
	}

	Venue.prototype.initialize = function()
	{
		var entityDefns = Globals.Instance.universe.entityDefns;

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
		
		var cameraViewSizeInPixels = Globals.Instance.display.sizeInPixels.clone();
		var cameraViewSizeInPixelsHalf = cameraViewSizeInPixels.clone().divideScalar(2);
	
		this.camera = new Entity
		(
			"Camera",
			"Camera", // entityDefnName
			[
				new Body(new Location(new Coords(0, 0))),
				new Camera(cameraViewSizeInPixels),
				new Constrainable
				(
					[
						new Constraint("FollowEntityByName", [ "Player" ]),
						new Constraint
						(
							"ConformToBounds", 
							[ 
								new Bounds
								(
									cameraViewSizeInPixelsHalf, 
									this.sizeInPixels.clone().subtract
									(
										cameraViewSizeInPixelsHalf
									)
								)
							]
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

	Venue.prototype.update = function()
	{
		Globals.Instance.display.drawVenue(this);

		this.update_EntitiesToSpawn();

		var propertyNames = 
		[
			"Actor",
			"Mover",			
			"Collidable",
			"Controllable",
			"Constrainable",
			"Killable",
			"Ephemeral",
			"Drawable",
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

	Venue.prototype.update_EntitiesToRemove = function()
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

	Venue.prototype.update_EntitiesToSpawn = function()
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

	Venue.prototype.update_EntitiesToSpawn_Spawn = function(entity, entityProperty)
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
	
	// helpers
	
	Venue.prototype.enemies = function()
	{
		return this.entitiesByPropertyName["Enemy"];
	}

	Venue.prototype.planets = function()
	{
		return this.entitiesByPropertyName["Planet"];
	}
	
	Venue.prototype.players = function()
	{
		return this.entitiesByPropertyName["Player"];
	}
	
	Venue.prototype.portals = function()
	{
		return this.entitiesByPropertyName["Portal"];
	}
	
	Venue.prototype.stars = function()
	{
		return this.entitiesByPropertyName["Star"];
	}
}
