import { createStore } from 'vuex';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  selectedSize?: string;
  selectedOption?: string;
  quantity: number;
}

export default createStore({
  state: {
    cart: [] as CartItem[],
  },
  getters: {
    cartItems: (state) => state.cart,
    totalPrice: (state) => 
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    totalCartItems: (state) =>
      state.cart.reduce((total, item) => total + item.quantity, 0), // Total quantity of items in the cart
  },
  mutations: {
    ADD_TO_CART(state, item: CartItem) {
      console.log('ADD_TO_CART called with item:', item);
      const existingItem = state.cart.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    INCREASE_QUANTITY(state, itemId: number) {
      console.log('INCREASE_QUANTITY called with itemId:', itemId);
      const item = state.cart.find((i) => i.productId === itemId);
      if (item) {
        console.log('Item found:', item);
        item.quantity += 1;
      } else {
        console.log('Item not found in cart');
      }
    },
    DECREASE_QUANTITY(state, itemId: number) {
      console.log('DECREASE_QUANTITY called with itemId:', itemId);
      const item = state.cart.find((i) => i.productId === itemId);
      if (item && item.quantity > 1) {
        console.log('Item found:', item);
        item.quantity -= 1;
      } else {
        console.log('Item not found or quantity is already 1');
      }
    },
    REMOVE_ITEM(state, itemId: number) {
      state.cart = state.cart.filter((item) => item.productId !== itemId);
    },
  },
  actions: {
    addToCart({ commit }, item: CartItem) {
      commit('ADD_TO_CART', item);
    },
    increaseQuantity({ commit }, itemId: number) {
      commit('INCREASE_QUANTITY', itemId);
    },
    decreaseQuantity({ commit }, itemId: number) {
      commit('DECREASE_QUANTITY', itemId);
    },
    removeItem({ commit }, itemId: number) {
      commit('REMOVE_ITEM', itemId);
    },
  },
});
