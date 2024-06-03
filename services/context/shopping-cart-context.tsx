"use client";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { ProductType } from "@/app/types";

//### State Type
interface IState {
  products: ProductType[];
}
const intialState = {
  products: [],
};

//### Action Types
enum ActionType {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
}
enum FiltersTypeAction {
  SORT_BY_LOWEST = "SORT_BY_LOWEST",
}
interface IAction {
  type: ActionType.FETCH_PRODUCTS;
  payload?: IState;
}

interface IFilterAction {
  type: FiltersTypeAction;
}

//#### Context Types
interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

// (REDUCER) - Shopping Cart Reducer
const ShoppingCartReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload?.products ?? state.products,
      };
    default:
      console.log("---- YOU HIT DEFAULT REDUCER ACTION ----");
      return state;
  }
};

// (CONTEXT) - Shopping Cart Context
const ShoppingCartContext = createContext<IContext>({
  state: {
    products: [],
  },
  dispatch: () => {},
});

// (CONTEXT_PROVIDER) - Shopping Cart Context Provider
const ShoppingCartContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingCartReducer, { products: [] });

  // Initial Products Fetch
  const fetchProducts = async () => {
    try {
      let res = await fetch("/products.json");
      let data = await res.json();

      if (!data || !data.products) {
        throw new Error("[PRODCUTS_FETCHING_FAILED");
      }
      dispatch({
        type: ActionType.FETCH_PRODUCTS,
        payload: { products: data.products },
      });
    } catch (error) {
      console.error("[FAILED_TO_FETCH_PRODUCTS]", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!state.products) return;

  let value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

// (USE_CONTEXT_HOOK)
const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export { ShoppingCartContextProvider, useShoppingCartContext };
