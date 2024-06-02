"use client";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { ProductType } from "@/app/types";

// we get both state & dispatch from context
// state => products
// dispatch => state, payload

// reducer will take both the state & action
// state => products
// action => type, payload

// State Type
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
  payload?: IState;
}

// Context Type
interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

// ShoppingCartReducer
const ShoppingCartReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCTS:
      if (action?.payload?.products) {
        state.products = action.payload.products;
      }
      return state;

    default:
      console.log("YOU HIT SHOPPING CART REDUCER DEFAULT");
      return state;
  }
};

//create Context
const ShoppingCartContext = createContext<IContext>({
  state: {
    products: [],
  },
  dispatch: () => {},
});

// Context Provider
const ShoppingCartContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState);

  // initial fetching of products
  const initialProductsFetch = async () => {
    try {
      let res = await fetch("/products.json");
      let data = await res.json();
      if (!data || !data.products) {
        throw new Error("FAILED TO FETCH PRODUCTS");
      }
      dispatch({
        type: ActionType.FETCH_PRODUCTS,
        payload: { products: data.products },
      });
    } catch (error) {
      console.error("There is an error with inital fetch", error);
    }
  };

  useEffect(() => {
    initialProductsFetch();
  }, []);

  let value = { state, dispatch };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export {
  ShoppingCartContext,
  ShoppingCartContextProvider,
  useShoppingCartContext,
};
