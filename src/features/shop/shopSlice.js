import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categorySelected: "",
    productFilteredCategory: [],
    productId: null
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categorySelected = action.payload
        },
        setProduct: (state, action) => {
            state.productId = action.payload
        }
    }
})

export const { setCategory, setProduct } = shopSlice.actions

export default shopSlice.reducer