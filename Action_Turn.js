
function Action_Turn(directionToTurn)
{
	this.name = "Turn" + directionToTurn;
	this.directionToTurn = directionToTurn;
}

{
	Action_Turn.prototype.perform = function(actor)
	{
		var actorLoc = actor.body.loc;
		var actorOrientation = actorLoc.orientation;

		var turnRate = .25;

		actorLoc.orientation = new Orientation
		(
			actorOrientation.forward.clone().add
			(
				actorOrientation.right.multiplyScalar
				(
					turnRate
					* this.directionToTurn
				)
			)
		);

		var actorHeading = Heading.fromCoords
		(
			actorLoc.orientation.forward, 
			Heading.NumberOfHeadings
		);

		actor.drawable.visual.animationDefnNameNext = "" + actorHeading;
	}
}
