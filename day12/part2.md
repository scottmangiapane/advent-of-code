\--- Part Two ---
-----------------

Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

Almost all of the actions indicate how to move a _waypoint_ which is relative to the ship's position:

*   Action _`N`_ means to move the waypoint _north_ by the given value.
*   Action _`S`_ means to move the waypoint _south_ by the given value.
*   Action _`E`_ means to move the waypoint _east_ by the given value.
*   Action _`W`_ means to move the waypoint _west_ by the given value.
*   Action _`L`_ means to rotate the waypoint around the ship _left_ (_counter-clockwise_) the given number of degrees.
*   Action _`R`_ means to rotate the waypoint around the ship _right_ (_clockwise_) the given number of degrees.
*   Action _`F`_ means to move _forward_ to the waypoint a number of times equal to the given value.

The waypoint starts _10 units east and 1 unit north_ relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

*   `F10` moves the ship to the waypoint 10 times (a total of _100 units east and 10 units north_), leaving the ship at _east 100, north 10_. The waypoint stays 10 units east and 1 unit north of the ship.
*   `N3` moves the waypoint 3 units north to _10 units east and 4 units north of the ship_. The ship remains at _east 100, north 10_.
*   `F7` moves the ship to the waypoint 7 times (a total of _70 units east and 28 units north_), leaving the ship at _east 170, north 38_. The waypoint stays 10 units east and 4 units north of the ship.
*   `R90` rotates the waypoint around the ship clockwise 90 degrees, moving it to _4 units east and 10 units south of the ship_. The ship remains at _east 170, north 38_.
*   `F11` moves the ship to the waypoint 11 times (a total of _44 units east and 110 units south_), leaving the ship at _east 214, south 72_. The waypoint stays 4 units east and 10 units south of the ship.

After these operations, the ship's Manhattan distance from its starting position is `214 + 72` = _`286`_.

Figure out where the navigation instructions actually lead. _What is the Manhattan distance between that location and the ship's starting position?_