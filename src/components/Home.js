import React, { Component } from "react";
import { styled } from "@mui/system";
import { Container, CssBaseline, Typography } from "@mui/material";

const StyledContainer = styled(Container)({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

class Home extends Component {
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledContainer>
          <Typography component="h1" variant="h5">
            Welcome to the Home Page
          </Typography>
        </StyledContainer>
      </Container>
    );
  }
}

export default Home;
