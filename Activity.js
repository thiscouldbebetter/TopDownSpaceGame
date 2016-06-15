
function Activity(actor, defnName, target)
{
	this.actor = actor;
	this.defnName = defnName;
	this.target = target;
}

{
	// instance methods

	Activity.prototype.defn = function()
	{
		return Globals.Instance.universe.activityDefns[this.defnName];
	}

	Activity.prototype.initialize = function()
	{
		this.vars = new Activity_Variables();
		this.defn().initialize(this);
	}

	Activity.prototype.perform = function()
	{
		this.defn().perform(this);
	}

	// inner classes
	function Activity_Variables()
	{}
}
