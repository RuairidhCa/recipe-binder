import { prepareTags, prepareUrl } from "./utils";

describe("prepareTags", () => {
  it("should split a comma seperated string of tags into an array", () => {
    const expectedResult = ["tag1", "tag2", "tag3"];
    const result = prepareTags("Tag1,Tag2 , ,Tag3");

    expect(result).toEqual(expectedResult);
  });
});

describe("prepareUrl", () => {
  it("should add http:// to a url if not already present", () => {
    let expectedResult = "http://google.com";
    let result = prepareUrl("google.com ");
    expect(result).toEqual(expectedResult);

    expectedResult = "http://google.com";
    result = prepareUrl("http://google.com");
    expect(result).toEqual(expectedResult);
  });
});
