
function DrawableDefn(visual)
{
	this.visual = visual;
}

{
	DrawableDefn.prototype.propertyName = function() { return "Drawable"; }

	DrawableDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		if (entity.drawable == null)
		{
			entity.drawable = new Drawable(entity.defn().drawable.visual.cloneShallow());
			entity.drawable.visual.pos = entity.body.loc.pos;
		}
	}

	DrawableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var visual = entity.drawable.visual;
		visual.update();
		visual.drawForEntityAtOffset(entity, new Coords(0, 0));
	}
}
