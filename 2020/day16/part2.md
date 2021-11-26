\--- Part Two ---
-----------------

Now that you've identified which tickets contain invalid values, _discard those tickets entirely_. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if `seat` is the third field, it is the third field on every ticket, including _your ticket_.

For example, suppose you have the following notes:

    class: 0-1 or 4-19
    row: 0-5 or 8-19
    seat: 0-13 or 16-19
    
    your ticket:
    11,12,13
    
    nearby tickets:
    3,9,18
    15,1,5
    5,14,9
    

Based on the _nearby tickets_ in the above example, the first position must be `row`, the second position must be `class`, and the third position must be `seat`; you can conclude that in _your ticket_, `class` is `12`, `row` is `11`, and `seat` is `13`.

Once you work out which field is which, look for the six fields on _your ticket_ that start with the word `departure`. _What do you get if you multiply those six values together?_