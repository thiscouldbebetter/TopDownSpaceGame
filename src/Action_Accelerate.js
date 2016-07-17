function Action_Accelerate()
{
	this.name = "Accelerate";
}
{
	Action_Accelerate.prototype.perform = function(actor)
	{		
		var fuelUsedByAcceleration = 1;
		var itemFuel = actor.itemContainer.items["Fuel"];
		
		if (itemFuel.quantity >= fuelUsedByAcceleration)
		{
			itemFuel.quantity -= fuelUsedByAcceleration;
			
			var actorLoc = actor.body.loc;
			var actorOrientation = actorLoc.orientation;

			actorLoc.accel.add
			(
				actorOrientation.forward
			);			
		}	
	}
}
