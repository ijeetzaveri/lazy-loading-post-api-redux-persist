import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { connect } from "react-redux";

class ProtectedRoute extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? <Outlet /> : <Navigate to="/not-found" />;
  }
}

export default ProtectedRoute;
