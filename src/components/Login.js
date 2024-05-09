import React, { Component } from "react";
import { styled } from "@mui/system";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
// import LocalStorageService from "../service/LocalStorageService";
import { toast } from "react-toastify";

const StyledPaper = styled("div")({
  marginTop: "80px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
});

const StyledAvatar = styled(Avatar)({
  margin: "10px",
  backgroundColor: "secondary",
});

const StyledForm = styled("form")({
  width: "100%",
  marginTop: "10px",
});

const StyledSubmitButton = styled(Button)({
  margin: "30px 0 20px",
});

const StyledPasswordToggle = styled(IconButton)({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
});

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  render() {
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper>
          <StyledAvatar>
            <PersonIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (
                values.username === "demo" &&
                values.password === "Password@123"
              ) {
                // const authToken = "token_Demo_XYZ";
                // LocalStorageService.setItem("authToken", authToken);

                this.props.onLogin();
              } else {
                console.log("Login failed");
                return toast.error("Invalid username or password");
              }
            }}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              touched,
            }) => (
              <StyledForm onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <StyledPasswordToggle
                          onClick={this.togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </StyledPasswordToggle>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledSubmitButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Sign In
                </StyledSubmitButton>
              </StyledForm>
            )}
          </Formik>
        </StyledPaper>
      </Container>
    );
  }
}

// const EnhancedLoginForm = withFormik({
//   mapPropsToValues: () => ({ username: "", password: "" }),
//   validationSchema: validationSchema,
//   handleSubmit: (values, { props }) => {
//     if (values.username === "demo" && values.password === "Password@123") {
//       const authToken = "token_Demo_XYZ";
//       LocalStorageService.setItem("authToken", authToken);

//       props.onLogin();
//     } else {
//       console.log("Login failed");
//       return toast.error("Invalid username or password");
//     }
//   },
// })(Login);

export default Login;
