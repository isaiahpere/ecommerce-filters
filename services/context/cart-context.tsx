"use client";
import { ProductType } from "@/app/types";
import { Dispatch, createContext, useReducer } from "react";

// ### State Type
interface ICartItem {
  product: ProductType | null;
  qty: number;
}
interface ICartState {
  cart: ICartItem[];
}
const initialCartState = {
  product: {},
  qty: 0,
};

// ### Action Type
enum CartActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART",
}

interface ICartAction {
  type: CartActionType;
  payload?: ICartItem;
}

// ### Context Type
interface IContext {
  state: ICartState[];
  dispatch: Dispatch<ICartAction>;
}

// (REDUCER) - Cart Reducer
const CartReducer = (state: ICartState, action: ICartAction) => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      // if no item return
      if (!action.payload?.product || !action.payload.qty) return;
      let payload = action.payload;

      // check if item exist
      let existingItemIndex = state.cart.findIndex(
        (item) => item.product?.id === payload.product?.id
      );

      // if exist - only update qty
      if (existingItemIndex >= 0) {
        let updatedCart = state.cart.map((item) => {
          if (item.product?.id === payload.product?.id) {
            item.qty += payload.qty;
          }
          return item;
        });
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      }

    //

    default:
      return state;
  }
};

// (CONTEXT) - Cart Context
const CartContext = createContext<IContext>({
  state: [],
  dispatch: () => {},
});
