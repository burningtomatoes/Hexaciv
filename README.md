Hexaciv
=======
*Civilize the world and fight your way to domination!*

About this game
---
Play against other world leaders in this hex-based strategy game.

Disclaimer: *This game is very unfinished, I ran out of time. It is basically unplayable. Sorry about that.*

**How to play**:

- Settle your city
- Move units to hexes to capture them
- The more hexes your civ owns, the faster your city grows
- The faster the city grows, the more units you have
- Defend your city, and capture other cities

About the challenge
---
I built this game as part of my "build one game a week" challenge: one game per week, every week, even if it's crap (release often, fail often, and learn). I'm hoping to get better at game development during this process by pushing myself to deliver something every week and learning from previous weeks. Hopefully by releasing the source code to each game, my journey can be useful to you too.

Visit <http://www.burningtomato.com> for more info on my challenge. You can also follow me on Twitter: <https://twitter.com/burningtomato>.

Building the source code
---
You will need NodeJS and the Grunt CLI to build the source code.

1. Clone this repository using `git clone` to a new directory
2. Install the NodeJS dependencies by issuing the `npm install` command in a terminal
3. Compile the source code by issuing the `grunt` command in a terminal

Some side notes:

- Make sure you serve the files from a http:// address rather than a files:// address. Due to some security policies things may not work correctly otherwise.
- If you use an IDE, be sure to set up a file watcher so Grunt is ran automatically when you make changes. It'll make your life a lot easier.
- Your browser needs to have support for HTML5 and Canvas, obviously.

To compile the `game.scss` file, you will need to use SASS. For development convenience, I recommend setting this up as a file watcher task.

License
---
This game, and all my other games developed as part of this challenge, are available under the MIT license. See the included LICENSE file for details.

**Important:** For specific license information regarding third-party assets used in this game, please see the included CREDITS file.