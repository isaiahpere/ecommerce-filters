"use client";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ProductType } from "@/app/types";

// TYPES
export interface IAppState {
  products: ProductType[];
}

export const initialState: IAppState = {
  products: [],
};

// CONTEXT TYPES - STATE & ACTION
export enum ActionType {
  FETCH_PRODUCT = "FETCH_PRODUCT",
}
export type IAction = {
  type: ActionType;
  payload?: ProductType[];
};
export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<IAction>;
}

// CREATE CONTEXT
const ShoppingCartContext = createContext<IAppContext>({
  state: {
    products: [],
  },
  dispatch: () => {},
});

/**
 * Reducer function should simply digest the action payload and return a new state object
 */
const productsReducer = (state: IAppState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT: {
      if (action.payload) {
        state.products = [...action.payload];
      }
      return {
        ...state,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

const ShoppingCartContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    productsReducer,
    initialState as IAppState
  );
  const fetchProducts = async () => {
    let res = await fetch("/products.json");
    let data = await res.json();
    if (data && data.products) {
      dispatch({ type: ActionType.FETCH_PRODUCT, payload: data.products });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = { state, dispatch };
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
