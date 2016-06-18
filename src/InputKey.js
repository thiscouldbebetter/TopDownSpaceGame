
function InputKey(name, systemKeyCode)
{
	this.name = name;
	this.systemKeyCode = systemKeyCode;
}

{
	InputKey.Instances = new InputKey_Instances();

	function InputKey_Instances()
	{
		this.A = new InputKey("A", "65");
		this.D = new InputKey("D", "68");
		this.F = new InputKey("F", "70");
		this.S = new InputKey("S", "83");
		this.W = new InputKey("W", "87");

		this._All = 
		[
			this.A, 
			this.D, 
			this.F, 
			this.W,
		];

		this.systemKeyCodeToKeyLookup = [];
		for (var i = 0; i < this._All.length; i++)
		{
			var key = this._All[i];
			this.systemKeyCodeToKeyLookup[key.systemKeyCode] = key;
		}
	}
}
