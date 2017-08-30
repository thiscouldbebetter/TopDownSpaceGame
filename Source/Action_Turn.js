
function Action_Turn(directionToTurn)
{
	this.name = "Turn" + (directionToTurn == 1 ? "Right" : "Left");
	this.directionToTurn = directionToTurn;
}

{
	Action_Turn.prototype.perform = function(actor)
	{
		var actorLoc = actor.body.loc;
		var actorOrientation = actorLoc.orientation;

		var turnRate = .25;

		actorOrientation.forwardSet
		(
			actorOrientation.right.clone().multiplyScalar
			(
				turnRate
				* this.directionToTurn
			).add
			(
				actorOrientation.forward
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
