import React, { Component } from "react";
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  textDecoration: "none",
  color: "white",
});

class Navbar extends Component {
  handleLogoutButton = () => {
    this.props.handleLogout();
  };

  render() {
    const { isAuthenticated, userDataPayload } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lazy Loaded Posts
          </Typography>
          {userDataPayload && <h3>Welcome, {userDataPayload.username}</h3>}
          <Link href="/">
            <StyledButton color="inherit">Home</StyledButton>
          </Link>
          <Link href="/posts">
            <StyledButton color="inherit">Posts</StyledButton>
          </Link>
          {!isAuthenticated && (
            <Link href="/login">
              <StyledButton color="inherit">Login</StyledButton>
            </Link>
          )}
          {isAuthenticated && (
            <StyledButton
              id="logoutButton"
              color="inherit"
              onClick={this.handleLogoutButton}
            >
              Logout
            </StyledButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
