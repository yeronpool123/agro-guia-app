import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { ExperienceLevel } from '../data/crops';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState<ExperienceLevel>('PRINCIPIANTE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Errores inline
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login, register, lockoutRemainingSeconds } = useAuth();

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return 'El correo electrónico es requerido';
    if (!re.test(val)) return 'Ingresa un correo electrónico válido';
    return '';
  };

  const validatePassword = (val: string) => {
    if (!val) return 'La contraseña es requerida';
    if (val.length < 8) return 'Debe tener al menos 8 caracteres';
    if (!/[A-Z]/.test(val)) return 'Debe contener al menos una letra mayúscula';
    if (!/[0-9]/.test(val)) return 'Debe contener al menos un número';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const nErr = mode === 'register' && !name.trim() ? 'El nombre completo es requerido' : '';

    setEmailError(eErr);
    setPasswordError(pErr);
    setNameError(nErr);

    if (eErr || pErr || nErr) return;

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (ok) onClose();
      } else {
        const ok = await register(name, email, password, level);
        if (ok) onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLocked = lockoutRemainingSeconds > 0;
  const lockMins = Math.floor(lockoutRemainingSeconds / 60);
  const lockSecs = lockoutRemainingSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#0F3D2E]/10 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera del modal */}
        <div className="bg-[#FAF7F0] px-6 py-5 border-b border-[#0F3D2E]/10 flex items-center justify-between">
          <BrandLogo size="md" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0F3D2E] hover:bg-neutral-200/50 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Alerta de bloqueo por intentos fallidos */}
          {isLocked && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-900 text-xs">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Acceso temporalmente bloqueado</p>
                <p className="mt-0.5">
                  Por seguridad, espera{' '}
                  <span className="font-mono font-bold">
                    {lockMins}:{lockSecs < 10 ? `0${lockSecs}` : lockSecs}
                  </span>{' '}
                  antes de intentar nuevamente.
                </p>
              </div>
            </div>
          )}

          {/* Selector de modo */}
          <div className="flex bg-[#FAF7F0] p-1 rounded-xl mb-6 border border-[#0F3D2E]/10">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setEmailError('');
                setPasswordError('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-[#0F3D2E] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-[#0F3D2E]'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setEmailError('');
                setPasswordError('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-[#0F3D2E] text-white shadow-sm'
                  : 'text-neutral-600 hover:text-[#0F3D2E]'
              }`}
            >
              Crear cuenta gratis
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider mb-1">
                  Nombre completo
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="Ej. Ing. Carlos Mendoza"
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] transition-all ${
                      nameError ? 'border-red-500 bg-red-50/30' : 'border-neutral-200'
                    }`}
                  />
                </div>
                {nameError && <p className="text-red-600 text-xs mt-1">{nameError}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="productor@ejemplo.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] transition-all ${
                    emailError ? 'border-red-500 bg-red-50/30' : 'border-neutral-200'
                  }`}
                />
              </div>
              {emailError && <p className="text-red-600 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider">
                  Contraseña
                </label>
                {mode === 'login' && (
                  <span className="text-[11px] text-[#2E8B57] font-semibold cursor-pointer hover:underline">
                    ¿Olvidaste tu contraseña?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Mínimo 8 caracteres (1 Mayús, 1 Núm)"
                  className={`w-full pl-10 pr-10 py-2.5 bg-neutral-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] transition-all ${
                    passwordError ? 'border-red-500 bg-red-50/30' : 'border-neutral-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#0F3D2E]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && <p className="text-red-600 text-xs mt-1">{passwordError}</p>}
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#0F3D2E] uppercase tracking-wider mb-1">
                  Nivel de experiencia agrícola
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'] as ExperienceLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-bold border transition-all ${
                        level === lvl
                          ? 'border-[#0F3D2E] bg-[#0F3D2E] text-white shadow-sm'
                          : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {lvl === 'PRINCIPIANTE' && '🌱 Inicial'}
                      {lvl === 'INTERMEDIO' && '🌿 Medio'}
                      {lvl === 'AVANZADO' && '🌾 Técnico'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLocked}
              className="w-full mt-2 py-3 px-4 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Acceder a AgroGuía' : 'Registrar mi cuenta'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Nota de Seguridad */}
          <div className="mt-5 pt-3 border-t border-neutral-100">
            <p className="text-[11px] text-center text-neutral-500">
              Autenticación segura con cifrado de contraseñas · Cero alertas del navegador
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
