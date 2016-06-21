
function VisualSet(visuals)
{
	this.visuals = visuals;
}

{
	VisualSet.prototype.cloneShallow = function()
	{
		return new VisualSet(this.visuals);
	}

	VisualSet.prototype.drawAtPos = function(pos)
	{
		for (var i = 0; i < this.visuals.length; i++)
		{
			var visual = this.visuals[i];
			visual.drawAtPos(pos);
		}
	}
	
	VisualSet.prototype.drawForEntity = function(entity)
	{
		for (var i = 0; i < this.visuals.length; i++)
		{
			var visual = this.visuals[i];
			visual.drawForEntity(entity);
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
