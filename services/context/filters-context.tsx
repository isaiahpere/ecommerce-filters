"use client";

import {
  useReducer,
  Dispatch,
  createContext,
  PropsWithChildren,
  FC,
  useContext,
} from "react";

// ### state Types
interface IState {
  byStock: boolean;
  byRating: number;
  searchQuery: string;
  sort: string;
}
const initialState = {
  byStock: false,
  byRating: 0,
  searchQuery: "",
  sort: "",
};

// ### Action Types
export enum ActionType {
  SORT_BY_PRICE = "SORT_BY_PRICE",
  FILTER_BY_STOCK = "FILTER_BY_STOCK",
  FILTER_BY_RATING = "FILTER_BY_RATING",
  FILTER_BY_SEARCH = "FILTER_BY_SEARCH",
  CLEAR_FILTERS = "CLEAR_FILTERS",
}
interface IAction {
  type: ActionType;
  payload?: {
    byStock?: boolean;
    byRating?: number;
    searchQuery?: string;
    sort?: string;
  };
}

// ### Context Types
interface IContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

// (REDUCER) - Filters Reducer
const FiltersReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.SORT_BY_PRICE:
      return {
        ...state,
        sort: action?.payload?.sort ?? state.sort,
      };
    case ActionType.FILTER_BY_STOCK:
      return {
        ...state,
        byStock: JSON.parse(String(action?.payload?.byStock)) ?? false,
      };
    case ActionType.FILTER_BY_RATING:
      return {
        ...state,
        byRating: action?.payload?.byRating ?? state.byRating,
      };
    case ActionType.FILTER_BY_SEARCH:
      return {
        ...state,
        searchQuery: action?.payload?.searchQuery ?? state.searchQuery,
      };
    case ActionType.CLEAR_FILTERS:
      return {
        ...state,
        ...initialState,
      };
    default:
      console.log("[YOU HIT FILTERS REDUCER DEFAULT]");
      return state;
  }
};

// (CONTEXT) - Filters context
const FiltersContext = createContext<IContext>({
  state: initialState,
  dispatch: () => {},
});

// (PROVIDER) - Filters provider
const FiltersContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(FiltersReducer, initialState);

  const value = { state, dispatch };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

const useFiltersContext = () => {
  return useContext(FiltersContext);
};

export { FiltersContextProvider, useFiltersContext };
