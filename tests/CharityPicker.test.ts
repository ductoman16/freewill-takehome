import { CharityPicker } from "../src/CharityPicker"
import { PersonalizationOptions } from "../src/PersonalizationOption";
import { testCharities, getTestProfile, duplicateCharities } from "./sampledata";
import { uniqWith, isEqual } from "lodash";

describe('CharityPicker', () => {
    const totalCharities = 8;
    const maxStateCharities = 3;

    let picker: CharityPicker;

    beforeEach(() => {
        picker = new CharityPicker(totalCharities, maxStateCharities, null);
    });

    describe("pickCharities", () => {
        test("Returns the specified total number of charities", () => {

            var results = picker.pickCharities(testCharities, getTestProfile());
            expect(results.length).toBe(totalCharities);
        });

        // TODO: Flaky
        test("Returns randomly shuffled charities", () => {

            var results1 = picker.pickCharities(testCharities, getTestProfile());
            var results2 = picker.pickCharities(testCharities, getTestProfile());

            // Consecutive results should have the same length
            expect(results1.length).toBe(results2.length);

            // Consecutive results should not contain the same charities
            expect(results1).not.toEqual(expect.arrayContaining(results2));
            /* 
             * NOTE: there is an extremely small chance that the shuffle is the same 
             * twice in a row, causing a false negative - but for the purpose of 
             * this assignment we'll say that's fine.
             * 
             * This could also give a false negative if the number of charities to pick
             * from is the same as the total number requested - but again for the 
             * purpose of this assignment we'll say that's fine.
             */
        });

        test("Returns fewer than the maximum number of state featured charities", () => {
            var results = picker.pickCharities(testCharities, getTestProfile());

            var chosenStateCharities = results.filter(charity => charity.featured.toLowerCase() === "state");
            expect(chosenStateCharities.length).toBeLessThanOrEqual(maxStateCharities);
        });

        test("Returns only state and national featured charities", () => {
            var results = picker.pickCharities(testCharities, getTestProfile());

            results.forEach(charity => expect(["national", "state",]).toContain(charity.featured.toLowerCase()));
        });

        test("Returns no duplicates", () => {
            picker = new CharityPicker(4, 2, null);

            var results = picker.pickCharities(duplicateCharities, getTestProfile());

            // we pass a comparator function that compares objects a & b
            const withoutDuplicates = uniqWith(results, (a, b) => isEqual(a, b));

            // var withoutDuplicates = results.filter((value, index, array) => array.indexOf(value) === index);
            expect(results.length).toBe(withoutDuplicates.length);
        });

        test("Returns only state charities for the user's state", () => {
            const profile = getTestProfile();
            var results = picker.pickCharities(testCharities, profile);

            var stateCharities = results.filter(c => c.featured.toLowerCase() === "state");
            stateCharities.forEach(c => expect(c.state.toLowerCase()).toBe(profile.state.toLowerCase()));
        });

        // TODO: Flaky
        test("Returns a random number of state charities", () => {
            picker = new CharityPicker(22, 21, null);

            var results1 = picker.pickCharities(testCharities, getTestProfile());
            var results2 = picker.pickCharities(testCharities, getTestProfile());

            var stateCharities1 = results1.filter(c => c.featured.toLowerCase() === "state");
            var stateCharities2 = results2.filter(c => c.featured.toLowerCase() === "state");
            /*
             * Again, there's a chance we'll get the same random number twice in a row,
             * but for the purpose of this assignment that's fine.
             * 
             * If this is important to fix, we can run pickCharities a large number of times,
             * and assert that the results are approximately statistically random.
            */

            expect(stateCharities2.length).not.toBe(stateCharities1.length);
        });

        test("Returns animal related charities if user has pets", () => {
            const minAnimalCharities = 2;
            picker = new CharityPicker(totalCharities, maxStateCharities,
                new PersonalizationOptions(p => p.hasPets, "animal_related", minAnimalCharities));

            const profile = getTestProfile();
            profile.hasPets = true;

            var results = picker.pickCharities(testCharities, profile);

            expect(results.filter(c => c.category.toLowerCase() === 'animal_related').length)
                .toBeGreaterThanOrEqual(minAnimalCharities)
        });

        // test("Still returns correct total number of charities when personlized results are included", () => {
        //     const minAnimalCharities = 2;
        //     picker = new CharityPicker(totalCharities, maxStateCharities,
        //         new PersonalizationOptions(p => p.hasPets, "animal_related", minAnimalCharities));

        //     const profile = getTestProfile();
        //     profile.hasPets = true;

        //     var results = picker.pickCharities(testCharities, profile);

        //     expect(results.length).toBe(totalCharities);
        // });
    });
})