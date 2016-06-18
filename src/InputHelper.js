
function InputHelper()
{
	this.keyCodesPressed = [];
}

{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		var keyCode = "_" + event.keyCode;
		if (this.keyCodesPressed[keyCode] == null)
		{
			this.keyCodesPressed[keyCode] = keyCode;
			this.keyCodesPressed.push(keyCode);
		}
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		var keyCode = "_" + event.keyCode;
		delete this.keyCodesPressed[keyCode];
		this.keyCodesPressed.remove(keyCode);
	}
}
