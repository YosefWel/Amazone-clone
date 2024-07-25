import React,{ createContext,useReducer} from "react";
import { initialState, reducer } from "../../Utility/reducer";
export const DataContext = createContext();
export const DataProvider = ({reducer,children, initialState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer,initialState)}>
{children}
        </DataContext.Provider>
    )
}