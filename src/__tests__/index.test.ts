jest.dontMock("../index");

import { hello } from "../index";

describe("Hello Test", () => {
  it("name check", () => {
    const returnvalue = hello("my-package");
    expect(returnvalue).toEqual('Hello my-package {"hoge":1,"fuga":2}');
  });
});
