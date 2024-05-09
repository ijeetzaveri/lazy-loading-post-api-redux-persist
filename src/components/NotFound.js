import React, { Component } from "react";
import { styled } from "@mui/system";
import { Typography, Paper } from "@mui/material";

const StyledNotFoundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  padding: "40px",
});

class NotFound extends Component {
  render() {
    return (
      <StyledNotFoundContainer>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          {/* <StyledErrorImage
            src="https://i.imgur.com/qIufhof.png"
            alt="404 Error"
          /> */}
          <Typography variant="h4" component="h1" gutterBottom>
            404..! Page not found.
          </Typography>
          <Typography variant="body1">
            The page you are looking for might be under construction or does not
            exist.
          </Typography>
        </Paper>
      </StyledNotFoundContainer>
    );
  }
}

export default NotFound;
