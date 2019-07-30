import React from "react";
import configureStore from "redux-mock-store";
import { AppComponent, NotFoundPage, PagesRouting } from "./App";
import { shallow, render } from "enzyme";
import { MemoryRouter } from "react-router";

it("is a silly test", () => {
  expect(4).toEqual(4);
});

describe("App component", () => {
  let mockStore: any = null;
  beforeEach(() => {
    mockStore = configureStore([]);
  });

  it("renders app component with no error", () => {
    const wrapper = shallow(
      <AppComponent setSignOutUser={() => {}} verifyUserSession={() => {}} />
    );
    expect(wrapper.find(".app-container").length).toEqual(1);
  });

  // it("renders app component with not-found page", () => {
  //   const wrapper = render(
  //     <MemoryRouter initialEntries={["nonexisitngroute"]}>
  //       <PagesRouting />
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find(".app-container").length).toEqual(1);
  // });
});
