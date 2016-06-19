
function VisualRecolored(visualOriginal, color)
{
	this.visualOriginal = visualOriginal;
	this.color = color;

	this.visualRecolored = this.visualOriginal.cloneDeep().toColor(this.color);
}

{
	VisualRecolored.prototype.drawAtPos = function(pos)
	{
		this.visualRecolored.drawAtPos(pos);
	}

	VisualRecolored.prototype.update = function()
	{
		this.visualRecolored.update();
	}
	
}
