
function Image(name, filePath, sizeInPixels, systemImage)
{
	this.name = name;
	this.filePath = filePath;
	this.sizeInPixels = sizeInPixels;
	this.systemImage = systemImage;

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
}

{
	// static methods

	Image.fromFilePath = function(filePath)
	{
		var systemImage = document.createElement("img");
		systemImage.src = filePath;

		var returnValue = new Image
		(
			filePath, 
			filePath,
			null, // todo - sizeInPixels
			systemImage
		);

		return returnValue;
	}

	Image.fromSystemImage = function(name, systemImage)
	{
		var sizeInPixels = new Coords
		(
			systemImage.width, systemImage.height
		);

		var returnValue = new Image
		(
			name, 
			systemImage.src,
			sizeInPixels,
			systemImage
		);

		return returnValue;
	}

	// instance methods

	// drawable

	Image.prototype.clone = function()
	{
		var returnValue = new Image
		(
			this.name,
			this.filePath,
			this.sizeInPixels,
			this.systemImage
		);

		return returnValue;
	}

	Image.prototype.drawAtPos = function(pos)
	{
		Globals.Instance.display.drawImageAtPos(this, pos); 
	}

	Image.prototype.update = function()
	{
		// do nothing
	}
}
