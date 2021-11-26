\--- Part Two ---
-----------------

As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which _anyone_ answered "yes"; you need to identify the questions to which _everyone_ answered "yes"!

Using the same example as above:

    abc
    
    a
    b
    c
    
    ab
    ac
    
    a
    a
    a
    a
    
    b
    

This list represents answers from five groups:

*   In the first group, everyone (all 1 person) answered "yes" to _`3`_ questions: `a`, `b`, and `c`.
*   In the second group, there is _no_ question to which everyone answered "yes".
*   In the third group, everyone answered yes to only _`1`_ question, `a`. Since some people did not answer "yes" to `b` or `c`, they don't count.
*   In the fourth group, everyone answered yes to only _`1`_ question, `a`.
*   In the fifth group, everyone (all 1 person) answered "yes" to _`1`_ question, `b`.

In this example, the sum of these counts is `3 + 0 + 1 + 1 + 1` = _`6`_.

For each group, count the number of questions to which _everyone_ answered "yes". _What is the sum of those counts?_