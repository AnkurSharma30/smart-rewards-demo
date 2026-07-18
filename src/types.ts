export enum Stage {
  NEW_USER = 'Stage 1: New User',
  BROWSING = 'Stage 2: Browsing',
  FIRST_PURCHASE = 'Stage 3: First Purchase',
  LOYAL_CUSTOMER = 'Stage 4: Loyal Customer'
}

export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Travel' | 'Fashion' | 'Lifestyle' | 'Gift Cards';
  pointsRequired: number;
  priceValue: number;
  image: string;
  description: string;
  tags: string[];
  features: string[];
  isPremium?: boolean; // For Stage 4 Gold Members
}

export interface RewardItem {
  id: string;
  name: string;
  provider: string;
  pointsRequired: number;
  image: string;
  description: string;
  category: 'voucher' | 'travel' | 'lifestyle' | 'entertainment';
  isPremiumOnly?: boolean;
}

export interface PurchaseHistoryItem {
  id: string;
  productId: string;
  productName: string;
  pointsEarned: number;
  date: string;
  image: string;
}

export interface RedeemedRewardItem {
  id: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  date: string;
  couponCode: string;
}

export interface UserState {
  stage: Stage;
  rewardBalance: number;
  tier: 'Standard' | 'Gold Member';
  wishlist: string[]; // Product or Reward IDs
  purchasedProductIds: string[];
  redeemedHistory: RedeemedRewardItem[];
  purchaseHistory: PurchaseHistoryItem[];
  recentlyViewed: string[]; // Product IDs
  savedInterests: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    offers: boolean;
  };
}
