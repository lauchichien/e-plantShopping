
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItem: (state, action) => {
            const product = action.payload;

            const existingItem = state.items.find(
                (item) => item.name === product.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                });
            }
        },

        removeItem: (state, action) => {
            const name =
                typeof action.payload === 'string'
                    ? action.payload
                    : action.payload.name;

            state.items = state.items.filter(
                (item) => item.name !== name
            );
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;

            const itemToUpdate = state.items.find(
                (item) => item.name === name
            );

            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
        },
    },
});

export const {
    addItem,
    removeItem,
    updateQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
