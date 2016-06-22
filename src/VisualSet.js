
function VisualSet(visuals)
{
	this.visuals = visuals;
}

{
	VisualSet.prototype.cloneShallow = function()
	{
		return new VisualSet(this.visuals);
	}
	
	VisualSet.prototype.drawForEntityAtOffset = function(entity, offset)
	{
		for (var i = 0; i < this.visuals.length; i++)
		{
			var visual = this.visuals[i];
			visual.drawForEntityAtOffset(entity, offset);
		}
	}

	VisualSet.prototype.update = function(entity, venue)
	{
		for (var i = 0; i < this.visuals.length; i++)
		{
			var visual = this.visuals[i];
			visual.update();
		}
	}
}
