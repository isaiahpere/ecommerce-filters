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
import Products from "@/components/products/products";

//### State Type
interface IState {
  products: ProductType[];
}

//### Action Types
enum ActionType {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
}

interface IAction {
  type: ActionType;
  payload?: IState;
}

//#### Context Types
interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

// (REDUCER) - Products Reducer
const ProductsReducer = (state: IState, action: IAction) => {
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

// (CONTEXT) - Products Context
const ProductsContext = createContext<IContext>({
  state: {
    products: [],
  },
  dispatch: () => {},
});

// (CONTEXT_PROVIDER) - Products Context Provider
const ProductsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, {
    products: [],
  });

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
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// (USE_CONTEXT_HOOK)
const useProductsContext = () => {
  return useContext(ProductsContext);
};

export { ProductsContextProvider, useProductsContext };
