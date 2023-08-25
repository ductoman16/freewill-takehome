import { CharityCollection } from "./CharitiesCollection";

export class CharityPickerResult {
  desiredDistribution: { numStateCharities: number; numNationalCharities: number; };
  stateCharities: Charity[] = [];
  nationalCharities: Charity[] = [];

  constructor(desiredDistribution: { numStateCharities: number; numNationalCharities: number; }) {
    this.desiredDistribution = desiredDistribution;
  }

  public add(charities: Charity[]) {
    charities.forEach(c => {
      if (c.featured?.toLowerCase() === "state") {
        this.stateCharities.push(c);
      } else if (c.featured?.toLowerCase() === "national") {
        this.nationalCharities.push(c);
      }
    });
  }

  public fillRemaining(stateCharities: CharityCollection, nationalCharities: CharityCollection) {
    const stateCharitiesToAdd = stateCharities.shuffle().get(this.desiredDistribution.numStateCharities - this.stateCharities.length);
    console.log("this.desiredDistribution.numStateCharities " + this.desiredDistribution.numStateCharities)
    console.log("this.stateCharities.length " + this.stateCharities.length)
    console.log("this.desiredDistribution.numStateCharities - this.stateCharities.length " + (this.desiredDistribution.numStateCharities - this.stateCharities.length))
    console.log("filling remaining with " + stateCharitiesToAdd.length + " state charities")
    this.add(stateCharitiesToAdd);

    const nationalCharitiesToAdd = nationalCharities.shuffle().get(this.desiredDistribution.numNationalCharities - this.nationalCharities.length);
    console.log("this.desiredDistribution.numNationalCharities " + this.desiredDistribution.numNationalCharities)
    console.log("this.nationalCharities.length " + this.nationalCharities.length)
    console.log("this.desiredDistribution.numNationalCharities - this.nationalCharities.length " + (this.desiredDistribution.numNationalCharities - this.nationalCharities.length))
    console.log("filling remaining with " + nationalCharitiesToAdd.length + " national charities")
    this.add(nationalCharitiesToAdd);

    console.log();
  }

  public finalResultShuffled(): Charity[] {
    return this.stateCharities.concat(this.nationalCharities);
  }
}
