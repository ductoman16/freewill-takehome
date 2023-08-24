import { readCharities, readProfile } from "./read-helpers";

const N_TOTAL = 12;
const N_MAX_STATE = 5;

function pickCharities(charities, profile) {
  // TODO
  return [];
}

async function main() {
  console.log("Hello World!");
  // Input arguments
  const [, , charitiesPath, profilePath] = process.argv;

  const charities = await readCharities(charitiesPath);
  const profile = await readProfile(profilePath);

  const charitiesToFeature = pickCharities(charities, profile);

  // Output result to standard out, one per line
  console.dir(charitiesToFeature);
}
main();
