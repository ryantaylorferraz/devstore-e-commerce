"use client";

import { useContextCart } from "@/contexts/car-context";
import { ShoppingBag } from "lucide-react";
import React from "react";

const CartWidget = () => {
  const { items } = useContextCart();

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="h-4 w-4" />
      <span className="text-sm">Cart ({items.length})</span>
    </div>
  );
};

export default CartWidget;
