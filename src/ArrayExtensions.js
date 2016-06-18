
// extensions

function ArrayExtensions()
{
	// extension class
}

{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var elementKey = element[keyName];
			this[elementKey] = element;
		}

		return this;
	}

	Array.prototype.cloneShallow = function()
	{
		return this.slice();
	}

	Array.prototype.contains = function(element)
	{
		var returnValue = (this.indexOf(element) >= 0);
		return returnValue;
	}

	Array.prototype.insertElementAt = function(element, index)
	{
		return this.splice(index, 0, element);
	}

	Array.prototype.remove = function(element)
	{
		return this.removeAt(this.indexOf(element));
	}

	Array.prototype.removeAt = function(index)
	{
		return this.splice(index, 1);
	}
}
