'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { X, Sparkles, LogOut, RotateCcw, Award, Share2, Check, QrCode } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

export function ProfileModal({ isOpen, onClose, onStartQuiz }: ProfileModalProps) {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [copiedPass, setCopiedPass] = useState(false);
  const [showPassQr, setShowPassQr] = useState(false);

  const handleSharePass = async () => {
    if (!user) return;
    const shareText = language === 'ar'
      ? `لهجتي الذوقية في القهوة هي "${user.assignedDialect}" (${user.assignedHouse}) برقم باسبور ${user.fayrouzPassId}! اكتشف قهوتك الصح في عمّان:`
      : `My Coffee Dialect on Fayrouz is "${user.assignedDialect}" (${user.assignedHouse}) with Pass ID ${user.fayrouzPassId}! Find your match in Amman:`;
    const shareUrl = `https://fayrouz.bynoor.io?pass=${user.fayrouzPassId}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'FayrouzPass™',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // dismissed
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && user && (
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

        {/* User Badge Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/30 to-espresso-800 border border-gold-500/40 text-gold-300 font-serif text-2xl font-bold shadow-lg">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h3 className="text-xl font-serif font-bold text-parchment-50">
            {user.name}
          </h3>
          <p className="text-xs text-parchment-300/70 font-mono">
            {user.email}
          </p>
        </div>

        {/* FayrouzPass Status Card */}
        <div className="rounded-2xl border border-gold-500/30 bg-espresso-950/80 p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t('navPass')}
            </span>
            {user.hasCompletedQuiz && user.fayrouzPassId ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassQr(!showPassQr)}
                  className="flex items-center gap-1 text-[11px] font-mono text-gold-300 hover:text-gold-200 bg-gold-500/15 border border-gold-500/30 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                >
                  <QrCode className="w-3 h-3" />
                  <span>{showPassQr ? (language === 'ar' ? 'إغلاق' : 'Close') : (language === 'ar' ? 'الباركود' : 'QR')}</span>
                </button>
                <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  {user.fayrouzPassId}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-parchment-400/80 bg-espresso-800 px-2 py-0.5 rounded">
                {language === 'ar' ? 'بانتظار الاختبار' : 'Quiz Pending'}
              </span>
            )}
          </div>

          {showPassQr && user.hasCompletedQuiz && user.fayrouzPassId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-parchment-50 text-espresso-950 space-y-2 border border-gold-500/40"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <QRCodeSVG
                  value={`https://fayrouz.bynoor.io/ticket/?pass=${encodeURIComponent(user.fayrouzPassId)}`}
                  size={130}
                  level="H"
                  bgColor="#FFFFFF"
                  fgColor="#120D0A"
                  imageSettings={{
                    src: '/icon.svg',
                    x: undefined,
                    y: undefined,
                    height: 28,
                    width: 28,
                    excavate: true,
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-[11px] font-bold font-mono text-espresso-950">
                  {user.fayrouzPassId}
                </div>
                <div className="text-[10px] text-espresso-800/80">
                  {language === 'ar'
                    ? 'امسح في أي كافيه بعمّان لعرض ذائقتك'
                    : 'Permanent Member Pass QR for Amman Baristas'}
                </div>
              </div>
            </motion.div>
          )}

          {user.hasCompletedQuiz && user.assignedDialect ? (
            <div className="space-y-2 pt-2 border-t border-espresso-800">
              <div className="flex items-center gap-2 text-xs text-parchment-100 font-medium">
                <Award className="w-4 h-4 text-gold-400" />
                <span>{user.assignedDialect}</span>
              </div>
              {user.assignedHouse && (
                <p className="text-[11px] text-parchment-300/70">
                  {user.assignedHouse}
                </p>
              )}
            </div>
          ) : (
            <div className="pt-2 border-t border-espresso-800 space-y-2">
              <p className="text-xs text-parchment-300/70">
                {language === 'ar'
                  ? 'لم تقم بإجراء اختبار الذائقة بعد. اكتشف لهجتك الذوقية خلال ٣٠ ثانية!'
                  : "You haven't completed your sensory quiz yet. Discover your coffee dialect in 30s!"}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onStartQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-3 py-2 text-xs font-semibold text-espresso-950 hover:from-gold-400 hover:to-gold-500 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('quizTitle')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Actions */}
        <div className="space-y-2 text-xs">
          {user.hasCompletedQuiz && (
            <>
              <button
                onClick={handleSharePass}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500/15 to-gold-600/15 border border-gold-500/35 px-4 py-2.5 text-gold-300 hover:text-gold-200 hover:bg-gold-500/25 transition-all cursor-pointer font-medium"
              >
                {copiedPass ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span>{language === 'ar' ? 'تم نسخ باسبورك ورابط الموقع!' : 'Pass & Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-gold-400" />
                    <span>{language === 'ar' ? 'مشاركة باسبور فيروز مع أصحابك' : 'Share My FayrouzPass™'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onStartQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-espresso-700 bg-espresso-950/60 px-4 py-2.5 text-parchment-200 hover:border-gold-500/40 hover:text-gold-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('retakeQuiz')}</span>
              </button>
            </>
          )}

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-900/40 bg-red-950/20 px-4 py-2.5 text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('signOut')}</span>
          </button>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
