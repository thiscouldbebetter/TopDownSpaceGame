
function AnimationDefnSet(name, animationDefns)
{
	this.name = name;
	this.animationDefns = animationDefns;

	this.animationDefns.addLookups("name");
}

{
	// static methods

	AnimationDefnSet.fromImage = function(image)
	{
		var imageAsImageSets = 
		[
			[
				image
			]
		];

		var returnValue = new AnimationDefnSet
		(
			image.id, 
			AnimationDefn.buildManyFromImageSets
			(
				imageAsImageSets
			)
		);

		return returnValue;
	}

	AnimationDefnSet.fromImages = function(animationDefnSetName, images, ticksPerFrame)
	{
		if (ticksPerFrame == null) { ticksPerFrame = 1; }
		
		var returnValue = new AnimationDefnSet
		(
			animationDefnSetName,
			[
				new AnimationDefn
				(
					"",
					"",
					AnimationFrame.buildManyFromImages(images, ticksPerFrame)
				),
			]
		);

		return returnValue;
	}

	AnimationDefnSet.fromImageForHeadings = function(image, numberOfHeadings)
	{
		var imageAsImageSet = [];
		imageAsImageSet.push(image);
		var imageAsImageSets = [];

		for (var i = 0; i < numberOfHeadings; i++)
		{
			imageAsImageSets.push(imageAsImageSet);
		}

		var returnValue = new AnimationDefnSet
		(
			image.id, 
			AnimationDefn.buildManyFromImageSets
			(
				imageAsImageSets
			)
		);

		return returnValue;
	}

	AnimationDefnSet.fromImagesForHeadings = function(name, imagesForHeadings)
	{
		var animationDefnsForHeadings = [];

		var numberOfHeadings = imagesForHeadings.length;

		for (var i = 0; i < numberOfHeadings; i++)
		{
			var imageForHeading = imagesForHeadings[i];
			var animationFrameForHeading = new AnimationFrame(imageForHeading);
			var animationDefnForHeading = new AnimationDefn
			(
				"" + i, "" + i, [ animationFrameForHeading ]
			);
			animationDefnsForHeadings.push(animationDefnForHeading); 
		}

		var returnValue = new AnimationDefnSet
		(
			name,
			animationDefnsForHeadings
		);

		return returnValue;
	}

	// instance methods
	
	AnimationDefnSet.prototype.clone = function()
	{
		var returnValue = new AnimationDefnSet
		(
			this.name,
			Cloneable.cloneMany(this.animationDefns)
		);
		
		return returnValue;	
	}

	AnimationDefnSet.prototype.toAnimationRun = function()
	{
		return new AnimationRun(this);
	}
	
	// colorable
	
	AnimationDefnSet.prototype.toColor = function(color)
	{
		Colorable.colorMany(this.animationDefns, color);
		return this;
	}
}
