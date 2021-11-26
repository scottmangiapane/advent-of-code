## Advent of Code (2020)

This is a Javascript set of solutions for the 2020 Advent of Code:
https://adventofcode.com/2020

## How to Install

1. Clone this repository
   ```
   git clone https://github.com/scottmangiapane/advent-of-code-2020.git
   ```
2. Install dependencies
   ```
   npm i
   ```

## How to Use

To run a solution, use the following command:
```
node day01
```

Replace "01" with any number between "01" and "25" depending on the day you want to test.

During development it is useful to have scripts re-run automatically when changes are detected. To do this, replace the previous command with:
```
npx nodemon day01
```

There is also a helper script installed to download the questions for any given day and convert them to markdown. Since part 2 questions are only available for accounts that have completed the corresponding part 1 question, an auth token is required. Use the script like so:
```
export AUTH=<your_session_token>
node download <day>
```
