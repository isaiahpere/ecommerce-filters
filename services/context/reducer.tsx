// import { ProductType } from "@/app/types";
// import { IAction, IAppState, initialState } from "./shopping-cart-context";

// enum actionType {
//   FETCH_PRODUCTS = "FETCH_PRODUCTS",
// }
// export type CartAction = { type: actionType; payload: ProductType[] };

// export type cartReducerType = { state: IAppState; action: IAction };

// export const shoppingCartReducer = (
//   state: ProductType[],
//   action: CartAction
// ): typeof initialState => {
//   switch (actionType.FETCH_PRODUCTS) {
//     case "FETCH_PRODUCTS":
//       console.log("Action");
//       console.log(action);
//       return {
//         ...state,
//         products: action.payload,
//       };
//     default:
//       return state;
//   }
// };
