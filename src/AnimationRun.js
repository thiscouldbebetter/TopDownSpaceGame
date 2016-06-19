
function AnimationRun(animationDefnSet)
{
	this.animationDefnSet = animationDefnSet;

	this.animationDefnNameCurrent = this.animationDefnSet.animationDefns[0].name;
	this.animationDefnNameNext = null;
	this.frameIndexCurrent = 0;
}

{
	AnimationRun.prototype.animationDefnCurrent = function()
	{
		return this.animationDefnSet.animationDefns[this.animationDefnNameCurrent];
	}

	AnimationRun.prototype.animationDefnNameCurrent_Set = function(value)
	{
		if (this.animationDefnNameCurrent != value)
		{
			this.animationDefnNameCurrent = value;
			this.frameIndexCurrent = 0;
		}
	}

	AnimationRun.prototype.frameCurrent = function()
	{
		return this.animationDefnCurrent().frames[this.frameIndexCurrent];
	}

	// cloneable

	AnimationRun.prototype.cloneShallow = function()
	{
		var returnValue = new AnimationRun(this.animationDefnSet);
		returnValue.animationDefnNameCurrent = this.animationDefnNameCurrent;
		returnValue.animationDefnNameNext = this.animationDefnNameNext;
		returnValue.frameIndexCurrent = this.frameIndexCurrent;
		return returnValue;
	}
	
	AnimationRun.prototype.cloneDeep = function()
	{
		var returnValue = new AnimationRun(this.animationDefnSet.clone());
		returnValue.animationDefnNameCurrent = this.animationDefnNameCurrent;
		returnValue.animationDefnNameNext = this.animationDefnNameNext;
		returnValue.frameIndexCurrent = this.frameIndexCurrent;
		return returnValue;
	}

	// visual

	AnimationRun.prototype.drawAtPos = function(pos)
	{
		var frameCurrent = this.frameCurrent();
		frameCurrent.image.drawAtPos(pos);//this.pos);
	}

	AnimationRun.prototype.update = function()
	{
		if (this.animationDefnNameNext != null)
		{
			this.animationDefnNameCurrent = this.animationDefnNameNext;
			this.frameIndexCurrent = 0;
			this.animationDefnNameNext = null;
		}
		else
		{
			this.frameIndexCurrent++;
		}

		var animationDefnCurrent = this.animationDefnCurrent();
		if (this.frameIndexCurrent >= animationDefnCurrent.frames.length)
		{
			this.animationDefnNameCurrent_Set
			(
				animationDefnCurrent.animationDefnNameNext
			);
			this.frameIndexCurrent = 0;
		}
	}

	// colorable

	AnimationRun.prototype.toColor = function(color)
	{
		this.animationDefnSet.toColor(color);
		return this;
	}
}
