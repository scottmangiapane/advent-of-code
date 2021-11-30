## Advent of Code

This is my Javascript set of solutions for Advent of Code:
https://adventofcode.com

## How to Install

1. Clone this repository
   ```
   git clone https://github.com/scottmangiapane/advent-of-code.git
   ```
2. Install dependencies
   ```
   npm i
   ```

## How to Use

To run a solution, use the following command:
```
node 2020/day01
```

Replace "2020/01" with the path to the day you want to test.

During development it is useful to have scripts re-run automatically when changes are detected. To do this, replace the previous command with:
```
npx nodemon 2020/day01
```

There is also a helper script installed to download the questions for any given day and convert them to markdown. Since part 2 questions are only available for accounts that have completed the corresponding part 1 question, an auth token is required. Use the script like so:
```
export AUTH=<your_session_token>
node download <year> <day>
```
