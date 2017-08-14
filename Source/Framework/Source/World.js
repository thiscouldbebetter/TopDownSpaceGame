// This class, as implemented, is only a demonstration. 
// Its code is expected to be modified heavily in actual applications,
// including the constructor, the draw() and update() methods,
// and the World.new() method.

function World(name, size, cursorPos)
{
	this.name = name;
	this.size = size;
	
	this.cursorLoc = new Location(cursorPos);
	this.goalLoc = new Location(new Coords().randomize().multiply(this.size));
	this.enemyLoc = new Location(this.size.clone().subtract(cursorPos));
	
	var entityDimension = 10;
	var cursorSize = new Coords(1, 1).multiplyScalar(entityDimension);
	this.visualForCursor = new VisualRectangle("Gray", cursorSize);
	this.visualForGoal = new VisualCircle("Green", entityDimension);
	this.visualForEnemy = new VisualPolygon
	(
		"Red", 
		// vertices
		[
			new Coords(0, -entityDimension),
			new Coords(entityDimension, entityDimension),
			new Coords(-entityDimension, entityDimension),
		]
	);
		
	// helper variables
	this.displacement = new Coords();
}

{
	// static methods

	World.new = function()
	{
		var now = DateTime.now();
		var nowAsString = now.toStringTimestamp();

		var returnValue = new World
		(
			"World-" + nowAsString, 
			Globals.Instance.display.sizeInPixels.clone(),
			new Coords(10, 10)
		);
		return returnValue;
	}

	// instance methods
	
	World.prototype.dateCreated = function () 
	{ 
		if (this._dateCreated == null)
		{
			this._dateCreated = DateTime.now();	
		}
		return this._dateCreated; 
	}

	World.prototype.dateSaved = function () 
	{ 
		if (this._dateSaved == null)
		{
			this._dateSaved = this._dateCreated;
		}
		return this._dateSaved; 
	}

	World.prototype.draw = function()
	{
		var display = Globals.Instance.display;

		display.clear();
		
		this.visualForGoal.drawToDisplayForDrawableAndLoc(display, null, this.goalLoc);
		this.visualForCursor.drawToDisplayForDrawableAndLoc(display, null, this.cursorLoc);
		this.visualForEnemy.drawToDisplayForDrawableAndLoc(display, null, this.enemyLoc);
	}

	World.prototype.updateForTimerTick = function()
	{
		this.updateForTimerTick_Input();
		this.updateForTimerTick_Agents();
		this.updateForTimerTick_WinOrLose();
	}
	
	World.prototype.updateForTimerTick_Input = function()
	{
		var inputHelper = Globals.Instance.inputHelper;
		if (inputHelper.isMouseClicked == true)
		{
			inputHelper.isMouseClicked = false;
			var mouseClickPos = inputHelper.mouseClickPos;
			this.cursorLoc.pos.overwriteWith(mouseClickPos);
			Globals.Instance.soundHelper.soundWithNamePlayAsEffect("Sound");
		}

		var inputsActive = inputHelper.inputsActive;
		for (var i = 0; i < inputsActive.length; i++)
		{
			var inputActive = inputsActive[i];
			if (inputActive == "Escape")
			{
				var universe = Globals.Instance.universe;
				var venueNext = new VenueControls
				(
					new ControlBuilder().configure
					(
						Globals.Instance.display.sizeInPixels
					)
				);
				venueNext = new VenueFader(venueNext);
				universe.venueNext = venueNext;
			}
			else if 
			(
				inputActive.startsWith("Arrow") == true
				|| inputActive.startsWith("Gamepad") == true
			)
			{
				var directionToMove;
				
				if (inputActive.endsWith("Down") == true)
				{
					directionToMove = new Coords(0, 1);
				}
				else if (inputActive.endsWith("Left") == true)
				{
					directionToMove = new Coords(-1, 0);
				}
				else if (inputActive.endsWith("Right") == true)
				{
					directionToMove = new Coords(1, 0);
				}
				else if (inputActive.endsWith("Up") == true)
				{
					directionToMove = new Coords(0, -1);
				}
				else
				{
					directionToMove = new Coords(0, 0);
				}
				
				this.cursorLoc.pos.add(directionToMove).trimToRangeMax(this.size);
			}
		}
	}
	
	World.prototype.updateForTimerTick_Agents = function()
	{
		var directionFromEnemyToCursor = this.displacement.overwriteWith
		(
			this.cursorLoc.pos
		).subtract
		(
			this.enemyLoc.pos
		).normalize();
		
		this.enemyLoc.pos.add(directionFromEnemyToCursor);
	}
	
	World.prototype.updateForTimerTick_WinOrLose = function()
	{
		var messageToDisplay = null;
	
		var distanceOfCursorFromEnemy = this.displacement.overwriteWith
		(
			this.cursorLoc.pos
		).subtract
		(
			this.enemyLoc.pos
		).magnitude();
	
		if (distanceOfCursorFromEnemy < this.visualForCursor.size.x)
		{
			messageToDisplay = "You lose!";
		}
		else 
		{
			var distanceOfCursorFromGoal = this.displacement.overwriteWith
			(
				this.cursorLoc.pos
			).subtract
			(
				this.goalLoc.pos
			).magnitude();

			if (distanceOfCursorFromGoal < this.visualForGoal.radius)
			{
				messageToDisplay = "You win!"
			}
		}
			
		if (messageToDisplay != null)
		{
			var worldNext = World.new();
			var venueNext = new VenueMessage
			(
				messageToDisplay,
				new VenueWorld(worldNext)
			);
			venueNext = new VenueFader(venueNext);
			
			var universe = Globals.Instance.universe;
			universe.venueNext = venueNext;
		}
	}
}
