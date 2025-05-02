"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface ShippingDetails {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  type: "card" | "paypal";
}

interface CheckoutContextProps {
  activeStep: number;
  customerInfo: CustomerInfo;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
  goNext: () => void;
  goBack: () => void;
  updateCustomerInfo: (info: CustomerInfo) => void;
  updateShippingDetails: (details: ShippingDetails) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
}

const CheckoutContext = createContext<CheckoutContextProps | null>(null);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside CheckoutProvider");
  return context;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
  });

  const goNext = () => setActiveStep((prev) => prev + 1);
  const goBack = () => setActiveStep((prev) => prev - 1);

  return (
    <CheckoutContext.Provider
      value={{
        activeStep,
        customerInfo,
        shippingDetails,
        paymentMethod,
        goNext,
        goBack,
        updateCustomerInfo: setCustomerInfo,
        updateShippingDetails: setShippingDetails,
        updatePaymentMethod: setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};