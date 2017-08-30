
function VisualDirectional(visualForNoDirection, visualsForDirections)
{
	this.visualForNoDirection = visualForNoDirection;
	this.visualsForDirections = visualsForDirections;
	this.numberOfDirections = this.visualsForDirections.length;
}

{
	VisualDirectional.prototype.drawToDisplayForDrawableAndLoc = function(display, drawable, loc)
	{
		var headingInTurns = loc.orientation.headingInTurns();
		var visualForHeading;

		if (headingInTurns == null)
		{
			visualForHeading = this.visualForNoDirection;
		}
		else
		{
			var direction = Math.round(headingInTurns * this.numberOfDirections - .5);
			visualForHeading = this.visualsForDirections[direction];
		}

		visualForHeading.drawToDisplayForDrawableAndLoc(display, drawable, loc);
	}
}
