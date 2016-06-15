
function VisualImageRecolored(image, color)
{
	this.image = image;
	this.color = color;

	var imageHelper = new ImageHelper();

	this.imageRecolored = imageHelper.imageToGray
	(
		this.image.clone()
	);

	this.imageRecolored = imageHelper.imageToColor
	(
		this.imageRecolored, this.color
	);
}

{
	VisualImageRecolored.prototype.drawAtPos = function(pos)
	{
		this.imageRecolored.drawAtPos(pos);
	}

	VisualImageRecolored.prototype.update = function()
	{
		// do nothing
	}
	
}
