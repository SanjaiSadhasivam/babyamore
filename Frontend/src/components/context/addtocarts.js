import { createContext, useContext, useReducer } from "react"
import reducer from "../Reducer/reducer";
const addtocart = createContext();
const initialstate = {
    cart: [],
}
const AddtoCartProvider = ({ childern }) => {
    const [state, dispatch] = useReducer(reducer, initialstate);

    const addtoCartFunction = (product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        })
    }
    return <addtocart.Provider value={{ ...state }}>{childern}</addtocart.Provider>
}


export const useGloabalCart = () => {
    return useContext(addtocart)
}
export default AddtoCartProvider;
