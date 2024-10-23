'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react'


interface CartItem {
    productId: number
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (productId: number) => void
}


const CartContext = createContext({} as CartContextType)

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cartItem, setCartItems] = useState<CartItem[]>([])

    function addToCart (productId: number) {
        setCartItems(state => {
            const productInCart = state.some(item => item.productId === productId)

            if(productInCart){
                return state.map(item => {
                    if(item.productId === productId) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...state, {productId, quantity: 1}]
            }
        })

    }


    return (
        <CartContext.Provider value={{items: cartItem, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useContextCart = () => useContext(CartContext)