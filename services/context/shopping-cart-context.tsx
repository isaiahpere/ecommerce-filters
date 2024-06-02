"use client";

import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  Dispatch,
} from "react";
import { ProductType } from "@/app/types";

// State Types
interface IState {
  products: ProductType[];
}
const initialState: IState = {
  products: [],
};

// Action Types
enum ActionType {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
}
interface IAction {
  type: ActionType;
  payload?: ProductType[];
}

// Context Type
interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}
const ShoppingCartContext = createContext<IContext>({
  state: {
    products: [],
  },
  dispatch: () => {},
});

// Reducer
const ShoppingCartReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCTS:
      if (action.payload) {
        state.products = action.payload;
      }
      return state;
    default:
      return state;
  }
};

// Context Provider
const ShoppingCartContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState);

  const fetchProducts = async () => {
    try {
      let res = await fetch("/products.json");
      let data = await res.json();
      if (!data || !data.products) {
        throw new Error("AGAINN_SOMTEHING_WENT_WRONG");
      }
      dispatch({
        type: ActionType.FETCH_PRODUCTS,
        payload: data.products,
      });
    } catch (error) {
      console.error("OH_NO_AHHH_SOMETHING_WENT_WRONG", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  let value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export { ShoppingCartContext, ShoppingCartContextProvider };
