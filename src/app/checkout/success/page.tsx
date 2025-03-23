"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faShoppingCart,
  faDownload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "N/A";
  const name = searchParams.get("name") || "Customer";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const address = searchParams.get("address") || "";
  const city = searchParams.get("city") || "";
  const postcode = searchParams.get("postcode") || "";
  const shippingCost = parseFloat(searchParams.get("shippingCost") || "0");
  const total = parseFloat(searchParams.get("total") || "0");
  const cartItemsRaw = searchParams.get("cartItems") || "[]";

  const [orderSaved, setOrderSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(cartItemsRaw));
        const ordersRef = collection(db, "orders");
        const existingQuery = query(ordersRef, where("orderId", "==", orderId));
        const snapshot = await getDocs(existingQuery);

        if (!snapshot.empty) {
          console.warn("⚠️ Order already exists. Skipping save.");
          setOrderSaved(true);
          setLoading(false);
          return;
        }

        const orderData = {
          orderId,
          customer: { name, email, phone },
          shipping: { address, city, postcode, shippingCost },
          total,
          cartItems: parsedItems,
          paymentStatus: "Paid",
          createdAt: serverTimestamp(),
        };

        await addDoc(ordersRef, orderData);
        console.log("✅ Order saved to Firestore.");
        setOrderSaved(true);
      } catch (error) {
        console.error("❌ Error saving order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!orderSaved && cartItemsRaw) {
      saveOrder();
    }
  }, [
    orderSaved,
    cartItemsRaw,
    orderId,
    name,
    email,
    phone,
    address,
    city,
    postcode,
    shippingCost,
    total,
  ]);

  const pdfDownloadLink = `/api/pdf?${new URLSearchParams({
    orderId,
    name,
    email,
    phone,
    address,
    city,
    postcode,
    shippingCost: shippingCost.toString(),
    total: total.toString(),
    cartItems: encodeURIComponent(cartItemsRaw),
  }).toString()}`;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-10 rounded-lg text-center max-w-lg border border-gray-200 w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-primary"
        >
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl" />
        </motion.div>

        <h1 className="text-3xl font-bold text-primary mt-4">
          Thank You for Your <span className="text-gold">Order</span>
        </h1>

        <p className="text-gray-600 mt-3">
          A confirmation email has been sent to{" "}
          <span className="font-semibold text-primary">{email}</span>.
        </p>

        {loading ? (
          <div className="flex items-center justify-center mt-4">
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin text-primary text-2xl"
            />
            <p className="ml-2 text-primary font-semibold">Saving your order...</p>
          </div>
        ) : (
          <>
            <div className="border-t border-gray-300 my-6" />

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <a
                href={pdfDownloadLink}
                download
                className="w-full sm:w-auto px-6 py-3 bg-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Receipt
              </a>

              <Link href="/shop">
                <button className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition hover:text-white">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Back to Shop
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SuccessPage;