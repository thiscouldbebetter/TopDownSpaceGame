
function Bounds(min, max)
{
	this.min = min;
	this.max = max;

	this.minAndMax = [ this.min, this.max ];
}

{
	Bounds.prototype.overlapWith = function(other)
	{
		var returnValue = 
		(
			(
				(
					this.min.x > other.min.x
					&& this.min.x < other.max.x
				)
				|| 
				(
					this.max.x > other.min.x
					&& this.max.x < other.max.x
				)
				||
				(
					other.min.x > this.min.x
					&& other.min.x < this.max.x
				)
				||
				(
					other.max.x > this.min.x
					&& other.max.x < this.max.x
				)
			)
			&&
			(
				(
					this.min.y > other.min.y
					&& this.min.y < other.max.y
				)
				|| 
				(
					this.max.y > other.min.y
					&& this.max.y < other.max.y
				)
				||
				(
					other.min.y > this.min.y
					&& other.min.y < this.max.y
				)
				||
				(
					other.max.y > this.min.y
					&& other.max.y < this.max.y
				)
			)
		);	

		return returnValue;
	}
}
