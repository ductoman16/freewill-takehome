export class PersonalizationOptions {
    profileSelector: (profile: Profile) => boolean;
    categoryToHighlight: string;
    minNumberOfCharities: number;

    constructor(
        profileSelector: (profile: Profile) => boolean,
        categoryToHighlight: string,
        minNumberOfCharities: number) {
            
        this.profileSelector = profileSelector;
        this.categoryToHighlight = categoryToHighlight;
        this.minNumberOfCharities = minNumberOfCharities;
    }
}