
function AnimationDefnSet(name, animationDefns)
{
	this.name = name;
	this.animationDefns = animationDefns;

	for (var i = 0; i < this.animationDefns.length; i++)
	{
		var animationDefn = this.animationDefns[i];
		this.animationDefns[animationDefn.name] = animationDefn;
	}
}

{
	// static methods

	AnimationDefnSet.buildFromImage = function(image)
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

	AnimationDefnSet.buildFromImages = function(animationDefnSetName, images)
	{
		var returnValue = new AnimationDefnSet
		(
			animationDefnSetName,
			[
				new AnimationDefn
				(
					"",
					"",
					AnimationFrame.buildManyFromImages(images)
				),
			]
		);

		return returnValue;
	}

	AnimationDefnSet.buildFromImageForHeadings = function(image, numberOfHeadings)
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

	AnimationDefnSet.prototype.toAnimationRun = function()
	{
		return new AnimationRun(this);
	}
}
