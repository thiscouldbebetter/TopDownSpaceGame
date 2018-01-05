
function AnimationFrame(image, ticksToHold)
{
	this.image = image;
	this.ticksToHold = ticksToHold;
}

{
	// static methods

	AnimationFrame.buildManyFromImages = function(imagesForFrames, ticksPerFrame)
	{
		if (ticksPerFrame == null) { ticksPerFrame = 1; }

		var returnValues = [];

		var numberOfImages = imagesForFrames.length;

		for (var i = 0; i < numberOfImages; i++)
		{
			var imageForFrame = imagesForFrames[i];
			var frame = new AnimationFrame(imageForFrame, ticksPerFrame);

			returnValues.push(frame);
		}

		return returnValues;
	}

	// instance methods

	AnimationFrame.prototype.clone = function()
	{
		// hack
		var imageCloned = new Image(this.image.name, this.image.sourcePath);

		var returnValue = new AnimationFrame
		(
			imageCloned,
			this.ticksToHold
		);

		return returnValue;
	}
}
