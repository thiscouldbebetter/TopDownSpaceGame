
function Action_Accelerate()
{
	this.name = "Accelerate";
}

{
	Action_Accelerate.prototype.perform = function(actor)
	{
		var actorLoc = actor.body.loc;
		var actorOrientation = actorLoc.orientation;

		actorLoc.accel.add
		(
			actorOrientation.forward
		)
	}
}
