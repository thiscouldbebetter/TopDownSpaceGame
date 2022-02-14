
class Collidable2
{
	constructor(colliderAtRest, propertyNamesCollidedWith, collide)
	{
		this.colliderAtRest = colliderAtRest;
		this.propertyNamesCollidedWith = propertyNamesCollidedWith;
		this.collide = collide;

		this.collider = this.colliderAtRest.clone();
	}

	initialize(universeWorldPlaceEntities)
	{
		this.update_Collider(universeWorldPlaceEntities);
	}

	updateForTimerTick(universeWorldPlaceEntities)
	{
		var universe = universeWorldPlaceEntities.universe;
		var place = universeWorldPlaceEntities.place;
		var entity = universeWorldPlaceEntities.entity;

		var collisionHelper = universe.collisionHelper;

		var colliderThis = this.update_Collider(universeWorldPlaceEntities);

		for (var i = 0; i < this.propertyNamesCollidedWith.length; i++)
		{
			var propertyName = this.propertyNamesCollidedWith[i];
			var entitiesToCollideWith = place.entitiesByPropertyName(propertyName);

			for (var j = 0; j < entitiesToCollideWith.length; j++)
			{
				var entityOther = entitiesToCollideWith[j];
				if (entityOther != entity)
				{
					universeWorldPlaceEntities.entity2Set(entityOther);
					universeWorldPlaceEntities.entitiesSwap();
					var colliderOther = this.update_Collider(universeWorldPlaceEntities);
					universeWorldPlaceEntities.entitiesSwap();

					var doEntitiesCollide = collisionHelper.doCollidersCollide
					(
						colliderThis, colliderOther
					);

					if (doEntitiesCollide)
					{
						var entityCollidable = entity.propertyByName(Collidable2.name);
						entityCollidable.collide
						(
							universeWorldPlaceEntities
						);
						var entityOtherCollidable = entityOther.propertyByName(Collidable2.name);
						entityOtherCollidable.collide
						(
							universeWorldPlaceEntities.entitiesSwap()
						);
						universeWorldPlaceEntities.entitiesSwap();
					}
				}
			}
		}
	}

	update_Collider(universeWorldPlaceEntities)
	{
		var entity = universeWorldPlaceEntities.entity;

		var collidable = entity.propertyByName(Collidable2.name);
		var collider = collidable.collider;
		var transformTranslate = new Transform_Translate
		(
			entity.locatable().loc.pos.clone()
		);
		collider.overwriteWith
		(
			collidable.colliderAtRest
		).transform
		(
			transformTranslate
		);
		return collider;
	}
}
