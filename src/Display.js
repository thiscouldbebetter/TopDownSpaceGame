
function Display(sizeInPixels)
{
	this.sizeInPixels = sizeInPixels;

	// temporary variables
	this.drawPos = new Coords();
}

{
	Display.prototype.drawImageAtPos = function(imageToDraw, pos)
	{
		this.drawPos.overwriteWith
		(
			pos
		).subtract
		(
			imageToDraw.sizeInPixelsHalf
		);

		this.graphics.drawImage
		(
			imageToDraw.systemImage, 
			this.drawPos.x, this.drawPos.y
		);
	}

	Display.prototype.drawRectangle = function(pos, size, systemColorFill, systemColorStroke)
	{
		this.graphics.fillStyle = systemColorFill;
		this.graphics.fillRect(pos.x, pos.y, size.x, size.y);

		this.graphics.strokeStyle = systemColorStroke;
		this.graphics.strokeRect(pos.x, pos.y, size.x, size.y);

	}

	Display.prototype.drawText = function(text, pos, systemColor)
	{
		this.graphics.fillStyle = systemColor;
		this.graphics.strokeStyle = systemColor;
		this.graphics.fillText(text, pos.x, pos.y);
		this.graphics.strokeText(text, pos.x, pos.y);
	}

	Display.prototype.drawVenue = function(venue)
	{
		this.drawRectangle
		(
			Coords.Instances.Zeroes, 
			venue.sizeInPixels, 
			"Black", 
			"Gray"
		);
	}

	Display.prototype.initialize = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		document.body.appendChild(canvas);
	}
}
