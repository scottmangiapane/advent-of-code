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

There is also a helper script to download the questions for any given day and convert them to markdown. It also downloads the input file. Because this is unique for each user, you must first copy your session cookie into the `.env` file. You can tell git to ignore your changes like so:
```
git update-index --assume-unchanged .env
```

Finally, run the script:
```
node download <year> <day>
```
