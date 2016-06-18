
function InputBindingSet(bindings)
{
	this.bindings = bindings;
	for (var i = 0; i < this.bindings.length; i++)
	{
		var binding = this.bindings[i];
		var keyCode = "_" + binding.key.systemKeyCode;
		this.bindings[keyCode] = binding;
	}
}
