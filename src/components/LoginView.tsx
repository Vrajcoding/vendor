/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Mail, Lock, Eye, EyeOff, ShieldCheck, Star } from 'lucide-react';
import { PROFILE_IMAGES } from '../data';

interface LoginViewProps {
  onLoginSuccess: (name: string, role: string, avatar: string) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('alex.chen@vendorbridge.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [selectedProfile, setSelectedProfile] = useState<'chen' | 'rivera' | 'marcus'>('chen');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    // Simulate enterprise authentication with a brief delay
    setTimeout(() => {
      setIsLoading(false);
      let userName = 'Alex Chen';
      let userRole = 'Officer';
      let userAvatar = PROFILE_IMAGES.alexChen;

      if (selectedProfile === 'rivera') {
        userName = 'Alex Rivera';
        userRole = 'Procurement Lead';
        userAvatar = PROFILE_IMAGES.alexRivera;
      } else if (selectedProfile === 'marcus') {
        userName = 'Marcus Chen';
        userRole = 'Procurement Officer';
        userAvatar = PROFILE_IMAGES.marcusChen;
      }

      onLoginSuccess(userName, userRole, userAvatar);
    }, 1200);
  };

  return (
    <div className="flex w-screen h-screen bg-[#09090b] text-zinc-200 select-none overflow-hidden font-sans">
      {/* Auth Content Area (Left side) */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6 md:px-12 bg-radial from-zinc-950 via-transparent to-transparent bg-[#09090b]">
        {/* Abstract structural grid lines via tailwind */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="w-full max-w-[440px] z-10">
          {/* Brand Anchor */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 bg-white rounded flex items-center justify-center mb-3 shadow">
              <div className="w-5 h-5 bg-black rotate-45"></div>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none text-center">VendorBridge</h1>
            <p className="text-zinc-400 text-xs mt-1.5 font-sans">Secure Enterprise Procurement Portal</p>
          </div>

          {/* Quick User Selection Switch for Demo */}
          <div className="mb-4 bg-zinc-900 border border-zinc-805 rounded-xl p-2.5">
            <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-400 mb-1.5 text-center">Choose Demo Workspace Account</p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedProfile('chen');
                  setEmail('alex.chen@vendorbridge.com');
                }}
                className={`text-[10px] font-semibold py-1 px-2 rounded-lg transition-all cursor-pointer truncate ${
                  selectedProfile === 'chen' ? 'bg-white text-black' : 'bg-transparent hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                Alex Chen (Off.)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProfile('rivera');
                  setEmail('alex.rivera@vendorbridge.com');
                }}
                className={`text-[10px] font-semibold py-1 px-2 rounded-lg transition-all cursor-pointer truncate ${
                  selectedProfile === 'rivera' ? 'bg-white text-black' : 'bg-transparent hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                Alex Rivera (Lead)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedProfile('marcus');
                  setEmail('marcus.chen@vendorbridge.com');
                }}
                className={`text-[10px] font-semibold py-1 px-2 rounded-lg transition-all cursor-pointer truncate ${
                  selectedProfile === 'marcus' ? 'bg-white text-black' : 'bg-transparent hover:bg-zinc-800 text-zinc-400'
                }`}
              >
                Marcus Chen (CPO)
              </button>
            </div>
          </div>

          {/* Login Card */}
          <div className="glass rounded-xl p-6 shadow-xl relative overflow-hidden">
            {/* Top Glossy Divider reflection */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-450 ml-1 block" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@company.com"
                    className="w-full bg-[#0d0d0f]/80 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-700 outline-none transition-all duration-150"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-zinc-450" htmlFor="password">Password</label>
                  <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors leading-none">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#0d0d0f]/80 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-lg py-3 pl-10 pr-10 text-xs text-white placeholder-zinc-700 outline-none transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-550 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember device selection */}
              <div className="flex items-center gap-2 px-1">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-zinc-900 border-zinc-800 text-zinc-100 rounded focus:ring-zinc-500 focus:ring-offset-bg bg-none cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-zinc-400 cursor-pointer selection:bg-transparent">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Authenticate Action */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-white hover:bg-zinc-200 disabled:opacity-80 disabled:cursor-not-allowed text-black font-semibold text-xs rounded-lg transition-all flex items-center justify-center relative overflow-hidden group cursor-pointer mt-2"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="group-active:scale-95 transition-transform">Sign In to Dashboard</span>
                )}
              </button>
            </form>

            {/* Encrypted trust panel */}
            <div className="mt-6 pt-4 border-t border-zinc-850 flex items-center justify-center gap-2 opacity-50 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>AES-256 Encrypted Traffic</span>
            </div>
          </div>

          <div className="mt-6 text-center select-text">
            <p className="text-xs text-zinc-400">
              New vendor partner?{' '}
              <a href="#" className="text-white hover:text-zinc-200 font-semibold hover:underline">
                Apply for Access
              </a>
            </p>
          </div>
        </div>

        {/* Footer info panel */}
        <footer className="absolute bottom-4 left-0 w-full text-center px-4">
          <div className="flex justify-center gap-6 text-[11px] text-zinc-550">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support Center</a>
          </div>
        </footer>
      </main>

      {/* Marketing Info Showcase Panel (Right side) */}
      <aside className="hidden lg:flex w-[40%] bg-zinc-900 relative overflow-hidden flex-col justify-end p-8 border-l border-zinc-800 z-10">
        {/* Abstract Background graphic */}
        <div className="absolute inset-0">
          <img
            src={PROFILE_IMAGES.glowBg}
            alt="Enterprise Network Map"
            className="w-full h-full object-cover mix-blend-overlay opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
        </div>

        {/* Marketing review text block */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="space-y-3">
            <span className="inline-flex items-center px-2 py-0.5 bg-zinc-800 border border-zinc-700/80 rounded-full text-zinc-300 text-[9px] font-bold tracking-widest font-mono">
              NEW v4.2 UPDATE
            </span>
            <h2 className="text-2xl font-semibold text-white tracking-tight leading-tight">The future of procurement is autonomous.</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              VendorBridge streamlines the entire requisition lifecycle, from intelligent RFQ matching to automated invoice reconciliation. Experience 40% faster cycle times and unparalleled transparency.
            </p>
          </div>

          {/* Testimonial Quote element */}
          <div className="bg-zinc-950/70 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-xl">
            <div className="flex text-zinc-400 gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
              ))}
            </div>
            <blockquote className="text-xs italic text-zinc-350 leading-relaxed mb-4">
              "The centralized visibility provided by VendorBridge has transformed how we manage our tier-one suppliers globally. It's the command center we needed."
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src={PROFILE_IMAGES.marcusChen}
                alt="Marcus Chen CPO"
                className="h-8 w-8 rounded-full border border-zinc-800 object-cover"
              />
              <div>
                <p className="text-xs font-bold text-white leading-none mb-1">Marcus Chen</p>
                <p className="text-[9px] text-zinc-550 uppercase tracking-wide font-mono font-semibold">Chief Procurement Officer, Global Tech Corp</p>
              </div>
            </div>
          </div>

          {/* Trusted indicators */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-3.5">
              <div className="h-8 w-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                <img className="w-full h-full object-cover" src={PROFILE_IMAGES.marcusChen} alt="Executive" />
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                <img className="w-full h-full object-cover" src={PROFILE_IMAGES.marcusChenLarge} alt="Specialist" />
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-zinc-950 flex items-center justify-center font-bold text-[9px] text-white">
                +2k
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">Trusted by procurement teams at leading organizations.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
