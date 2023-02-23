# AngularRpg
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

# remember
- IPO Model 👆
	- Input - angular component
	- Process - AngularRPG class
	- Output - Angular component

# step #1 ✔
	Darstellung eines 2D Dungeon. Es ist klar erkennbar welche Felder zum Spielfeld gehören. 
	Es gibt Spieler, Monster und einen Ausgang.
	Der Spieler kann mit den Pfeiltasten bewegt werden.
	Erreicht der Spieler den Ausgang, ist das Level beendet und das nächste startet.

# to do for step #1 ✔
- grid into angular rpg ✅
- replace strings with enums ✅
- remove try catch ✅
- more game logic
	- spawn enemies ✅, make them spawn at random positions ✅
	- basic defeating an enemy, if player walks into tile occupied by enemy, remove enemy ✅
- implement exit ✅
- implement new stage generation ✅


# step #2
	Monster sollen sich (zufällig) bewegen.
	Kommen Monster und spieler auf das selbe Feld (oder entsprechend), wird ein Kampf gestartet.
	Der Kampf wird in einem extra View dargestellt.
	Jede Runde fügen sich der Spieler und das Monster greifen sich gegenseitg an und fügen sich ggf Schaden zu.
	Verliert das Monster seine Lebenspunkte ist der Kampf beendet und der view wechselt zurück auf die Spielfeld Darstellung.
	Verliert der Spieler seine Lebenspunkte ist das Spiel beendet.

# to do for step #2
- make enemies move ✅
- adjust moving that it does not look this dumb, maybe make enemies walk to a target position?
or pick a direction and walk it until obstructed
- combat view

# misc
- make player also spawn randomly ✅
- fix enemy stacking ✅
- fix that enemies can walk onto the door ✅
- add tree clusters as obstruction
