
function Entity(name, defnName, properties)
{
	this.name = name;
	this.defnName = defnName;
	this.properties = properties;

	if (this.properties != null)
	{
		for (var i = 0; i < this.properties.length; i++)
		{
			var property = this.properties[i];
			var propertyName = property.propertyName();
			this.properties[propertyName] = property;
			this[propertyName.toLowerCase()] = property;
		}
	}
}

{
	// methods

	// static methods

	Entity.fromDefn = function(name, defn, properties)
	{
		var returnValue = new Entity(name, null, properties);
		returnValue._defn = defn;
		return returnValue;
	}

	// instance methods

	Entity.prototype.activity = function(value) 
	{ 
		if (value != null)
		{
			this._activity = value;
			this._activity.initialize(); 
		} 

		return this._activity;
	}

	Entity.prototype.bounds = function()
	{
		if (this._bounds == null)
		{
			this._bounds = new Bounds(new Coords(), new Coords());
		}

		var pos = this.body.loc.pos;
		var sizeHalf = this.defn().body.sizeInPixelsHalf;

		this._bounds.min.overwriteWith(pos).subtract(sizeHalf);
		this._bounds.max.overwriteWith(pos).add(sizeHalf);

		return this._bounds;
	}

	Entity.prototype.defn = function()
	{
		var returnValue;

		if (this.defnName != null)
		{
			var world = Globals.Instance.universe.world;
			var entityDefns = world.entityDefns;
			returnValue = entityDefns[this.defnName];
		}
		else
		{
			return this._defn;
		}

		return returnValue;
	}
}
