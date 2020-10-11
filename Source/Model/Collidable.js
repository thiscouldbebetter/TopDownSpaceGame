
class Collidable
{
	constructor(colliderAtRest, propertyNamesCollidedWith, collide)
	{
		this.colliderAtRest = colliderAtRest;
		this.propertyNamesCollidedWith = propertyNamesCollidedWith;
		this.collide = collide;

		this.collider = this.colliderAtRest.clone();
	}

	initialize(universe, world, venue, entity)
	{
		this.update_Collider(entity);
	}

	update(universe, world, venue, entity)
	{
		var collisionHelper = universe.collisionHelper;

		var colliderThis = this.update_Collider(entity);

		for (var i = 0; i < this.propertyNamesCollidedWith.length; i++)
		{
			var propertyName = this.propertyNamesCollidedWith[i];
			var entitiesToCollideWith = venue.entitiesByPropertyName[propertyName];

			for (var j = 0; j < entitiesToCollideWith.length; j++)
			{
				var entityOther = entitiesToCollideWith[j];
				if (entityOther != entity)
				{
					var colliderOther = this.update_Collider(entityOther);

					var doEntitiesCollide = collisionHelper.doCollidersCollide
					(
						colliderThis, colliderOther
					);

					if (doEntitiesCollide)
					{
						var entityCollidable = entity.collidable();
						entityCollidable.collide
						(
							universe, world, entity, entityOther
						);
						var entityOtherCollidable = entityOther.collidable();
						entityOtherCollidable.collide
						(
							universe, world, entityOther, entity
						);
					}
				}
			}
		}
	}

	update_Collider(entity)
	{
		var collidable = entity.collidable();
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
