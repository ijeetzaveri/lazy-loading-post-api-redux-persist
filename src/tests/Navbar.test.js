import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";

import Navbar from "../components/Navbar";
import { AppBar, Link, Toolbar } from "@mui/material";

describe("Navbar", () => {
  it("matches snapshot for mount render", () => {
    const wrapper = mount(<Navbar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should check login button exists", () => {
    const wrapper = mount(<Navbar />);
    const loginButton = wrapper
      .find(AppBar)
      .find(Toolbar)
      .find(Link)
      .filterWhere((link) => link.prop("href") === "/login");

    expect(loginButton.exists()).toBeTruthy();
  });

  it("should check and click on login button", () => {
    const handleLogoutMock = jest.fn();

    const wrapper = mount(
      <Navbar isAuthenticated={true} handleLogout={handleLogoutMock} />
    );

    const logoutButton = wrapper
      .find(AppBar)
      .find(Toolbar)
      .find("#logoutButton");

    logoutButton.at(0).props().onClick();

    wrapper.update();

    expect(logoutButton.exists()).toBeTruthy();
  });
});
