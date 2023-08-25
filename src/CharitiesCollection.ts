import { _ } from "lodash";

export class CharityCollection {

    distinctCharities: Charity[];

    constructor(inputCharities: Charity[]) {
        this.distinctCharities = _.uniqWith(inputCharities, (a, b) => _.isEqual(a, b));
    }

    public getStateFeaturedCharitiesForUser(profile: Profile): CharityCollection {
        return new CharityCollection(
            this.distinctCharities.filter(c => c.featured?.toLowerCase() === "state"
                && c.state?.toLowerCase() === profile.state?.toLowerCase()));
    }

    public getNationallyFeaturedCharities(): CharityCollection {
        return new CharityCollection(this.distinctCharities.filter(c => c.featured?.toLowerCase() === "national"));
    }

    public getByCategory(categoryName: string): CharityCollection {
        return new CharityCollection(this.distinctCharities.filter(c => c.category?.toLowerCase() === categoryName.toLowerCase()));
    }

    public concat(other: CharityCollection) {
        return new CharityCollection(this.distinctCharities.concat(other.distinctCharities))
    }

    public shuffle(): CharityCollection {
        return new CharityCollection(_.shuffle(this.distinctCharities));
    }

    public get(numToGet: number): Charity[]{
        return this.distinctCharities.slice(0, numToGet);
    }
}