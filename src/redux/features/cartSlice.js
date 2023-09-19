import { createSlice, configureStore, current } from "@reduxjs/toolkit";
import { staticGenerationBailout } from "next/dist/client/components/static-generation-bailout";
import { toast } from "react-toastify";

const initialState = {
  //if it doesn't have a data, make a []
  cartItem: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        console.log(current(state.cartItem));
        toast.info(`Increased ${state.cartItem[itemIndex].mealName} cart quantity`, {
          position: "top-center",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(tempProduct);
        toast.info(`${action.payload.mealName} added to cart`, {
          position: "top-center",
        });
      }
      //새로고침해도 저장되게 stitem메서드사용
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    decreasmentQuantity(state, action) {
      //adjust quantity from cart also when the item qty 1 and click the - then remove item
      const itemIndex = state.cartItem.findIndex((cartItem) => cartItem.id === action.payload.id);
      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.mealName} cart quantity`, {
          position: "top-center",
        });
      } else if (state.cartItem[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItem.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItem = nextCartItems;

        toast.error(`${action.payload.mealName} removed from cart`, {
          position: "top-center",
        });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      }
    },
    removeItem(state, action) {
      //필터 사용해서 거르려는 아이디랑 맞는거 삭제하고 업데이트
      const nextCartItems = state.cartItem.filter((cartItem) => cartItem.id !== action.payload.id);
      state.cartItem = nextCartItems;

      toast.error(`${action.payload.mealName} removed from cart`, {
        position: "top-center",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    initCart(state, action) {
      state.cartItem = [];
      toast.error("Removed all items from cart", {
        position: "top-center",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    updateTotals(state, action) {
      console.log(state.cartItem, "state.cartItem");
      let { total, quantity } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const { mealPrice, cartQuantity } = cartItem;
          const itemTotal = mealPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  decreasmentQuantity,
  removeItem,
  initCart,
  initDifferentResIdCart,
  updateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
