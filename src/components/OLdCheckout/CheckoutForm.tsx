"use client";

import { useReducer, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import ProgressIndicator from "./ProgressIndicator";
import { useCart } from "@/context/CartContext"; // ✅ Import CartContext

// ✅ Define State Shape
interface CheckoutState {
  step: number;
  customerInfo: { name: string; email: string; phone: string };
  shippingInfo: { address: string; city: string; postcode: string; country: string; shippingMethod: "standard" | "express" };
}

// ✅ Initial State
const initialState: CheckoutState = {
  step: 0,
  customerInfo: { name: "", email: "", phone: "" },
  shippingInfo: { address: "", city: "", postcode: "", country: "", shippingMethod: "standard" },
};

// ✅ Reducer Function
const checkoutReducer = (state: CheckoutState, action: any): CheckoutState => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "UPDATE_CUSTOMER":
      return { ...state, customerInfo: action.payload };
    case "UPDATE_SHIPPING":
      return { ...state, shippingInfo: action.payload };
    default:
      return state;
  }
};

const CheckoutForm = () => {
  const { cart } = useCart(); // ✅ Get cart from CartContext
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  // ✅ Auto-Save Customer Info to localStorage
  useEffect(() => {
    const savedCustomer = localStorage.getItem("customerInfo");
    if (savedCustomer) {
      dispatch({ type: "UPDATE_CUSTOMER", payload: JSON.parse(savedCustomer) });
    }
  }, []);

  useEffect(() => {
    if (state.customerInfo.name) {
      localStorage.setItem("customerInfo", JSON.stringify(state.customerInfo));
    }
  }, [state.customerInfo]);

  // ✅ Ensure `cartItems` have `id` as number before passing to StepThree
  const formattedCart = cart.map((item) => ({
    ...item,
    id: Number(item.id), // ✅ Convert ID to number
  }));

  // ✅ Calculate Total Amount (Includes Shipping)
  const totalAmount =
    formattedCart.reduce((total, item) => total + item.price * item.quantity, 0) +
    (state.shippingInfo.shippingMethod === "express" ? 7.99 : 3.99);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ✅ Progress Indicator (Fixed Top Spacing) */}
      <div className="w-full max-w-3xl px-4 mt-10">
        <ProgressIndicator currentStep={state.step + 1} />
      </div>

      {/* ✅ Checkout Steps Container - Matches UI */}
      <div className="w-full max-w-xl px-8 py-10 bg-white rounded-xl shadow-lg mt-8">
        {/* ✅ Render Steps */}
        {state.step === 0 && (
          <StepOne onNext={(data) => dispatch({ type: "UPDATE_CUSTOMER", payload: data })} />
        )}
        {state.step === 1 && (
          <StepTwo
            onNext={(data) => dispatch({ type: "UPDATE_SHIPPING", payload: data })}
            onBack={() => dispatch({ type: "PREV_STEP" })}
          />
        )}
        {state.step === 2 && (
          <StepThree
            customerInfo={state.customerInfo}
            shippingInfo={state.shippingInfo}
            cartItems={formattedCart} // ✅ Pass Fixed Cart Data
            onBack={() => dispatch({ type: "PREV_STEP" })}
            onNext={() => dispatch({ type: "NEXT_STEP" })}
          />
        )}
        {state.step === 3 && (
          <StepFour
            totalAmount={totalAmount}
            onBack={() => dispatch({ type: "PREV_STEP" })}
            onPayment={(method) => console.log("Payment via", method)}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;