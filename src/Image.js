
function Image(name, filePath, sizeInPixels, systemImage)
{
	this.name = name;
	this.filePath = filePath;
	this.sizeInPixels = sizeInPixels;
	this.systemImage = systemImage;

	this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
}
{
	// static variables
	Image.DrawPos = new Coords();
	
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

	Image.prototype.cloneShallow = function()
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
	
	Image.prototype.cloneDeep = function()
	{
		// todo
		return this.cloneShallow();
	}
	
	Image.prototype.drawForEntityAtOffset = function(entity, offset)
	{
		var drawPos = Image.DrawPos;
		var loc = entity.body.loc;
		var camera = loc.venue.camera;
		
		drawPos.overwriteWith
		(
			loc.pos
		).subtract
		(
			camera.body.loc.pos
		).add
		(
			camera.camera.viewSizeInPixelsHalf
		);
		
		Globals.Instance.display.drawImageAtPos
		(
			this, 
			drawPos
		); 
	}	
	
	Image.prototype.toColor = function(color)
	{
		return new ImageHelper().imageToColor(this, color);
	}

	Image.prototype.update = function()
	{
		// do nothing
	}
}
