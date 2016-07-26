
function InputHelper()
{
	this.keyCodesPressed = [];
	this.isShiftKeyPressed = false;
	this.isMouseClicked = false;
	this.mouseClickPos = new Coords(0, 0);
	this.mouseMovePos = new Coords(0, 0);
	this.mouseMovePosPrev = new Coords(0, 0);

	this.tempPos = new Coords(0, 0);
}

{
	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		event.preventDefault();
		this.isShiftKeyPressed = event.shiftKey;
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
		if (this.keyCodesPressed[keyCode] != null)
		{
			this.keyCodesPressed.remove(keyCode);
			delete this.keyCodesPressed[keyCode];
		}
	}

	InputHelper.prototype.handleEventMouseDown = function(event)
	{
		this.isMouseClicked = true;
		this.mouseClickPos.overwriteWithXY
		(
			event.layerX,
			event.layerY
		)
	}

	InputHelper.prototype.handleEventMouseMove = function(event)
	{
		this.mouseMovePosPrev.overwriteWith
		(
			this.mouseMovePos
		);
	
		this.mouseMovePos.overwriteWithXY
		(
			event.layerX,
			event.layerY
		);
	}

	InputHelper.prototype.handleEventMouseUp = function(event)
	{
		this.isMouseClicked = false;
	}	

	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
		//Globals.Instance.divMain.onmousedown = this.handleEventMouseDown.bind(this);
		//Globals.Instance.divMain.onmousemove = this.handleEventMouseMove.bind(this);
		//Globals.Instance.divMain.onmouseup = this.handleEventMouseUp.bind(this);
		
		document.body.onmousedown = this.handleEventMouseDown.bind(this);
		document.body.onmousemove = this.handleEventMouseMove.bind(this);
		document.body.onmouseup = this.handleEventMouseUp.bind(this);
	}
}
