
function DrawableDefn(visual)
{
	this.visual = visual;

	this._posToSave = new Coords();
}

{
	DrawableDefn.prototype.initialize = function(universe, world, venue, entity)
	{
		if (entity.drawable == null)
		{
			var visual = entity.defn(world).drawable.visual;
			entity.drawable = new Drawable(visual);
			entity.loc = entity.body.loc;
		}
	}

	DrawableDefn.prototype.update = function(universe, world, venue, entity)
	{
		var display = universe.display;
		var drawable = entity.drawable;
		var visual = drawable.visual;
		visual.draw
		(
			universe, world, display, entity
		);
	}
}
