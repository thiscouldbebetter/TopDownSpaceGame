
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
			var visual = entity.defn().drawable.visual;
			entity.drawable = new Drawable(visual);//.cloneShallow());
			//entity.drawable.visual.pos = entity.body.loc.pos;
		}
	}

	DrawableDefn.prototype.updateEntityForVenue = function(entity, venue)
	{
		var display = Globals.Instance.display;
		var visual = entity.drawable.visual;
		var camera = venue.camera;
		var drawLoc = display.drawLoc.overwriteWith
		(
			entity.body.loc
		);
		var drawPos = drawLoc.pos;
 		drawPos.subtract
 		(
			camera.body.loc.pos
		).add
		(
			camera.camera.viewSizeHalf
		);
		visual.drawToDisplayForDrawableAndLoc
		(
			display, entity, drawLoc
		);
	}
}
