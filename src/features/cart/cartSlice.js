import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

const initialState = {
    user: "admin",
    updatedAt: Date.now().toLocaleString(),
    total: null,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const productInCart = state.items.find(item => item.id === action.payload.id);
            if (!productInCart) {
                state.items.push(action.payload);
            } else {
                state.items.map(item => {
                    if (item.id === action.payload.id) {
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }
            const total = calculate_total_price(state.items)
            state.total = total;
            state.updatedAt = new Date().toLocaleString()
        },
        removeItem: (state, action) => {
            const productInCart = state.items.find(item => item.id === action.payload.id);
            if (productInCart.quantity === 1) {
                state.items.pop(action.payload);
            } else {
                state.items.map(item => {
                    if (item.id === productInCart.id) {
                        item.quantity -= 1
                        return item;
                    }
                    return item;
                })
            }

            const total = calculate_total_price(state.items)
            state.total = total;
            state.updatedAt = new Date().toLocaleString()
        }
    }
})

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer