'use client'
import { useContextCart } from "@/contexts/car-context";
import React from "react";

export interface AddToCartButtonProps {
    productId: number
}

const AddToCartButton = ({productId}: AddToCartButtonProps) => {
    const {addToCart} = useContextCart()

    const handleAddProductToCart= () => {
        addToCart(productId)
    }


  return (
    <button
    onClick={handleAddProductToCart}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
};

export default AddToCartButton;
