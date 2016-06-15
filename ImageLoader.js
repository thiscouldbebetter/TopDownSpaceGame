
function ImageLoader(imageDatasToLoad, contextForCallback, callbackForLoadingComplete)
{
	this.name = "ImageLoader";
	this.imageDatasToLoad = imageDatasToLoad;
	this.contextForCallback = contextForCallback;	
	this.callbackForLoadingComplete = callbackForLoadingComplete;
	this.numberOfImagesLoadedSoFar = 0;

	this.imageLookup = [];

	for (var i = 0; i < this.imageDatasToLoad.length; i++)
	{
		var imageData = this.imageDatasToLoad[i];

		var image = document.createElement("img");
		image.imageLoader = this;
		image.onload = this.imageLoaded;

		image.id = imageData.id;
		image.src = imageData.url;

		this.imageLookup[image.id] = Image.fromSystemImage(imageData.id, image);
	}
}

{
	ImageLoader.prototype.imageLoaded = function(event)
	{
		var imageLoader = event.target.imageLoader;
		imageLoader.numberOfImagesLoadedSoFar++;

		if (imageLoader.numberOfImagesLoadedSoFar >= imageLoader.imageDatasToLoad.length)
		{
			imageLoader.callbackForLoadingComplete.call
			(
				imageLoader.contextForCallback
			);
		}
	}
}
