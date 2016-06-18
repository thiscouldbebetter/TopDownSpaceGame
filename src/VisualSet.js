
function VisualSet(name, visuals)
{
	this.name = name;
	this.visuals = visuals;
}

{
	VisualSet.prototype.clone = function()
	{
		return new VisualSet(this.name, this.visuals);
	}

	VisualSet.prototype.drawAtPos = function(pos)
	{
		for (var i = 0; i < this.visuals.length; i++)
		{
			var visual = this.visuals[i];
			visual.drawAtPos(pos);
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
