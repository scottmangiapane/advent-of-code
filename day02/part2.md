\--- Part Two ---
-----------------

While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two _positions in the password_, where `1` means the first character, `2` means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) _Exactly one of these positions_ must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

*   `1-3 a: _a_b_c_de` is _valid_: position `1` contains `a` and position `3` does not.
*   `1-3 b: _c_d_e_fg` is _invalid_: neither position `1` nor position `3` contains `b`.
*   `2-9 c: c_c_cccccc_c_` is _invalid_: both position `2` and position `9` contain `c`.

_How many passwords are valid_ according to the new interpretation of the policies?