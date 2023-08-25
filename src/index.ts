import { readCharities, readProfile } from "./read-helpers";
import { CharityPicker } from "./CharityPicker";

const totalCharitiesToPick = 12;
const maxStateCharitiesToPick = 5;

export async function main() {
  welcome();

  // Input arguments
  const [, , charitiesPath, profilePath] = process.argv;

  if (!validateParameters(charitiesPath, profilePath)){
    return;
  }

  const allCharities: Charity[] = await readCharities(charitiesPath);
  console.log(`Read ${allCharities.length} charities from ${charitiesPath}`)

  const profile: Profile = await readProfile(profilePath);
  console.log(`Read profile ${JSON.stringify(profile)} from ${charitiesPath}`)

  const charityPicker = new CharityPicker(totalCharitiesToPick, maxStateCharitiesToPick);
  const charitiesToFeature = charityPicker.pickCharities(allCharities, profile);

  // Output result to standard out, one per line
  console.dir(charitiesToFeature);
}

function welcome() {
  console.clear();
  console.log("******************************");
  console.log("Hello FreeWill!");
  console.log("******************************");
}

export function validateParameters(charitiesPath: string, profilePath: string): boolean {
  if (!charitiesPath) {
    console.error("Please specify a path to a csv containing charities.");
    return false;
  }
  if (!profilePath) {
    console.error("Please specify a path to a csv containing a user profile.");
    return false;
  }
  return true;
}

main();
