import { validateParameters, main } from '../src/index';

describe('main', () => {
  const error = jest.spyOn(console, "error").mockImplementation(() => { });

  afterEach(() => {
    error.mockReset();
  });

  test('when passed no charities path outputs warning', () => {
    process.argv = [, , "", "./my-profile.csv"]
    main();
    expect(error).toBeCalledWith(expect.stringContaining("Please specify a path to a csv containing charities"));
  });

  test('when passed no profile path outputs warning', () => {
    process.argv = [, , "./my-charities.csv", ""]
    main();
    expect(error).toBeCalledWith(expect.stringContaining("Please specify a path to a csv containing a user profile"));
  });
});

describe('validateParameters', () => {
  test('when passed no profile path returns false', () => {
    var result = validateParameters("./my-charities.csv", "");
    expect(result).toBe(false);
  });

  test('when passed no charities path returns false', () => {
    var result = validateParameters("", "./my-profile.csv");
    expect(result).toBe(false);
  });

  test('when passed all parameters returns true', () => {
    var result = validateParameters("./my-charities.csv", "./my-profile.csv");
    expect(result).toBe(true);
  });

});