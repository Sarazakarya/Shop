import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        totalPrice: 0,
        totalAmount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, price, thumbnail } = action.payload;
            const existingProductIndex = state.cartProducts.findIndex(product =>
                product.id === id && product.price === price && product.thumbnail === thumbnail
            );

            if (existingProductIndex !== -1) {
                state.cartProducts[existingProductIndex].amount++;
                state.cartProducts[existingProductIndex].totalPrice += price;
            } else {
                state.cartProducts.push({
                    ...action.payload,
                    amount: 1,
                    totalPrice: price
                });
            }
            state.totalAmount++;
            state.totalPrice += price;
        },

        removeitem: (state, action) => {
            try {
                const productToRemove = action.payload;
                const { id, price, thumbnail } = productToRemove;
                const existingProductIndex = state.cartProducts.findIndex(product =>
                    product.id === id && product.price === price && product.thumbnail === thumbnail
                );

                if (existingProductIndex !== -1) {
                    const existingProduct = state.cartProducts[existingProductIndex];
                    if (existingProduct.amount === 1) {
                        state.cartProducts.splice(existingProductIndex, 1);
                    } else {
                        existingProduct.amount--;
                        existingProduct.totalPrice -= price;
                    }
                    state.totalAmount--;
                    state.totalPrice -= price;
                } else {
                    console.log("Product not found in cart:", productToRemove);
                }


            }
            catch (error) {
                console.log(error)
            }


        },
        romoveFromCart: (state, action) => {
            try {
                const productToRemove = action.payload;
                const { id, price, thumbnail } = productToRemove;
                const existingProductIndex = state.cartProducts.findIndex(product =>
                    product.id === id && product.price === price && product.thumbnail === thumbnail
                );
                state.cartProducts.splice(existingProductIndex, 1);
            }

            catch (error) {
                console.log(error)
            }


        }

    }
});


export const { addToCart, removeitem, romoveFromCart } = cartSlice.actions;

export default cartSlice.reducer;
