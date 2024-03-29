\--- Part Two ---
-----------------

The final step in breaking the XMAS encryption relies on the invalid number you just found: you must _find a contiguous set of at least two numbers_ in your list which sum to the invalid number from step 1.

Again consider the above example:

    35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576
    

In this list, adding up all of the numbers from `15` through `40` produces the invalid number from step 1, `127`. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the _encryption weakness_, add together the _smallest_ and _largest_ number in this contiguous range; in this example, these are `15` and `47`, producing _`62`_.

_What is the encryption weakness in your XMAS-encrypted list of numbers?_