
function AnimationFrame(image, ticksToHold)
{
	this.image = image;
	this.ticksToHold = ticksToHold;
}

{
	AnimationFrame.buildManyFromImages = function(imagesForFrames)
	{
		var returnValues = [];

		var numberOfImages = imagesForFrames.length;

		for (var i = 0; i < numberOfImages; i++)
		{
			var imageForFrame = imagesForFrames[i];
			var frame = new AnimationFrame(imageForFrame, 1);

			returnValues.push(frame);
		}

		return returnValues;
	}
}
