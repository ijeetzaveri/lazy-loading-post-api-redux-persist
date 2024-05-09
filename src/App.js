import React, { Component } from "react";
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";
import { connect } from "react-redux";

import LazyLoadTable from "./components/LazyLoadTable";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import { login, logout, setData } from "./redux/actions/auth-action";

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   isAuthenticated: this.props.isAuthenticated,
  //   // };
  // }

  handleLogin = () => {
    this.props.login();

    const userData = { username: "demoUsername" };
    this.props.setData(userData);

    return toast.success("User logged in successfully.");
  };

  handleLogout = () => {
    this.props.logout();

    toast.success("User logged out successfully.");
    return this.props.navigate("/login");
  };

  render() {
    // const { isAuthenticated } = this.state;
    const { isAuthenticated, userData } = this.props;

    return (
      <>
        <Navbar
          isAuthenticated={isAuthenticated}
          handleLogout={this.handleLogout}
          userDataPayload={userData}
        />
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/"
            element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          >
            <Route exact path="/posts" element={<LazyLoadTable />} />
          </Route>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/posts" />
              ) : (
                <Login onLogin={this.handleLogin} />
              )
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  login,
  logout,
  setData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(App));
