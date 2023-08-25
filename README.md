# Free Will Takehome Assignment - Charity Selector

## Running locally
Use the following npm script to compile and run:

``` shell
npm run start
```

And to run unit tests:

``` shell
npm run test
```
**Important Note #1:** Some of these tests are "flaky" due to testing randomized functionality. As mentioned in the comments in the test files, this could be fixed by
performing statistical analysis to validate that results appear random, but I didn't think that was appropriate for this exercise.

---

**Important Note #2:** I used older versions of packages like `typescript` and `jest` in this example, because the boilerplate specified Node 12, and I wanted to make sure it ran correctly. Were this a real application in production, I'd strongly recommend using more up-to-date versions due to security risks.

---

## Requirements

### Part 1

- [X] Take in these command line args:
    - [X] charities: Path to a CSV of charities
    - [X] profileInfo: Path to a CSV of the user's profile information (1 header row and 1 data row)
- [X] output 12 random distinct charity objects, one per line, in a random order
- [X] The number of state-featured charities that are selected must be random, not a fixed number. 
- [X] State-featured charities chosen must match the user's state of residence. 
- [X] The number of state-featured charities chosen must not exceed 5. 
- [X] The rest of the charities your program chooses must be nationally-featured charities.

### Part 2

- [X] If the user in profileInfo has pets, ensure that at least 4 are ANIMAL_RELATED organizations
- [X] future-proofing
- [X] Still works if user doesn't have pets