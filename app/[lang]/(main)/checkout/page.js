import React from "react";
import CheckoutClient from "../../../CheckoutClient";
import { dictionary as ar } from "@/dictionaries/ar";
import { dictionary as en } from "@/dictionaries/en";

export default async function CheckoutPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const content = lang === "ar" ? ar.cart : en.cart;

  return <CheckoutClient content={content} lang={lang} />;
}
