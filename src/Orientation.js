
function Orientation(forward)
{
	this.forward = forward.clone().normalize();
	this.right = new Coords
	(
		0 - this.forward.y, 
		this.forward.x
	);
}
