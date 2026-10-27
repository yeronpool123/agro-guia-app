import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '../components/SonnerToaster';
import { ExperienceLevel } from '../data/crops';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'EDITOR' | 'ADMIN';
  preferredLevel: ExperienceLevel;
  downloadCount: number;
  scanCount: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lockoutRemainingSeconds: number;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string, level?: ExperienceLevel) => Promise<boolean>;
  logout: () => void;
  recordDownload: (cropSlug: string, level: string) => void;
  recordScan: () => void;
  updatePreferredLevel: (level: ExperienceLevel) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);
  const toast = useToast();

  // Verificar estado de bloqueo al cargar
  useEffect(() => {
    const lockUntilStr = localStorage.getItem('agroguia_lock_until');
    if (lockUntilStr) {
      const lockUntil = parseInt(lockUntilStr, 10);
      const remaining = Math.max(0, Math.floor((lockUntil - Date.now()) / 1000));
      if (remaining > 0) {
        setLockoutRemainingSeconds(remaining);
      } else {
        localStorage.removeItem('agroguia_lock_until');
        localStorage.removeItem('agroguia_failed_count');
      }
    }

    // Cargar sesión existente
    try {
      const storedUser = sessionStorage.getItem('agroguia_active_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Ignorar errores de parseo
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Temporizador para cuenta regresiva de bloqueo
  useEffect(() => {
    if (lockoutRemainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemainingSeconds((prev) => {
        if (prev <= 1) {
          localStorage.removeItem('agroguia_lock_until');
          localStorage.removeItem('agroguia_failed_count');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemainingSeconds]);

  const login = useCallback(
    async (email: string, pass: string): Promise<boolean> => {
      // 1. Verificar bloqueo por fuerza bruta
      if (lockoutRemainingSeconds > 0) {
        const mins = Math.ceil(lockoutRemainingSeconds / 60);
        toast.error(
          'Cuenta temporalmente bloqueada',
          `Demasiados intentos fallidos. Intenta nuevamente en ${mins} minuto${mins > 1 ? 's' : ''}.`
        );
        return false;
      }

      const cleanEmail = email.trim().toLowerCase();

      // Intentar login mediante servidor si está disponible
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: pass })
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          // Éxito
          localStorage.removeItem('agroguia_failed_count');
          localStorage.removeItem('agroguia_lock_until');
          setUser(data.user);
          sessionStorage.setItem('agroguia_active_user', JSON.stringify(data.user));
          toast.success('¡Bienvenido a AgroGuía!', `Sesión iniciada con éxito como ${data.user.name}`);
          return true;
        } else {
          // Manejo de intentos fallidos
          const currentAttempts = parseInt(localStorage.getItem('agroguia_failed_count') || '0', 10) + 1;
          localStorage.setItem('agroguia_failed_count', currentAttempts.toString());

          if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
            const lockUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
            localStorage.setItem('agroguia_lock_until', lockUntil.toString());
            setLockoutRemainingSeconds(LOCKOUT_MINUTES * 60);
            toast.error(
              'Acceso suspendido por 15 minutos',
              'Has superado el límite de 5 intentos fallidos por seguridad.'
            );
          } else {
            const remaining = MAX_FAILED_ATTEMPTS - currentAttempts;
            toast.error(
              'Credenciales no válidas',
              `Correo o contraseña incorrectos. Te quedan ${remaining} intento${remaining > 1 ? 's' : ''}.`
            );
          }
          return false;
        }
      } catch {
        // Fallback local seguro si el endpoint responde error de red
        // Permitir usuario demo o validar credencial guardada localmente
        const registeredUsersStr = localStorage.getItem('agroguia_registered_users');
        const registeredUsers: any[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
        const found = registeredUsers.find((u) => u.email === cleanEmail);

        if (found && found.password === pass) {
          localStorage.removeItem('agroguia_failed_count');
          setUser(found);
          sessionStorage.setItem('agroguia_active_user', JSON.stringify(found));
          toast.success('¡Bienvenido a AgroGuía!', `Sesión iniciada con éxito como ${found.name}`);
          return true;
        }

        const currentAttempts = parseInt(localStorage.getItem('agroguia_failed_count') || '0', 10) + 1;
        localStorage.setItem('agroguia_failed_count', currentAttempts.toString());
        if (currentAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
          localStorage.setItem('agroguia_lock_until', lockUntil.toString());
          setLockoutRemainingSeconds(LOCKOUT_MINUTES * 60);
          toast.error(
            'Acceso suspendido por 15 minutos',
            'Has superado el límite de 5 intentos fallidos por seguridad.'
          );
        } else {
          toast.error('Credenciales no válidas', 'Verifica tu correo electrónico o contraseña.');
        }
        return false;
      }
    },
    [lockoutRemainingSeconds, toast]
  );

  const register = useCallback(
    async (name: string, email: string, pass: string, level: ExperienceLevel = 'PRINCIPIANTE'): Promise<boolean> => {
      const cleanEmail = email.trim().toLowerCase();
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: cleanEmail, password: pass, preferredLevel: level })
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          setUser(data.user);
          sessionStorage.setItem('agroguia_active_user', JSON.stringify(data.user));
          toast.success('¡Cuenta creada exitosamente!', `Bienvenido a la comunidad agrícola, ${data.user.name}.`);
          return true;
        } else {
          toast.error('No se pudo crear la cuenta', data.error || 'Verifica los datos ingresados.');
          return false;
        }
      } catch {
        // Fallback local
        const newUser: User = {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          name: name.trim(),
          email: cleanEmail,
          role: 'USER',
          preferredLevel: level,
          downloadCount: 0,
          scanCount: 0,
          createdAt: new Date().toISOString()
        };
        const registeredUsersStr = localStorage.getItem('agroguia_registered_users');
        const registeredUsers: any[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
        if (registeredUsers.some((u) => u.email === cleanEmail)) {
          toast.error('Correo ya registrado', 'Ya existe una cuenta con este correo electrónico.');
          return false;
        }
        registeredUsers.push({ ...newUser, password: pass });
        localStorage.setItem('agroguia_registered_users', JSON.stringify(registeredUsers));

        setUser(newUser);
        sessionStorage.setItem('agroguia_active_user', JSON.stringify(newUser));
        toast.success('¡Cuenta creada exitosamente!', `Bienvenido a AgroGuía, ${newUser.name}.`);
        return true;
      }
    },
    [toast]
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('agroguia_active_user');
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    toast.info('Sesión finalizada', 'Has cerrado tu sesión de AgroGuía.');
  }, [toast]);

  const recordDownload = useCallback((cropSlug: string, level: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, downloadCount: prev.downloadCount + 1 };
      sessionStorage.setItem('agroguia_active_user', JSON.stringify(updated));
      return updated;
    });

    // Registrar en auditoría local
    try {
      const logs = JSON.parse(localStorage.getItem('agroguia_audit_downloads') || '[]');
      logs.unshift({
        cropSlug,
        level,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('agroguia_audit_downloads', JSON.stringify(logs.slice(0, 50)));
    } catch {}
  }, []);

  const recordScan = useCallback(() => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, scanCount: prev.scanCount + 1 };
      sessionStorage.setItem('agroguia_active_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updatePreferredLevel = useCallback(
    (level: ExperienceLevel) => {
      setUser((prev) => {
        if (!prev) return null;
        const updated = { ...prev, preferredLevel: level };
        sessionStorage.setItem('agroguia_active_user', JSON.stringify(updated));
        return updated;
      });
      toast.success('Preferencia actualizada', `Nivel agronómico ajustado a ${level}`);
    },
    [toast]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        lockoutRemainingSeconds,
        login,
        register,
        logout,
        recordDownload,
        recordScan,
        updatePreferredLevel
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
