import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Lock, LogIn, ShieldAlert, Smile } from 'lucide-react';

export const AdminLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is in authorized admins collection
      const adminDocRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminDocRef);
      
      if (adminDoc.exists()) {
        navigate('/admin/dashboard');
      } else if (user.email === 'syedfaraaz876@gmail.com') {
        // Bootstrap the first admin if it's the authorized owner email
        const { setDoc } = await import('firebase/firestore');
        await setDoc(adminDocRef, {
          email: user.email,
          role: 'super_admin',
          createdAt: new Date().toISOString()
        });
        navigate('/admin/dashboard');
      } else {
        await signOut(auth);
        setError('Access Denied: You are not authorized to access the admin panel.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-brand-teal/5"
      >
        <div className="w-20 h-20 bg-brand-teal rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
          <Lock size={40} />
        </div>
        
        <h1 className="text-4xl font-kids font-bold text-brand-ink mb-4">Admin Access</h1>
        <p className="text-brand-sage font-medium mb-10">
          Please sign in with your authorized @auviatherapy.com account to manage the center.
        </p>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-left">
            <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-brand-ink text-white py-5 rounded-[24px] font-kids font-bold text-xl hover:bg-brand-teal transition-all shadow-xl active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={24} /> Sign in with Google
            </>
          )}
        </button>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-brand-sage font-bold text-sm">
            <Smile size={18} className="text-brand-teal" />
            Auvia Behavior Centers
          </div>
        </div>
      </motion.div>
    </div>
  );
};
