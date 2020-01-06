
function Drawable(visual)
{
	this.visual = visual;

	this._posToSave = new Coords();
}

{
	Drawable.prototype.initialize = function(universe, world, venue, entity)
	{
		// Do nothing.
	}

	Drawable.prototype.update = function(universe, world, venue, entity)
	{
		var display = universe.display;
		var drawable = entity.Drawable;
		var visual = drawable.visual;
		visual.draw
		(
			universe, world, display, null, entity
		);
	}
}
