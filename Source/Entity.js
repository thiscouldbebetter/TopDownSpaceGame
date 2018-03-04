
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
			var propertyName = Entity.propertyName(property);
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

	Entity.propertyName = function(property)
	{
		var propertyName = property.constructor.name;
		if (propertyName.endsWith("Defn") == true)
		{
			propertyName = propertyName.substr(0, propertyName.length - "Defn".length);
		}
		return propertyName;
	}

	// instance methods

	Entity.prototype.activity = function()
	{
		return this._activity;
	}

	Entity.prototype.bounds = function(world)
	{
		if (this._bounds == null)
		{
			this._bounds = new Bounds
			(
				this.body.loc.pos, this.defn(world).body.sizeInPixels
			);
		}

		return this._bounds;
	}

	Entity.prototype.defn = function(world)
	{
		var returnValue;

		if (this.defnName != null)
		{
			var entityDefns = world.defns.entityDefns;
			returnValue = entityDefns[this.defnName];
		}
		else
		{
			return this._defn;
		}

		return returnValue;
	}
}
