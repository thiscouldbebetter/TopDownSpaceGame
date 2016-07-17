function Camera(viewSizeInPixels)
{
	this.viewSizeInPixels = viewSizeInPixels;
	
	this.viewSizeInPixelsHalf = this.viewSizeInPixels.clone().divideScalar(2);
}
{
	Camera.prototype.propertyName = function() { return "Camera"; }
}
