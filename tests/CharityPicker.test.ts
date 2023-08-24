import exp from "constants";
import { CharityPicker } from "../src/CharityPicker"

const testCharities = [
    {}
]

describe('CharityPicker', () => {


    let picker: CharityPicker;

    beforeEach(()=> {
        picker = new CharityPicker();
    });

    describe("pickCharities",()=> {
        picker.pickCharities()
    });
})