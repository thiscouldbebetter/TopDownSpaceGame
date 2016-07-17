
function Constraint(defnName, variables)
{
	this.defnName = defnName;
	this.variables = variables;
}
{
	Constraint.prototype.constrainEntity = function(entityToConstrain)
	{
		this.defn().applyConstraintToEntity(this, entityToConstrain);
	}
	
	Constraint.prototype.defn = function()
	{
		return Globals.Instance.universe.constraintDefns[this.defnName];
	}
}
