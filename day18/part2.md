\--- Part Two ---
-----------------

You manage to answer the child's questions and they finish part 1 of their homework, but get stuck when they reach the next section: _advanced_ math.

Now, addition and multiplication have _different_ precedence levels, but they're not the ones you're familiar with. Instead, addition is evaluated _before_ multiplication.

For example, the steps to evaluate the expression `1 + 2 * 3 + 4 * 5 + 6` are now as follows:

    1 + 2 * 3 + 4 * 5 + 6
      3   * 3 + 4 * 5 + 6
      3   *   7   * 5 + 6
      3   *   7   *  11
         21       *  11
             231
    

Here are the other examples from above:

*   `1 + (2 * 3) + (4 * (5 + 6))` still becomes _`51`_.
*   `2 * 3 + (4 * 5)` becomes _`46`_.
*   `5 + (8 * 3 + 9 + 3 * 4 * 3)` becomes _`1445`_.
*   `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))` becomes _`669060`_.
*   `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2` becomes _`23340`_.

_What do you get if you add up the results of evaluating the homework problems using these new rules?_