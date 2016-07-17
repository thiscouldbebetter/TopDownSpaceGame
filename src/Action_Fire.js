
function Action_Fire()
{
	// do nothing
}

{
	Action_Fire.prototype.perform = function(actor)
	{	
		var itemFuel = actor.itemContainer.items["Fuel"];
		var fuelConsumed = 10;
		if (itemFuel.quantity >= fuelConsumed)
		{
			itemFuel.quantity -= fuelConsumed;
			
			var venue = actor.body.loc.venue;
			var entityDefnProjectile = Globals.Instance.universe.entityDefns["Projectile"];

			var entityToSpawn = new Entity
			(
				"[projectile]", 
				entityDefnProjectile.name,
				[
					new Body(actor.body.loc.clone())
				]
			);

			entityToSpawn.body.loc.vel = actor.body.loc.orientation.forward.clone().normalize().multiplyScalar
			(
				entityDefnProjectile.mover.speedMax
			);

			venue.entitiesToSpawn.push(entityToSpawn);			
		}
	}	
}
