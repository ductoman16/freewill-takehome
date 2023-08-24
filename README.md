# Free Will Takehome Assignment - Charity Selector

## Running locally
Use the following npm script to compile and run:

``` shell
npm run start
```

**Important Note:** I used older versions of packages like `typescript` and `jest` in this example, because the boilerplate specified Node 12, and I wanted to make sure it ran correctly. Were this a real application in production, I'd strongly recommend using more up-to-date versions due to security risks.

## Requirements

### Part 1

- [ ] Take in these command line args:
    - [ ] charities: Path to a CSV of charities
    - [ ] profileInfo: Path to a CSV of the user's profile information (1 header row and 1 data row)
- [ ] output 12 random distinct charity objects, one per line, in a random order
- [ ] The number of state-featured charities that are selected must be random, not a fixed number. 
- [ ] State-featured charities chosen must match the user's state of residence. 
- [ ] The number of state-featured charities chosen must not exceed 5. 
- [ ] The rest of the charities your program chooses must be nationally-featured charities.

### Part 2

- [ ] If the user in profileInfo has pets, ensure that at least 4 are ANIMAL_RELATED organizations
- [ ] future-proofing
- [ ] Still works if user doesn't have pets