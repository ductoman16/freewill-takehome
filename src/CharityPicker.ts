import { _ } from "lodash";
import { CharityPickerResult } from "./CharityPickerResult";
import { CharityCollection } from "./CharitiesCollection";

export class CharityPicker {

  private _totalCharitiesToPick: number;
  private _maxStateCharitiesToPick: number;
  private _minAnimalCharitiesToPick: number;

  constructor(totalCharitiesToPick: number, maxStateCharitiesToPick: number, minAnimalCharitiesToPick: number) {
    this._totalCharitiesToPick = totalCharitiesToPick;
    this._maxStateCharitiesToPick = maxStateCharitiesToPick;
    this._minAnimalCharitiesToPick = minAnimalCharitiesToPick;
  }

  public pickCharities(inputCharities: Charity[], profile: Profile): Charity[] {
    const distinctCharities = new CharityCollection(inputCharities);

    let nationalCharities = distinctCharities.getNationallyFeaturedCharities();
    let userStateCharities = distinctCharities.getStateFeaturedCharitiesForUser(profile);

    const result = new CharityPickerResult(this.chooseStateNationalDistribution());

    if (profile.hasPets) {
      const allAnimalCharities = distinctCharities.getByCategory('animal_related');
      const desiredNumAnimalCharities = _.random(this._minAnimalCharitiesToPick, Math.min(allAnimalCharities.distinctCharities.length, this._totalCharitiesToPick));

      var stateAnimalCharities = userStateCharities.getByCategory('animal_related');
      var nationalAnimalCharities = nationalCharities.getByCategory('animal_related');

      var chosenAnimalCharities = stateAnimalCharities.concat(nationalAnimalCharities)
        .shuffle().get(desiredNumAnimalCharities);

      result.add(chosenAnimalCharities);
    }

    result.fillRemaining(userStateCharities, nationalCharities);

    return _.shuffle(result.finalResultShuffled());
  }

  private chooseStateNationalDistribution() {
    const numStateCharities = _.random(1, this._maxStateCharitiesToPick);
    const numNationalCharities = this._totalCharitiesToPick - numStateCharities;

    console.log(`Choosing ${numStateCharities} state featured charities`);
    console.log(`and ${numNationalCharities} nationally featured charities`);
    return { numStateCharities, numNationalCharities };
  }
}
