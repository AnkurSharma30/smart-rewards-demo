import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { 
  Heart, ShoppingBag, ShieldCheck, RefreshCw, ChevronLeft, ArrowLeft, Star, Sparkles, AlertCircle, CheckCircle2, Ticket, X, Coins, CreditCard
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    state, addToWishlist, removeFromWishlist, isInWishlist, executeMarketplacePurchase 
  } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs'>('details');

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'points_pay'>('cash');
  const [checkoutSuccess, setCheckoutSuccess] = useState<any | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const found = PRODUCTS.find((p) => p.id === id);
      if (found) {
        setProduct(found);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mb-4 animate-bounce" />
        <h2 className="text-lg font-display font-bold text-slate-900">Product Not Found</h2>
        <button
          onClick={() => navigate('/explore')}
          className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-2xl text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const pointsRequired = Math.round((product.priceValue * 0.70) / 0.25);
  const canRedeemPointsPay = state.rewardBalance >= pointsRequired;

  const handleOpenCheckout = (method: 'cash' | 'points_pay') => {
    setPaymentMethod(method);
    setShowCheckout(true);
    setCheckoutSuccess(null);
    setCheckoutError(null);
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    setCheckoutError(null);
    
    if (paymentMethod === 'points_pay' && state.rewardBalance < pointsRequired) {
      setCheckoutError(`Insufficient points. You need ${pointsRequired - state.rewardBalance} more points for Points + Pay.`);
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      const success = executeMarketplacePurchase(product, 'product', paymentMethod);
      setIsProcessing(false);
      if (success) {
        const cashPaid = paymentMethod === 'points_pay' ? Math.round(product.priceValue * 0.30) : product.priceValue;
        const ptsSpent = paymentMethod === 'points_pay' ? pointsRequired : 0;
        const ptsEarned = paymentMethod === 'points_pay' 
          ? Math.round((product.priceValue * 0.30) * 0.03)
          : Math.round(product.priceValue * 0.03);

        setCheckoutSuccess({
          code: `CONF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          cashPaid,
          pointsRequired: ptsSpent,
          pointsEarned: ptsEarned,
          paymentMethod
        });
      } else {
        setCheckoutError('Transaction failed. Please check your active balance.');
      }
    }, 1500);
  };

  const handleWishlistToggle = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  // Find related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && (!p.isPremium || state.tier === 'Gold Member')
  ).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen bg-brand-bg pb-28 font-sans text-slate-900 select-none relative"
    >
      
      {/* Absolute top action buttons */}
      <div className="absolute top-5 left-6 right-6 z-20 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="h-10 w-10 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 flex items-center justify-center text-slate-700 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleWishlistToggle}
          className={`h-10 w-10 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isFavorited ? 'text-rose-500' : 'text-slate-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Hero Large Image Section */}
      <div className="relative w-full aspect-square sm:aspect-video bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        
        {/* Category badge */}
        <div className="absolute bottom-5 left-6 z-10 flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase text-slate-800 tracking-wider shadow-xs">
            {product.category}
          </span>
          <span className="px-3 py-1 bg-[#5B3DF5] text-white rounded-full text-[10px] font-mono font-black tracking-widest uppercase shadow-xs">
            POWERED BY SHOPSTACC
          </span>
          {product.isPremium && (
            <span className="px-3 py-1 bg-slate-950 text-amber-400 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
              GOLD MEMBER SELECTION
            </span>
          )}
        </div>
      </div>

      {/* Product Content Body */}
      <div className="px-6 py-6 -mt-4 bg-white rounded-t-3xl relative z-10 shadow-lg border-t border-slate-100/40">
        
        {/* Points Display & Name */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-display font-black tracking-tight text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-[11px] text-slate-400 mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 font-sans">
              <span>Retail Value: ₹{product.priceValue.toLocaleString('en-IN')}</span>
              <span className="hidden sm:inline-block text-slate-300">•</span>
              <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                Earn +{Math.round(product.priceValue * 0.03).toLocaleString()} Points on Card Pay
              </span>
            </p>
          </div>
          
          <div className="bg-indigo-50/50 border border-indigo-100/80 px-4 py-2.5 rounded-2xl flex flex-col items-end flex-none">
            <span className="text-[8px] font-mono text-slate-400 font-black uppercase tracking-wider leading-none">POINTS + PAY</span>
            <span className="text-sm font-display font-black text-primary mt-1.5 leading-none">{pointsRequired.toLocaleString()} pts</span>
            <span className="text-[9px] text-slate-500 font-extrabold font-mono mt-1 leading-none">+ ₹{Math.round(product.priceValue * 0.30).toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-4 border-b border-slate-100 mt-6 pb-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 text-xs font-display font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-slate-400'
            }`}
          >
            Product Story
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-xs font-display font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-slate-400'
            }`}
          >
            Key Highlights
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'details' ? (
            <p className="text-xs text-slate-500 font-sans leading-relaxed font-medium">
              {product.description}
            </p>
          ) : (
            <ul className="space-y-2.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-sans font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Brand Guarantee Bar */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#F8F9FC] rounded-2xl text-slate-700 border border-slate-100">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-900 uppercase tracking-wide">Authentic Catalog</span>
              <span className="block text-[8px] text-slate-400 font-medium">Official premium warranty</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#F8F9FC] rounded-2xl text-slate-700 border border-slate-100">
              <RefreshCw className="w-4 h-4 animate-spin-slow stroke-[2.5]" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-900 uppercase tracking-wide">Instantly Credited</span>
              <span className="block text-[8px] text-slate-400 font-medium font-sans">Zero wait reward tracking</span>
            </div>
          </div>
        </div>

        {/* Related Products carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-slate-400 mb-4">
              Related Recommendations
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {relatedProducts.map((p) => {
                const relPointsRequired = Math.round((p.priceValue * 0.70) / 0.25);
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#F8F9FC] rounded-3xl p-3 border border-gray-100 hover:scale-102 transition-all cursor-pointer text-center flex flex-col justify-between"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-square object-cover rounded-2xl mb-2"
                    />
                    <div>
                      <h4 className="text-[10px] font-display font-black text-slate-900 line-clamp-1 leading-tight">{p.name}</h4>
                      <span className="text-[9.5px] text-slate-900 font-bold block mt-0.5">₹{p.priceValue.toLocaleString('en-IN')}</span>
                      <span className="text-[8px] text-primary font-mono font-black mt-0.5 block uppercase tracking-wider">
                        Points + Pay
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Sticky Action Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100/80 p-5 px-6 z-40 flex gap-4 items-center shadow-2xl rounded-b-[36px]">
        <div className="flex-1">
          <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold tracking-wider">Retail Value</span>
          <span className="text-xl font-display font-black text-slate-900 leading-none">
            ₹{product.priceValue.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Dual Actions - Standard Card Pay OR Points + Pay */}
        <div className="flex gap-2.5">
          {/* Card Pay Button */}
          <button
            onClick={() => handleOpenCheckout('cash')}
            disabled={isProcessing}
            className="px-5 py-3.5 bg-slate-900 text-white rounded-3xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-slate-900/10 disabled:opacity-55"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Card Pay</span>
          </button>

          {/* Points + Pay Button */}
          <button
            onClick={() => handleOpenCheckout('points_pay')}
            disabled={isProcessing}
            className={`px-5 py-3.5 rounded-3xl font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              canRedeemPointsPay
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 hover:bg-opacity-95'
                : 'bg-slate-50 border-slate-250 text-slate-400'
            } disabled:opacity-55`}
          >
            <span>Points + Pay</span>
          </button>
        </div>
      </div>

      {/* HIGH-FIDELITY INTERACTIVE CHECKOUT SHEET OVERLAY */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white w-full sm:max-w-md rounded-t-[36px] sm:rounded-[36px] p-6 max-h-[90vh] overflow-y-auto space-y-5 border-t sm:border border-slate-100 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-display font-black uppercase text-slate-900 tracking-tight">
                {checkoutSuccess ? 'Checkout Complete!' : 'Select Payment Method'}
              </h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {checkoutSuccess ? (
              /* SUCCESS STATE */
              <div className="space-y-4 pt-1">
                {/* Confetti Micro Info */}
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl text-center space-y-1">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-xs font-display font-black text-emerald-800 uppercase tracking-wider mt-1.5">Purchase Authorized</h4>
                  <p className="text-[10px] text-emerald-600 font-sans font-medium leading-relaxed mt-0.5">
                    {checkoutSuccess.paymentMethod === 'points_pay'
                      ? `Redeemed ${checkoutSuccess.pointsRequired.toLocaleString()} Pts. Cash co-pay of ₹${checkoutSuccess.cashPaid.toLocaleString('en-IN')} processed.`
                      : `Charged ₹${checkoutSuccess.cashPaid.toLocaleString('en-IN')} to Credit Card. No points deducted.`}
                  </p>
                </div>

                {/* Voucher Layout */}
                <div className="bg-slate-950 text-white p-5 rounded-3xl border border-white/10 relative overflow-hidden space-y-3 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-4.5 h-4.5 text-amber-400" />
                      <span className="font-display font-black text-[10px] tracking-widest uppercase">EON VOUCHER PASS</span>
                    </div>
                    <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">{checkoutSuccess.code}</span>
                  </div>

                  <div>
                    <h4 className="font-display font-black text-sm text-white tracking-tight leading-snug">{product.name}</h4>
                    <p className="text-[9px] text-slate-400 font-medium font-sans leading-relaxed mt-1">Full-value electronic redemption voucher confirmed and registered under your profile.</p>
                  </div>

                  <div className="border-t border-dashed border-white/15 pt-3 flex justify-between items-center">
                    <div>
                      <span className="text-[8px] text-slate-500 font-mono block uppercase leading-none font-bold">TRANSACTION SUMMARY</span>
                      <div className="flex items-center gap-2 mt-1">
                        {checkoutSuccess.pointsRequired > 0 && (
                          <span className="font-display font-black text-rose-400 text-xs">-${checkoutSuccess.pointsRequired.toLocaleString()} pts</span>
                        )}
                        <span className="font-display font-black text-white text-xs">Paid: ₹{checkoutSuccess.cashPaid.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold block mt-1.5">Earned +{checkoutSuccess.pointsEarned.toLocaleString()} Pts back!</span>
                    </div>
                    <button
                      onClick={() => {
                        setShowCheckout(false);
                        navigate('/home');
                      }}
                      className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-[9px] font-display font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* IN-REVIEW STATE */
              <div className="space-y-5">
                {/* Product Details Panel */}
                <div className="flex gap-4 bg-slate-50 border border-slate-100 p-4 rounded-3xl">
                  <div className="h-16 w-16 rounded-xl overflow-hidden flex-none bg-slate-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] font-mono font-black text-primary uppercase bg-indigo-50 px-2 py-0.5 rounded-md leading-none">
                      {product.category}
                    </span>
                    <h4 className="font-display font-black text-xs text-slate-900 mt-1.5 leading-snug truncate">
                      {product.name}
                    </h4>
                    <p className="text-[9.5px] text-slate-400 font-medium leading-relaxed mt-0.5 truncate">
                      Retail Price: ₹{product.priceValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* INTERACTIVE PAYMENT METHOD SELECTION */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">CHOOSE PAYMENT COMBINATION</span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Option 1: 100% Cash / Credit Card */}
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        paymentMethod === 'cash'
                          ? 'border-primary bg-indigo-50/40 ring-1 ring-primary/25'
                          : 'border-slate-100 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <span className="font-display font-black text-xs text-slate-950 block">Standard Pay (100% Cash / Card)</span>
                        <span className="text-[9.5px] text-slate-500 font-medium mt-0.5 block">Charge full cost to credit card & maximize loyalty accruals</span>
                        <span className="text-[9.5px] font-bold text-emerald-600 block mt-1 uppercase tracking-wider font-mono">
                          Earn +{Math.round(product.priceValue * 0.03).toLocaleString()} Pts (Accelerated!)
                        </span>
                      </div>
                      <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center flex-none ml-2 border-slate-350">
                        {paymentMethod === 'cash' && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>

                    {/* Option 2: Points + Pay (Hybrid) */}
                    <button
                      onClick={() => {
                        if (canRedeemPointsPay) {
                          setPaymentMethod('points_pay');
                        }
                      }}
                      disabled={!canRedeemPointsPay}
                      className={`p-4 rounded-3xl border text-left flex justify-between items-center transition-all relative overflow-hidden ${
                        !canRedeemPointsPay ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100' : 'cursor-pointer'
                      } ${
                        paymentMethod === 'points_pay' && canRedeemPointsPay
                          ? 'border-primary bg-indigo-50/40 ring-1 ring-primary/25'
                          : canRedeemPointsPay ? 'border-slate-100 bg-white hover:bg-slate-50/50' : 'border-slate-100'
                      }`}
                    >
                      <div className="pr-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display font-black text-xs text-slate-950 block">Points + Pay (Hybrid Split)</span>
                          <span className="bg-amber-100 text-amber-700 text-[8px] font-mono font-black px-1.5 py-0.5 rounded-md uppercase">Max 70% Points</span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 font-medium mt-0.5 block">
                          Pay {pointsRequired.toLocaleString()} pts + ₹{Math.round(product.priceValue * 0.30).toLocaleString('en-IN')} Cash co-pay
                        </span>
                        <span className="text-[9.5px] font-bold text-emerald-600 block mt-1 uppercase tracking-wider font-mono">
                          Earn +{Math.round((product.priceValue * 0.30) * 0.03).toLocaleString()} Pts on co-pay spend
                        </span>
                      </div>
                      <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center flex-none border-slate-350">
                        {paymentMethod === 'points_pay' && canRedeemPointsPay && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Ledger Breakdown */}
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">TRANSACTION LEDGER</span>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 px-4.5 space-y-3 font-mono text-xs text-slate-600 font-bold">
                    <div className="flex justify-between">
                      <span>Payment Mode</span>
                      <span className="text-slate-900 font-black uppercase tracking-wider text-[10px]">
                        {paymentMethod === 'cash' ? 'Credit Card (Full)' : 'Points + Pay (Hybrid)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Card Spend Charge</span>
                      <span className="text-slate-800 font-black">
                        ₹{(paymentMethod === 'cash' ? product.priceValue : product.priceValue * 0.30).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {paymentMethod === 'points_pay' && (
                      <div className="flex justify-between">
                        <span>Points Redeemed</span>
                        <span className="text-primary">-{pointsRequired.toLocaleString()} pts</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Points To Earn</span>
                      <span className="text-emerald-600">
                        +{paymentMethod === 'cash' ? Math.round(product.priceValue * 0.03).toLocaleString() : Math.round((product.priceValue * 0.30) * 0.03).toLocaleString()} pts
                      </span>
                    </div>
                    <div className="border-t border-slate-200/50 pt-2.5 flex justify-between font-black text-slate-900">
                      <span>Remaining Points Balance</span>
                      <span className={state.rewardBalance >= (paymentMethod === 'points_pay' ? pointsRequired : 0) ? 'text-slate-900' : 'text-red-500'}>
                        {(state.rewardBalance - (paymentMethod === 'points_pay' ? pointsRequired : 0) + (paymentMethod === 'cash' ? Math.round(product.priceValue * 0.03) : Math.round((product.priceValue * 0.30) * 0.03))).toLocaleString()} pts
                      </span>
                    </div>
                  </div>

                  {/* Booking errors */}
                  {paymentMethod === 'points_pay' && !canRedeemPointsPay && (
                    <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex gap-2.5 items-start text-amber-700">
                      <AlertCircle className="w-4 h-4 flex-none mt-0.5" />
                      <div className="text-[10px] font-medium leading-relaxed">
                        <p className="font-bold">Insufficient Points</p>
                        <p className="text-amber-600">You need {pointsRequired - state.rewardBalance} more points to use Points + Pay. Standard payment mode has been auto-recommended.</p>
                      </div>
                    </div>
                  )}

                  {checkoutError && (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl flex gap-2.5 items-start text-rose-700">
                      <AlertCircle className="w-4 h-4 flex-none mt-0.5" />
                      <div className="text-[10px] font-medium leading-relaxed">{checkoutError}</div>
                    </div>
                  )}
                </div>

                {/* Confirm Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleConfirmPurchase}
                    disabled={paymentMethod === 'points_pay' && !canRedeemPointsPay}
                    className="w-full py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider text-white bg-primary hover:bg-primary-dark transition-all shadow-md shadow-primary/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {paymentMethod === 'points_pay' ? 'Authorize Points + Pay' : 'Pay via Credit Card'}
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-3 rounded-2xl text-xs font-display font-black uppercase tracking-wider text-slate-500 hover:bg-slate-50 transition-all cursor-pointer text-center"
                  >
                    Cancel Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Full-Screen Premium Blur Loader overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="relative">
            <div className="h-12 w-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-white/10 rounded-full" />
          </div>
          <h3 className="mt-6 font-display font-bold text-base tracking-wide">Processing Secure Transaction...</h3>
          <p className="text-xs text-slate-300 mt-1.5 max-w-xs font-sans">
            Contacting SmartRewards partner platform for dynamic balance updates and ledger synchronization.
          </p>
        </div>
      )}

    </motion.div>
  );
};
