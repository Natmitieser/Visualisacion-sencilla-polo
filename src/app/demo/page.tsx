'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definición de proveedores sociales disponibles
const socialProviders = {
  google: {
    name: 'Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    )
  },
  discord: {
    name: 'Discord',
    icon: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
      </svg>
    )
  },
  twitter: {
    name: 'Twitter',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  github: {
    name: 'GitHub',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  apple: {
    name: 'Apple',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    )
  },
  tiktok: {
    name: 'TikTok',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    )
  }
};

type BackgroundTheme = 'light' | 'dark';
type Language = 'en' | 'es';

const translations = {
  en: {
    header: {
      tagline: 'Polo takes 9 minutes to set up',
      cta: 'Get Started'
    },
    customize: {
      title: 'Customize',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      accent: 'Accent Color',
      email: 'Email',
      emailToggle: 'Enable email login',
      social: 'Social Login',
      wallets: 'Wallets',
      walletsToggle: 'Embedded wallets',
      network: 'Network',
      networkDesc: 'Embedded wallets created automatically on Stellar upon login',
      language: 'Language'
    },
    modal: {
      title: 'polo',
      subtitle: 'Log in or sign up',
      emailPlaceholder: 'you@email.com',
      submit: 'Submit',
      divider: 'or continue with',
      wallet: 'Continue with a wallet',
      passkey: 'I have a passkey',
      protected: 'Protected by',
      empty: 'Select at least one authentication method'
    },
    info: {
      explore: {
        title: 'Explore Polo',
        desc: 'The easiest way to onboard all your users to web3 with Stellar',
        cta: 'Explore the Docs'
      },
      export: {
        title: 'Export this configuration',
        desc: "Polo's components can be customized client-side"
      },
      start: {
        title: 'Ready to get started',
        desc: 'Request early access to the Polo pilot program',
        cta: 'Request Access'
      }
    }
  },
  es: {
    header: {
      tagline: 'Polo toma 9 minutos para configurar',
      cta: 'Comenzar'
    },
    customize: {
      title: 'Personalizar',
      theme: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      accent: 'Color de Acento',
      email: 'Email',
      emailToggle: 'Habilitar login con email',
      social: 'Redes Sociales',
      wallets: 'Billeteras',
      walletsToggle: 'Billeteras embebidas',
      network: 'Red',
      networkDesc: 'Billeteras embebidas creadas automáticamente en Stellar al iniciar sesión',
      language: 'Idioma'
    },
    modal: {
      title: 'polo',
      subtitle: 'Inicia sesión o regístrate',
      emailPlaceholder: 'tu@email.com',
      submit: 'Enviar',
      divider: 'o continuar con',
      wallet: 'Continuar con una billetera',
      passkey: 'Tengo una passkey',
      protected: 'Protegido por',
      empty: 'Selecciona al menos un método de autenticación'
    },
    info: {
      explore: {
        title: 'Explorar Polo',
        desc: 'La forma más fácil de incorporar a todos tus usuarios a web3 con Stellar',
        cta: 'Explorar los Docs'
      },
      export: {
        title: 'Exportar configuración',
        desc: 'Los componentes de Polo pueden ser personalizados del lado del cliente'
      },
      start: {
        title: 'Listo para empezar',
        desc: 'Solicita acceso anticipado al programa pilot de Polo',
        cta: 'Solicitar Acceso'
      }
    }
  }
};

const backgroundThemes = {
  light: {
    name: 'Light',
    modal: '#FFFFFF',
    page: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    input: '#FFFFFF',
    inputBorder: '#D1D5DB',
    divider: '#E5E7EB'
  },
  dark: {
    name: 'Dark',
    modal: '#1F2937',
    page: '#111827',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    input: '#374151',
    inputBorder: '#4B5563',
    divider: '#374151'
  }
};

export default function DemoPage() {
  const [selectedTheme, setSelectedTheme] = useState<BackgroundTheme>('light');
  const [selectedAccent, setSelectedAccent] = useState('#005DB4');
  const [enabledProviders, setEnabledProviders] = useState(['google', 'discord']);
  const [showEmbeddedWallet, setShowEmbeddedWallet] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  const accentColors = [
    { color: '#005DB4', name: 'Polo Blue' },
    { color: '#10B981', name: 'Emerald' },
    { color: '#F59E0B', name: 'Amber' },
    { color: '#EF4444', name: 'Red' },
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#EC4899', name: 'Pink' }
  ];

  const theme = backgroundThemes[selectedTheme];
  const t = translations[language];

  const toggleProvider = (provider: string) => {
    setEnabledProviders(prev => 
      prev.includes(provider) 
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.page }}>
      {/* Header Banner */}
      <div className="border-b transition-colors" style={{ backgroundColor: theme.modal, borderColor: theme.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Polo" width={32} height={32} />
            <span className="text-lg font-bold transition-colors" style={{ color: theme.text }}>Polo</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Demo
            </span>
          </Link>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg border transition-colors" style={{ backgroundColor: theme.input, borderColor: theme.border }}>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${language === 'en' ? 'shadow-sm' : ''}`}
                style={{
                  backgroundColor: language === 'en' ? selectedAccent : 'transparent',
                  color: language === 'en' ? '#FFFFFF' : theme.textSecondary
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${language === 'es' ? 'shadow-sm' : ''}`}
                style={{
                  backgroundColor: language === 'es' ? selectedAccent : 'transparent',
                  color: language === 'es' ? '#FFFFFF' : theme.textSecondary
                }}
              >
                ES
              </button>
            </div>
            <span className="text-sm hidden md:block transition-colors" style={{ color: theme.textSecondary }}>
              {t.header.tagline}
            </span>
            <Link
              href="/getstarted"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center gap-1"
              style={{ backgroundColor: selectedAccent }}
            >
              {t.header.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-5">
          {/* Panel de Customización */}
          <div className="rounded-xl border p-3.5 h-fit space-y-3.5 transition-colors" style={{ backgroundColor: theme.modal, borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 transition-colors" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h2 className="text-sm font-bold transition-colors" style={{ color: theme.text }}>{t.customize.title}</h2>
            </div>

            {/* Tema */}
            <div>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.theme}</h3>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedTheme('light')}
                  className={`px-2 py-1.5 rounded-md border transition-all flex items-center justify-center gap-1.5 text-[11px] font-medium ${selectedTheme === 'light' ? 'shadow-sm' : ''
                    }`}
                  style={{
                    borderColor: selectedTheme === 'light' ? selectedAccent : theme.border,
                    backgroundColor: selectedTheme === 'light' ? `${selectedAccent}15` : theme.input,
                    color: selectedTheme === 'light' ? selectedAccent : theme.text
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {t.customize.light}
                </button>
                <button
                  onClick={() => setSelectedTheme('dark')}
                  className={`px-2 py-1.5 rounded-md border transition-all flex items-center justify-center gap-1.5 text-[11px] font-medium ${selectedTheme === 'dark' ? 'shadow-sm' : ''
                    }`}
                  style={{
                    borderColor: selectedTheme === 'dark' ? selectedAccent : theme.border,
                    backgroundColor: selectedTheme === 'dark' ? `${selectedAccent}15` : theme.input,
                    color: selectedTheme === 'dark' ? selectedAccent : theme.text
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  {t.customize.dark}
                </button>
              </div>
            </div>

            {/* Accent */}
            <div>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.accent}</h3>
              <div className="grid grid-cols-6 gap-1.5">
                {accentColors.map(({ color, name }) => (
                  <button
                    key={color}
                    onClick={() => setSelectedAccent(color)}
                    className={`h-8 rounded-lg transition-all flex items-center justify-center ${
                      selectedAccent === color 
                        ? 'scale-110 shadow-xl' 
                        : 'hover:scale-105 hover:shadow-lg'
                    }`}
                    style={{
                      backgroundColor: color,
                      border: selectedAccent === color ? `3px solid ${color}` : 'none',
                      boxShadow: selectedAccent === color 
                        ? `0 0 0 2px ${theme.modal}, 0 0 0 4px ${color}` 
                        : undefined
                    }}
                    title={name}
                  >
                    {selectedAccent === color && (
                      <svg className="w-3.5 h-3.5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="pb-3 border-b transition-colors" style={{ borderColor: theme.border }}>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.email}</h3>
              <label className="flex hover:bg-gray-200 items-center justify-between cursor-pointer group">
                <span className="text-[11px] transition-colors group-hover:opacity-80" style={{ color: theme.text }}>{t.customize.emailToggle}</span>
                <input
                  type="checkbox"
                  checked={showEmail}
                  onChange={(e) => setShowEmail(e.target.checked)}
                  className="rounded w-3.5 h-3.5 cursor-pointer"
                  style={{ accentColor: selectedAccent }}
                />
              </label>
            </div>

            {/* Autenticación Social */}
            <div className="pb-3 border-b transition-colors" style={{ borderColor: theme.border }}>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.social}</h3>
              <div className="space-y-1">
                {Object.entries(socialProviders).map(([key, provider]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer group hover:bg-opacity-5 hover:bg-gray-200 rounded px-1 py-0.5 -mx-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 flex items-center justify-center opacity-80 group-hover:opacity-100">
                        {provider.icon}
                      </div>
                      <span className="text-[11px] transition-colors" style={{ color: theme.text }}>{provider.name}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={enabledProviders.includes(key)}
                      onChange={() => toggleProvider(key)}
                      className="rounded w-3.5 h-3.5 cursor-pointer"
                      style={{ accentColor: selectedAccent }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Wallets */}
            <div className="pb-3 border-b transition-colors" style={{ borderColor: theme.border }}>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.wallets}</h3>
              <label className="flex items-center hover:bg-gray-200 justify-between cursor-pointer group">
                <span className="text-[11px] transition-colors group-hover:opacity-80" style={{ color: theme.text }}>{t.customize.walletsToggle}</span>
                <input
                  type="checkbox"
                  checked={showEmbeddedWallet}
                  onChange={(e) => setShowEmbeddedWallet(e.target.checked)}
                  className="rounded w-3.5 h-3.5 cursor-pointer"
                  style={{ accentColor: selectedAccent }}
                />
              </label>
            </div>

            {/* Network */}
            <div>
              <h3 className="text-[11px] font-semibold mb-1.5 uppercase tracking-wide transition-colors" style={{ color: theme.textSecondary }}>{t.customize.network}</h3>
              <div className="rounded-lg p-2.5 border-2 transition-all" style={{
                backgroundColor: selectedTheme === 'light' ? '#EFF6FF' : '#1E3A8A20',
                borderColor: selectedAccent
              }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5  rounded-full flex items-center justify-center shadow-sm">
                      <Image src="/stellar.png" alt="Stellar" width={20} height={20} />
                    </div>
                    <span className="text-xs font-bold transition-colors" style={{ color: theme.text }}>Stellar</span>
                  </div>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#10B98120' }}>
                    <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[9px] font-bold text-green-700">Active</span>
                  </div>
                </div>
                <p className="text-[9px] leading-tight transition-colors" style={{ color: theme.textSecondary }}>
                  {t.customize.networkDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Vista Previa del Modal */}
          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-[460px] rounded-2xl shadow-2xl border p-8 transition-all duration-300"
              style={{ backgroundColor: theme.modal, borderColor: theme.border }}
            >
              {/* Logo y título */}
              <div className="text-center mb-7">
                <div className="flex justify-center mb-4">
                  <Image src="/logo.png" alt="Polo" width={64} height={64} className="drop-shadow-lg" />
                </div>
                <h2
                  className="text-3xl font-bold mb-2 transition-colors"
                  style={{ color: theme.text }}
                >
                  polo
                </h2>
                <p
                  className="text-base transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  {t.modal.subtitle}
                </p>
              </div>

              {/* Input de email */}
              {showEmail && (
                <>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder={t.modal.emailPlaceholder}
                      className="w-full px-4 py-3.5 rounded-lg border focus:outline-none focus:ring-2 text-base transition-all placeholder:text-gray-400"
                      style={{
                        borderColor: theme.inputBorder,
                        backgroundColor: theme.input,
                        color: theme.text,
                        '--tw-ring-color': selectedAccent
                      } as React.CSSProperties}
                    />
                    <button
                      className="w-full mt-3 py-3.5 rounded-lg text-white font-bold text-base transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
                      style={{ backgroundColor: selectedAccent }}
                    >
                      {t.modal.submit}
                    </button>
                  </div>

                  {(enabledProviders.length > 0 || showEmbeddedWallet) && (
                    <div className="relative my-5">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t transition-colors" style={{ borderColor: theme.divider }}></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span
                          className="px-4 transition-colors font-medium"
                          style={{
                            backgroundColor: theme.modal,
                            color: theme.textSecondary
                          }}
                        >
                          {t.modal.divider}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Botones sociales */}
              {enabledProviders.length > 0 && (
                <div className="space-y-2.5 mb-4">
                  {enabledProviders.map(provider => {
                    const providerData = socialProviders[provider as keyof typeof socialProviders];
                    return (
                      <button
                        key={provider}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-lg border transition-all hover:scale-[1.01] hover:shadow-md active:scale-[0.99]"
                        style={{
                          borderColor: theme.border,
                          backgroundColor: theme.input
                        }}
                      >
                        {providerData.icon}
                        <span
                          className="text-base font-semibold transition-colors"
                          style={{ color: theme.text }}
                        >
                          {providerData.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Billetera embebida */}
              {showEmbeddedWallet && (
                <button
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-lg border-2 transition-all hover:scale-[1.01] hover:shadow-md text-base font-semibold active:scale-[0.99]"
                  style={{
                    borderColor: selectedAccent,
                    color: selectedAccent,
                    backgroundColor: `${selectedAccent}10`
                  }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  {t.modal.wallet}
                </button>
              )}

              {/* Footer */}
              {(showEmail || enabledProviders.length > 0 || showEmbeddedWallet) && (
                <>
                  <div className="mt-6 text-center">
                    <button
                      className="text-sm hover:underline transition-all hover:opacity-70"
                      style={{ color: theme.textSecondary }}
                    >
                      {t.modal.passkey}
                    </button>
                  </div>

                  <div
                    className="mt-6 pt-6 border-t flex items-center justify-center gap-2 transition-colors"
                    style={{ borderColor: theme.divider }}
                  >
                    <span
                      className="text-sm transition-colors"
                      style={{ color: theme.textSecondary }}
                    >
                      {t.modal.protected}
                    </span>
                    <div className="flex items-center gap-2">
                      <Image src="/logo.png" alt="Polo" width={18} height={18} />
                      <span
                        className="text-sm font-bold transition-colors"
                        style={{ color: theme.text }}
                      >
                        polo
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Estado vacío */}
              {!showEmail && enabledProviders.length === 0 && !showEmbeddedWallet && (
                <div className="text-center py-16">
                  <svg className="w-24 h-24 mx-auto mb-5 opacity-10 transition-colors" style={{ color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p
                    className="text-base font-medium transition-colors"
                    style={{ color: theme.textSecondary }}
                  >
                    {t.modal.empty}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Panel de información */}
          <div className="space-y-3">
            {/* Explorar Polo */}
            <div className="rounded-xl border-2 p-3.5 transition-all hover:shadow-lg" style={{
              backgroundColor: theme.modal,
              borderColor: selectedAccent
            }}>
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: selectedAccent }}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold mb-1 transition-colors" style={{ color: theme.text }}>{t.info.explore.title}</h3>
                  <p className="text-[10px] leading-relaxed mb-2 transition-colors" style={{ color: theme.textSecondary }}>
                    {t.info.explore.desc}
                  </p>
                  <Link
                    href="/docs"
                    className="inline-flex items-center text-[10px] font-bold gap-1 hover:gap-1.5 transition-all"
                    style={{ color: selectedAccent }}
                  >
                    {t.info.explore.cta}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Exportar configuración */}
            <div className="rounded-xl border p-3.5 transition-all hover:shadow-md" style={{
              backgroundColor: theme.modal,
              borderColor: theme.border
            }}>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 rounded transition-colors" style={{ color: selectedAccent }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold mb-1 transition-colors" style={{ color: theme.text }}>{t.info.export.title}</h3>
                  <p className="text-[10px] leading-relaxed transition-colors" style={{ color: theme.textSecondary }}>
                    {t.info.export.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Comenzar ahora */}
            <div className="rounded-xl border p-3.5 transition-all hover:shadow-md" style={{
              backgroundColor: theme.modal,
              borderColor: theme.border
            }}>
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 rounded transition-colors" style={{ color: selectedAccent }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold mb-1 transition-colors" style={{ color: theme.text }}>{t.info.start.title}</h3>
                  <p className="text-[10px] leading-relaxed mb-2.5 transition-colors" style={{ color: theme.textSecondary }}>
                    {t.info.start.desc}
                  </p>
                  <Link
                    href="/getstarted"
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
                    style={{ backgroundColor: selectedAccent }}
                  >
                    {t.info.start.cta}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
