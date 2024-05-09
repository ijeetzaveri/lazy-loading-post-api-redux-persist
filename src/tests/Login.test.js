import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Login from "../components/Login";
import { Formik } from "formik";

describe("Login", () => {
  it("matches snapshot for mount render", () => {
    const wrapper = mount(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should update state when username input changes", () => {
    const wrapper = mount(<Login />);
    const usernameInput = wrapper.find("#username").find("input");

    usernameInput.at(0).simulate("change", {
      persist: () => {},
      target: { name: "username", value: "testuser" },
    });
    wrapper.update(); // Force re-render

    expect(usernameInput.html()).toMatch("testuser");
  });

  it("should update state when password input changes", () => {
    const wrapper = mount(<Login />);
    const passwordInput = wrapper.find("#password").find("input");

    passwordInput.at(0).simulate("change", {
      persist: () => {},
      target: { name: "password", value: "testpassword" },
    });
    wrapper.update(); // Force re-render

    expect(passwordInput.html()).toMatch("testpassword");
  });

  it("should submit a valid form", () => {
    const onLoginMock = jest.fn();

    const tree = shallow(<Login onLogin={onLoginMock} />);

    const formikValues = {
      values: { username: "", password: "" },
      errors: {},
      touched: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      handleSubmit: jest.fn(),
      isSubmitting: false,
    };

    const signInForm = (props = { errors: {} }) =>
      tree.find(Formik).renderProp("children")(props);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const signingInForm = signInForm(formikValues);
    expect(signingInForm.html()).toMatch(/Sign In/);
  });

  it("should return error for invalid username", () => {
    const onLoginMock = jest.fn();
    const tree = shallow(<Login onLogin={onLoginMock} />);

    const signInForm = (props = { errors: {} }) =>
      tree.find(Formik).renderProp("children")(props);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const formWithInvalidEmailErrors = signInForm({
      errors: {
        username: "Invalid username",
      },
      values: { username: "", password: "" },
      touched: { username: true },
      isSubmitting: false,
    });

    expect(formWithInvalidEmailErrors.html()).toMatch(/Invalid username/);
  });

  it("should return error if the username is not complete", () => {
    const onLoginMock = jest.fn();

    const tree = shallow(<Login onLogin={onLoginMock} />);

    const signInForm = (props = { errors: {} }) =>
      tree.find(Formik).renderProp("children")(props);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const formWithInvalidUsernamelErrors = signInForm({
      errors: {
        username: "Minimum of 6 characters",
      },
      touched: { username: true },
      isSubmitting: false,
      values: { username: "", password: "" },
    });

    expect(formWithInvalidUsernamelErrors.html()).toMatch(
      /Minimum of 6 characters/
    );
  });

  it("should return error if there is password validation error", () => {
    const onLoginMock = jest.fn();

    const tree = shallow(<Login onLogin={onLoginMock} />);

    const signInForm = (props = { errors: {} }) =>
      tree.find(Formik).renderProp("children")(props);

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const formWithPAsswordErrors = signInForm({
      errors: {
        password:
          "Password must contain at least one special character and uppercase letter",
      },
      touched: { password: true },
      isSubmitting: false,
      values: { username: "", password: "" },
    });
    expect(formWithPAsswordErrors.html()).toMatch(
      /Password must contain at least one special character and uppercase letter/
    );
  });
});
