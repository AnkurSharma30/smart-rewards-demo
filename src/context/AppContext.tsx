import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stage, UserState, Product, RewardItem, RedeemedRewardItem, PurchaseHistoryItem } from '../types';
import { PRODUCTS, REWARDS_ITEMS } from '../data';

interface AppContextType {
  state: UserState;
  setStage: (stage: Stage) => void;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  buyProduct: (product: Product) => void;
  redeemReward: (reward: RewardItem) => boolean;
  executeMarketplacePurchase: (
    item: any,
    type: 'product' | 'flight' | 'hotel' | 'giftcard',
    paymentMethod: 'cash' | 'points_pay'
  ) => boolean;
  viewProduct: (id: string) => void;
  resetPrototype: () => void;
  celebrationActive: boolean;
  setCelebrationActive: (active: boolean) => void;
  lastPointsChange: { from: number; to: number } | null;
}

const initialUserState: UserState = {
  stage: Stage.NEW_USER,
  rewardBalance: 0,
  tier: 'Standard',
  wishlist: [],
  purchasedProductIds: [],
  redeemedHistory: [],
  purchaseHistory: [],
  recentlyViewed: [],
  savedInterests: [],
  notificationPreferences: {
    email: true,
    push: true,
    offers: false
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('smart_rewards_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure valid enum/structure
        if (parsed.stage) return parsed;
      } catch (e) {
        console.error('Error parsing saved state', e);
      }
    }
    return initialUserState;
  });

  const [celebrationActive, setCelebrationActive] = useState(false);
  const [lastPointsChange, setLastPointsChange] = useState<{ from: number; to: number } | null>(null);

  // Save state on change
  useEffect(() => {
    localStorage.setItem('smart_rewards_state', JSON.stringify(state));
  }, [state]);

  const setStage = (newStage: Stage) => {
    setState((prev) => {
      let balance = prev.rewardBalance;
      let tier = prev.tier;
      let savedInterests = [...prev.savedInterests];

      // Auto-populate some values when evaluator jumps stages
      if (newStage === Stage.NEW_USER) {
        balance = 0;
        tier = 'Standard';
        savedInterests = [];
      } else if (newStage === Stage.BROWSING) {
        balance = 2500;
        tier = 'Standard';
        if (!savedInterests.includes('Electronics')) {
          savedInterests.push('Electronics');
        }
      } else if (newStage === Stage.FIRST_PURCHASE) {
        balance = 8500;
        tier = 'Standard';
        if (!savedInterests.includes('Electronics')) {
          savedInterests.push('Electronics');
        }
        // Ensure recently viewed has something
        const defaultView = prev.recentlyViewed.length > 0 ? prev.recentlyViewed : ['elec-headphones', 'elec-watch'];
        return {
          ...prev,
          stage: newStage,
          rewardBalance: balance,
          tier,
          savedInterests,
          recentlyViewed: defaultView
        };
      } else if (newStage === Stage.LOYAL_CUSTOMER) {
        balance = 58000;
        tier = 'Gold Member';
        if (!savedInterests.includes('Electronics')) savedInterests.push('Electronics');
        if (!savedInterests.includes('Travel')) savedInterests.push('Travel');
        
        // Populate some history for authentic premium look
        const defaultPurchases: PurchaseHistoryItem[] = prev.purchaseHistory.length > 0 ? prev.purchaseHistory : [
          {
            id: 'p-1',
            productId: 'elec-headphones',
            productName: 'Apple AirPods Max (Imagine Store Exclusive)',
            pointsEarned: 1250,
            date: '2026-07-02',
            image: PRODUCTS[0].image
          },
          {
            id: 'p-2',
            productId: 'fash-sneakers',
            productName: 'Saint Frisk Handcrafted Calfskin Loafers',
            pointsEarned: 850,
            date: '2026-06-15',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
          }
        ];

        const defaultRedeemed: RedeemedRewardItem[] = prev.redeemedHistory.length > 0 ? prev.redeemedHistory : [
          {
            id: 'r-1',
            rewardId: 'rew-amazon',
            rewardName: 'Amazon Pay India Instant Gift Voucher (₹5,000)',
            pointsSpent: 5000,
            date: '2026-07-10',
            couponCode: 'AMZN-SR-7739-GOLD'
          }
        ];

        return {
          ...prev,
          stage: newStage,
          rewardBalance: balance,
          tier,
          savedInterests,
          purchaseHistory: defaultPurchases,
          redeemedHistory: defaultRedeemed
        };
      }

      return {
        ...prev,
        stage: newStage,
        rewardBalance: balance,
        tier,
        savedInterests
      };
    });
  };

  const addToWishlist = (id: string) => {
    setState((prev) => {
      if (prev.wishlist.includes(id)) return prev;
      return { ...prev, wishlist: [...prev.wishlist, id] };
    });
  };

  const removeFromWishlist = (id: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((itemId) => itemId !== id)
    }));
  };

  const isInWishlist = (id: string) => {
    return state.wishlist.includes(id);
  };

  const buyProduct = (product: Product) => {
    const pointsToEarn = 1250; // Standard reward purchase animation target: 1250 points
    const currentPoints = state.rewardBalance;
    const targetPoints = currentPoints + pointsToEarn;

    setLastPointsChange({ from: currentPoints, to: targetPoints });
    setCelebrationActive(true);

    setState((prev) => {
      const isFirst = prev.purchasedProductIds.length === 0;
      const updatedPurchased = [...prev.purchasedProductIds, product.id];
      const newStage = isFirst && prev.stage === Stage.BROWSING ? Stage.FIRST_PURCHASE : prev.stage;
      
      const newPurchase: PurchaseHistoryItem = {
        id: `p-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        pointsEarned: pointsToEarn,
        date: new Date().toISOString().split('T')[0],
        image: product.image
      };

      // Add category to interests automatically
      const updatedInterests = prev.savedInterests.includes(product.category)
        ? prev.savedInterests
        : [...prev.savedInterests, product.category];

      return {
        ...prev,
        rewardBalance: targetPoints,
        purchasedProductIds: updatedPurchased,
        purchaseHistory: [newPurchase, ...prev.purchaseHistory],
        savedInterests: updatedInterests,
        stage: newStage // Automatically transition to Stage 3 if this is their first purchase
      };
    });
  };

  const redeemReward = (reward: RewardItem): boolean => {
    if (state.rewardBalance < reward.pointsRequired) {
      return false;
    }

    const currentPoints = state.rewardBalance;
    const targetPoints = currentPoints - reward.pointsRequired;

    setLastPointsChange({ from: currentPoints, to: targetPoints });
    setCelebrationActive(true);

    setState((prev) => {
      const generatedCode = `${reward.id.slice(4).toUpperCase()}-SR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRedemption: RedeemedRewardItem = {
        id: `r-${Date.now()}`,
        rewardId: reward.id,
        rewardName: reward.name,
        pointsSpent: reward.pointsRequired,
        date: new Date().toISOString().split('T')[0],
        couponCode: generatedCode
      };

      return {
        ...prev,
        rewardBalance: targetPoints,
        redeemedHistory: [newRedemption, ...prev.redeemedHistory]
      };
    });

    return true;
  };

  const executeMarketplacePurchase = (
    item: any,
    type: 'product' | 'flight' | 'hotel' | 'giftcard',
    paymentMethod: 'cash' | 'points_pay'
  ): boolean => {
    let cashPrice = item.priceValue || 5000;
    let pointsRequired = item.pointsRequired || 5000;
    
    if (type === 'giftcard') {
      let faceValue = item.pointsRequired;
      if (item.id === 'rew-amazon') faceValue = 5000;
      if (item.id === 'rew-movie') faceValue = 2500;
      if (item.id === 'rew-lounge') faceValue = 4000;
      if (item.id === 'rew-travel') faceValue = 15000;
      if (item.id === 'rew-dining') faceValue = 10000;
      cashPrice = faceValue;
      pointsRequired = Math.round((faceValue * 0.70) / 0.25);
    } else if (type === 'product') {
      pointsRequired = Math.round((item.priceValue * 0.70) / 0.25);
    } else if (type === 'flight' || type === 'hotel') {
      pointsRequired = Math.round(item.priceValue * 0.70);
    }

    const currentPoints = state.rewardBalance;
    let targetPoints = currentPoints;
    let pointsEarned = 0;
    let pointsSpent = 0;

    if (paymentMethod === 'cash') {
      let earningRate = 0.03;
      if (type === 'giftcard') earningRate = 0.05;
      if (type === 'flight' || type === 'hotel') earningRate = 0.10;
      pointsEarned = Math.round(cashPrice * earningRate);
      targetPoints = currentPoints + pointsEarned;
    } else {
      if (currentPoints < pointsRequired) {
        return false;
      }
      pointsSpent = pointsRequired;
      const coPayCash = cashPrice * 0.30;
      let earningRate = 0.03;
      if (type === 'giftcard') earningRate = 0.05;
      if (type === 'flight' || type === 'hotel') earningRate = 0.10;
      pointsEarned = Math.round(coPayCash * earningRate);
      targetPoints = currentPoints - pointsSpent + pointsEarned;
    }

    setLastPointsChange({ from: currentPoints, to: targetPoints });
    setCelebrationActive(true);

    setState((prev) => {
      const isFirst = prev.purchasedProductIds.length === 0;
      const isProduct = type === 'product';
      const updatedPurchased = isProduct ? [...prev.purchasedProductIds, item.id] : prev.purchasedProductIds;
      const newStage = isFirst && prev.stage === Stage.BROWSING && isProduct ? Stage.FIRST_PURCHASE : prev.stage;

      const purchaseId = `p-${Date.now()}`;
      
      const newPurchase: PurchaseHistoryItem = {
        id: purchaseId,
        productId: item.id,
        productName: item.name,
        pointsEarned: pointsEarned,
        date: new Date().toISOString().split('T')[0],
        image: item.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
      };

      let updatedRedeemed = prev.redeemedHistory;
      if (pointsSpent > 0) {
        const generatedCode = `${item.id.slice(0, 4).toUpperCase()}-SR-${Math.floor(1000 + Math.random() * 9000)}`;
        const newRedemption: RedeemedRewardItem = {
          id: `r-${Date.now()}`,
          rewardId: item.id,
          rewardName: item.name,
          pointsSpent: pointsSpent,
          date: new Date().toISOString().split('T')[0],
          couponCode: generatedCode
        };
        updatedRedeemed = [newRedemption, ...prev.redeemedHistory];
      }

      const itemCategory = item.category || 'Travel';
      const updatedInterests = prev.savedInterests.includes(itemCategory)
        ? prev.savedInterests
        : [...prev.savedInterests, itemCategory];

      return {
        ...prev,
        rewardBalance: targetPoints,
        purchasedProductIds: updatedPurchased,
        purchaseHistory: [newPurchase, ...prev.purchaseHistory],
        redeemedHistory: updatedRedeemed,
        savedInterests: updatedInterests,
        stage: newStage
      };
    });

    return true;
  };

  const viewProduct = (id: string) => {
    setState((prev) => {
      // Remove if already in recently viewed to place it on top
      const filtered = prev.recentlyViewed.filter((vid) => vid !== id);
      const updated = [id, ...filtered].slice(0, 6); // Keep top 6

      // Automatically elevate Stage 1 (New User) to Stage 2 (Browsing) when they click/view a product
      const nextStage = prev.stage === Stage.NEW_USER ? Stage.BROWSING : prev.stage;

      // Find product category and add to saved interests dynamically
      const product = PRODUCTS.find((p) => p.id === id);
      let updatedInterests = prev.savedInterests;
      if (product && !prev.savedInterests.includes(product.category)) {
        updatedInterests = [...prev.savedInterests, product.category];
      }

      return {
        ...prev,
        recentlyViewed: updated,
        stage: nextStage,
        savedInterests: updatedInterests
      };
    });
  };

  const resetPrototype = () => {
    setState(initialUserState);
    setLastPointsChange(null);
    setCelebrationActive(false);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setStage,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        buyProduct,
        redeemReward,
        executeMarketplacePurchase,
        viewProduct,
        resetPrototype,
        celebrationActive,
        setCelebrationActive,
        lastPointsChange
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
