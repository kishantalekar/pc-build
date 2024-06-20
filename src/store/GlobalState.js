import { getData } from "@/utils/fetchData";
import Cookies from "js-cookie";
import { createContext, useReducer, useEffect } from "react";

export const DataContext = createContext();

export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
  ADD_ORDERS: "ADD_ORDERS",
  ADD_USERS: "ADD_USERS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
};

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return { ...state, auth: action.payload };

    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const initialState = { auth: {} };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth } = state;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    // const daa = Cookies.getItem("refreshtoken");
    // console.log(daa, "lsdffjl");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) {
          console.log(res.err);
          return localStorage.removeItem("firstLogin");
        }
        console.log(res, "from last");
        if (res?.user)
          dispatch({
            type: "AUTH",
            payload: {
              token: res.access_token,
              user: res.user,
              isAuthenticated: true,
            },
          });
      });
    }
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
