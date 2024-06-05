"use client";
import { ProductType } from "@/app/types";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

// ### STATE TYPES
interface ICartItem {
  product: ProductType;
  qty: number;
}
interface ICartState {
  cart: ICartItem[];
}
const initialState: ICartState = {
  cart: [],
};

// ### ACTION TYPES
export enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CHANGE_CART_QTY = "CHANGE_CART_QTY",
  CLEAR_CART = "CLEAR_CART",
}
interface IAction {
  type: CartActionType;
  payload: ICartItem;
}

// ### CONTEXT TYPE
interface IContext {
  state: ICartState;
  dispatch: Dispatch<IAction>;
}

// (REDUCER)
const CartReducer = (state: ICartState, action: IAction) => {
  switch (action.type) {
    case CartActionType.ADD_ITEM:
      let paylaod = action.payload;
      if (!paylaod.product || !paylaod.qty) return state;

      let existingItem = state.cart.find(
        (item) => item.product.id === paylaod.product.id
      );

      if (existingItem) {
        let updatedCart = state.cart.map((item) =>
          item.product.id === paylaod.product.id
            ? { ...item, qty: item.qty + paylaod.qty }
            : item
        );

        return { ...state, cart: [...updatedCart] };
      } else {
        return { ...state, cart: [...state.cart, paylaod] };
      }
    case CartActionType.REMOVE_ITEM:
      let removeItem = action.payload;
      if (!removeItem.product || !removeItem.qty) return state;

      let updatedCart = state.cart.filter(
        (item) => item.product.id !== removeItem.product.id
      );
      return { ...state, cart: [...updatedCart] };
    case CartActionType.CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};

// (CONTEXT)
const CartContext = createContext<IContext>({
  state: { cart: [] },
  dispatch: () => {},
});

// (PROVIDER)
const CartContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, { cart: [] });

  let value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// (HOOK)
const useCartContext = () => {
  return useContext(CartContext);
};

// (EXPORTS)
export { CartContextProvider, useCartContext };
