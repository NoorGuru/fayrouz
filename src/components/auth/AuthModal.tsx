'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Sparkles, Mail, Lock, User, ArrowRight, Loader2, Ticket } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'recall' | 'register' | 'login';
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'recall' }: AuthModalProps) {
  const { login, register, loginWithGoogle, recallPassById } = useAuth();
  const { t, language } = useLanguage();

  const [mode, setMode] = useState<'recall' | 'register' | 'login'>(initialMode);
  const [passDigits, setPassDigits] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  const handlePassRecall = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passDigits.trim();
    if (!clean || clean.length < 4) {
      setError(language === 'ar' ? 'يرجى إدخال ٥ أرقام لباسبورك' : 'Please enter your 5-digit member code');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const fullId = `JO-${clean}`;
      const res = await recallPassById(fullId);
      if (!res.success) {
        setError(res.error || (language === 'ar' ? 'رقم الباسبور غير مسجل' : 'FayrouzPass ID not found'));
      } else {
        onSuccess?.();
        onClose();
      }
    } catch {
      setError(language === 'ar' ? 'حدث خطأ أثناء استرجاع الباسبور' : 'Failed to retrieve FayrouzPass');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'register') {
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || (language === 'ar' ? 'حدث خطأ أثناء التسجيل' : 'Registration failed'));
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (mode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || (language === 'ar' ? 'فشل تسجيل الدخول' : 'Sign in failed'));
        } else {
          onSuccess?.();
          onClose();
        }
      }
    } catch {
      setError(language === 'ar' ? 'حدث خطأ، يرجى المحاولة ثانية' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(res.error || (language === 'ar' ? 'فشل تسجيل الدخول بواسطة Google' : 'Google sign-in failed'));
      }
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || (language === 'ar' ? 'فشل تسجيل الدخول بواسطة Google' : 'Google sign-in failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative z-10 w-full max-w-md rounded-3xl glass-panel-glow border border-gold-500/35 bg-espresso-900/95 p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Top Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-60 rounded-full bg-gold-500/15 blur-2xl" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center absolute top-3 end-3 rounded-xl p-2 text-parchment-300/60 hover:bg-espresso-800 hover:text-parchment-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Brand Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-espresso-800 border border-gold-500/30 text-gold-400">
                {mode === 'recall' ? <Ticket className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-serif font-bold text-parchment-50">
                {mode === 'recall' ? t('passRecallTitle') : t('authModalTitle')}
              </h3>
              <p className="text-xs text-parchment-300/80 max-w-xs leading-relaxed">
                {mode === 'recall' ? t('passRecallSubtext') : t('authModalSubtext')}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-espresso-950/80 p-1 border border-espresso-700/80 mb-5">
              <button
                type="button"
                onClick={() => { setMode('recall'); setError(null); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'recall'
                    ? 'bg-gold-500 text-espresso-950 shadow-md'
                    : 'text-parchment-300 hover:text-parchment-50'
                }`}
              >
                {t('passRecallTab')}
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(null); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-gold-500 text-espresso-950 shadow-md'
                    : 'text-parchment-300 hover:text-parchment-50'
                }`}
              >
                {t('signUp')}
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-gold-500 text-espresso-950 shadow-md'
                    : 'text-parchment-300 hover:text-parchment-50'
                }`}
              >
                {t('signIn')}
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-200">
                {error}
              </div>
            )}

            {/* Form Mode 1: Instant Pass Recall (JO-XXXXX) */}
            {mode === 'recall' && (
              <form onSubmit={handlePassRecall} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-parchment-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-gold-400" />
                      {t('passRecallDigits')}
                    </span>
                    <span className="text-[11px] text-gold-400/80 font-mono">
                      {passDigits.length}/5
                    </span>
                  </label>

                  {/* Tactile Counter Country Prefix + 5 Digits Input */}
                  <div className="flex items-center rounded-2xl border border-gold-500/40 bg-espresso-950 p-1.5 shadow-inner focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-500/25 transition-all">
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-br from-gold-500/20 to-espresso-900 border border-gold-500/30 text-gold-300 font-mono font-bold text-sm select-none">
                      <span className="text-base leading-none">🇯🇴</span>
                      <span>JO</span>
                    </div>
                    <span className="px-2 text-gold-500/40 font-mono text-xl font-light">-</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      autoFocus
                      value={passDigits}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                        setPassDigits(val);
                      }}
                      placeholder="48291"
                      className="flex-1 bg-transparent py-2.5 px-2 font-mono text-2xl font-bold tracking-[0.25em] text-parchment-50 placeholder-parchment-500/30 focus:outline-none text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || passDigits.length < 4}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-3 text-sm font-semibold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 disabled:opacity-40 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t('retrievePalateBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Form Mode 2 & 3: Register or Login */}
            {mode !== 'recall' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-parchment-200 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gold-400" />
                      {t('nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: نور أو فيصل' : 'e.g., Alex'}
                      className="w-full rounded-xl border border-espresso-700 bg-espresso-950/90 px-3.5 py-2.5 text-sm text-parchment-50 placeholder-parchment-400/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-parchment-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-espresso-700 bg-espresso-950/90 px-3.5 py-2.5 text-sm text-parchment-50 placeholder-parchment-400/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-parchment-200 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gold-400" />
                    {t('passwordLabel')}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-espresso-700 bg-espresso-950/90 px-3.5 py-2.5 text-sm text-parchment-50 placeholder-parchment-400/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-3 text-sm font-semibold text-espresso-950 shadow-lg hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 disabled:opacity-50 transition-all cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'register' ? t('signUp') : t('signIn')}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-4 text-center text-xs">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-espresso-700/80" />
              </div>
              <span className="relative bg-espresso-900 px-3 text-parchment-300/50 uppercase tracking-widest text-[10px]">
                {language === 'ar' ? 'أو' : 'OR'}
              </span>
            </div>

            {/* Google 1-Tap Option */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-espresso-700 bg-espresso-950/60 px-4 py-2.5 text-xs font-medium text-parchment-100 hover:border-gold-500/40 hover:bg-espresso-800 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.3-.8-.5-1.6-.5-2.4z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>{t('orGoogle')}</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
