// application

function Simulation()
{}
{
	Simulation.prototype.main = function()
	{
		var displaySize = new Coords(300, 300);

		var universe = new Demo().universeGrid(new Coords(10, 10));

		Globals.Instance.initialize
		(
			"TopDownSpaceGame",
			10, // timerTicksPerSecond
			new Display(displaySize),
			universe,
			// sounds
			[
				new Sound("Sound", "Sound.wav", false),
				new Sound("Music", "Music.mp3", true),
			],
			// videos
			[
				new Video("Movie", "Movie.webm"),
			]
		);
	}
}
