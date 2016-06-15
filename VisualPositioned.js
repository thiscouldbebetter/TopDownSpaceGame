
function VisualPositioned(visual, pos)
{
	this.visual = visual;
	this.pos = pos;

	this.posAbsolute = new Coords();
}

{
	VisualPositioned.prototype.drawAtPos = function(pos)
	{
		this.visual.drawAtPos
		(
			this.posAbsolute.overwriteWith
			(
				this.pos
			).add
			(
				pos
			)
		);
	}

	VisualPositioned.prototype.update = function()
	{
		// do nothing
	}
}
