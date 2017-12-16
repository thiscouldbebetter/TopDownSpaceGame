
function Activity(actor, defnName, target)
{
	this.actor = actor;
	this.defnName = defnName;
	this.target = target;
}

{
	// instance methods

	Activity.prototype.defn = function(universe)
	{
		return universe.world.activityDefns[this.defnName];
	}

	Activity.prototype.initialize = function(universe)
	{
		this.vars = new Activity_Variables();
		this.defn(universe).initialize(this);
	}

	Activity.prototype.perform = function(universe)
	{
		this.defn(universe).perform(universe, this);
	}

	// inner classes
	function Activity_Variables()
	{}
}
