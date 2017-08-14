
function AnimationDefn(name, animationDefnNameNext, frames)
{
	this.name = name;
	this.animationDefnNameNext = animationDefnNameNext;
	this.frames = frames;
}

{
	// static methods
	
	AnimationDefn.buildManyFromImageSets = function(imageSetsForFrames)
	{
		var returnValues = [];

		var numberOfImageSets = imageSetsForFrames.length;

		for (var i = 0; i < numberOfImageSets; i++)
		{
			var imageSet = imageSetsForFrames[i];

			var animationDefn = new AnimationDefn
			(
				"" + i,
				"" + i,
				AnimationFrame.buildManyFromImages(imageSet)
			);

			returnValues.push(animationDefn);
		}

		return returnValues;
	}
	
	// instance methods
	
	AnimationDefn.prototype.clone = function()
	{
		var returnValue = new AnimationDefn
		(
			this.name,
			this.animationDefnNameNext,
			Cloneable.cloneMany(this.frames)
		);
		
		return returnValue;
	}
	
	// colorable
	
	AnimationDefn.prototype.toColor = function(color)
	{
		Colorable.colorMany(this.frames, color);
		return this;
	}
}
