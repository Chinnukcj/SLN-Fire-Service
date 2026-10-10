import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // Composite key: `${productId}-${capacityValue}`
  productId: string;
  name: string;
  capacityLabel: string;
  capacityValue: string;
  unitPrice: number;
  quantity: number;
  fireClass: string;
  standard: string;
  category: 'extinguisher' | 'refilling' | 'equipment';
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  grandTotal: number;
  totalUnits: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'sln_fire_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Default initial demonstration item so user sees immediate cart utility
    return [
      {
        id: 'abc-powder-4kg',
        productId: 'abc-powder',
        name: 'ABC Multipurpose Powder',
        capacityLabel: '4 KG',
        capacityValue: '4kg',
        unitPrice: 1650,
        quantity: 2,
        fireClass: 'ABC',
        standard: 'IS: 15683 / BIS Certified',
        category: 'extinguisher'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const addItem = (itemData: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    const id = `${itemData.productId}-${itemData.capacityValue}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...prev, { ...itemData, id, quantity }];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const gstRate = 0.18; // 18% GST as requested
  const gstAmount = Math.round(subtotal * gstRate);
  const cgstAmount = Math.round(subtotal * 0.09);
  const sgstAmount = Math.round(subtotal * 0.09);
  const grandTotal = subtotal + gstAmount;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        gstRate,
        gstAmount,
        cgstAmount,
        sgstAmount,
        grandTotal,
        totalUnits,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
