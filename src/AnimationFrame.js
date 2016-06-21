
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
		var returnValue = new AnimationFrame
		(
			this.image.cloneShallow(),
			this.ticksToHold
		);
		
		return returnValue;
	}
	
	// colorable
	
	AnimationFrame.prototype.toColor = function(color)
	{
		this.image.toColor(color);
		return this;
	}
}
