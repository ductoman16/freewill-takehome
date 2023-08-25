import { _ } from "lodash";
import { CharityPickerResult } from "./CharityPickerResult";
import { CharityCollection } from "./CharitiesCollection";
import { PersonalizationOptions } from "./PersonalizationOption";

export class CharityPicker {

  private _totalCharitiesToPick: number;
  private _maxStateCharitiesToPick: number;
  private _personalizationOptions: PersonalizationOptions;

  constructor(totalCharitiesToPick: number, maxStateCharitiesToPick: number, personalizationOptions: PersonalizationOptions) {
    this._totalCharitiesToPick = totalCharitiesToPick;
    this._maxStateCharitiesToPick = maxStateCharitiesToPick;
    this._personalizationOptions = personalizationOptions;
  }

  public pickCharities(inputCharities: Charity[], profile: Profile): Charity[] {
    const distinctCharities = new CharityCollection(inputCharities);

    let nationalCharities = distinctCharities.getNationallyFeaturedCharities();
    let userStateCharities = distinctCharities.getStateFeaturedCharitiesForUser(profile);

    const result = new CharityPickerResult(this.chooseStateNationalDistribution());

    if (this._personalizationOptions) {
      this.addPersonalizedCharities(profile, distinctCharities, userStateCharities, nationalCharities, result, this._personalizationOptions);
    }

    result.fillRemaining(userStateCharities, nationalCharities);

    return _.shuffle(result.finalResultShuffled());
  }

  private addPersonalizedCharities(
    profile: Profile,
    allDistinctCharities: CharityCollection,
    userStateCharities: CharityCollection,
    nationalCharities: CharityCollection,
    result: CharityPickerResult,
    personalizationOptions: PersonalizationOptions) {

    if (personalizationOptions.profileSelector(profile)) {
      const allCharitiesInCategory = allDistinctCharities.getByCategory(personalizationOptions.categoryToHighlight);
      const desiredNumHighlightedCharities = _.random(personalizationOptions.minNumberOfCharities, Math.min(allCharitiesInCategory.distinctCharities.length, this._totalCharitiesToPick));

      console.log(`Including ${desiredNumHighlightedCharities} charities in the category: '${personalizationOptions.categoryToHighlight}'`);
      console.log()

      var stateHighlightedCharities = userStateCharities.getByCategory(personalizationOptions.categoryToHighlight);
      var nationalHighlightedCharities = nationalCharities.getByCategory(personalizationOptions.categoryToHighlight);

      var chosenAnimalCharities = stateHighlightedCharities.concat(nationalHighlightedCharities)
        .shuffle().get(desiredNumHighlightedCharities);

      result.add(chosenAnimalCharities);
    }
  }

  private chooseStateNationalDistribution() {
    const numStateCharities = _.random(1, this._maxStateCharitiesToPick);
    const numNationalCharities = this._totalCharitiesToPick - numStateCharities;

    console.log(`Choosing ${numStateCharities} state featured charities`);
    console.log(`and ${numNationalCharities} nationally featured charities`);
    return { numStateCharities, numNationalCharities };
  }
}
