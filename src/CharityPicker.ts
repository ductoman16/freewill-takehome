import { _ } from "lodash";

export class CharityPicker {

  private _totalCharitiesToPick: number;
  private _maxStateCharitiesToPick: number;

  constructor(totalCharitiesToPick: number, maxStateCharitiesToPick: number) {
    this._totalCharitiesToPick = totalCharitiesToPick;
    this._maxStateCharitiesToPick = maxStateCharitiesToPick;
  }

  public pickCharities(allCharities: Charity[], profile: Profile): Charity[] {
    const distinctCharities = _.uniqWith(allCharities, (a, b) => _.isEqual(a, b));

    let nationalCharities = distinctCharities.filter(c => c.featured.toLowerCase() === "national");
    let userStateCharities = distinctCharities.filter(c => 
      c.featured.toLowerCase() === "state" 
      && c.state.toLowerCase() === profile.state.toLowerCase());

    let shuffledNationalCharities = _.shuffle(nationalCharities);
    let shuffledStateCharities = _.shuffle(userStateCharities);

    const stateCharitiesToPick = _.random(1, this._maxStateCharitiesToPick);
    const nationalCharitiesToPick = this._totalCharitiesToPick - stateCharitiesToPick;

    const chosenStateCharities = shuffledStateCharities.slice(0, stateCharitiesToPick);
    const chosenNationalCharities = shuffledNationalCharities.slice(0, nationalCharitiesToPick);
    
    console.log(`Choosing ${stateCharitiesToPick} state featured charities`);
    console.log(`and ${nationalCharitiesToPick} nationally featured charities`);

    return _.shuffle(chosenStateCharities.concat(chosenNationalCharities));
  }
}