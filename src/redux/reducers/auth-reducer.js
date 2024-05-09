// import LocalStorageService from "../../service/LocalStorageService";

const initialState = {
  isAuthenticated: false,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        userData: action.payload,
      };

    case "LOGOUT":
      return {
        isAuthenticated: false,
        userData: null,
      };

    case "SET_DATA":
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
