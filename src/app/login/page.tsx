'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '@/app/components/auth/page.module.css';

type TFieldErrors = {
  correo?: string;
  contrasena?: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });

  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para validar correo
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    const domain = email.split('@')[1].toLowerCase();
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'aol.com'];
    return validDomains.includes(domain);
  };

  // Función para validar formulario
  const validateForm = (): boolean => {
    const newErrors: TFieldErrors = {};

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!isValidEmail(formData.correo)) {
      newErrors.correo = 'Correo inválido. Usa gmail, yahoo, outlook, hotmail, icloud o aol';
    }

    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (fieldErrors[name as keyof TFieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    // TODO: Llamar al backend con formData
    // await loginUsuario(formData);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log In</h1>

        {generalError && <div className={styles.error}>{generalError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="correo" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            className={fieldErrors.correo ? styles.inputError : styles.input}
            value={formData.correo}
            onChange={handleChange}
          />
          {fieldErrors.correo && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.correo}</div>}

          <label htmlFor="contrasena" className={styles.label}>
            Contraseña
          </label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="********"
            className={fieldErrors.contrasena ? styles.inputError : styles.input}
            value={formData.contrasena}
            onChange={handleChange}
          />
          {fieldErrors.contrasena && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.contrasena}</div>}

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar ➡️'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className={styles.link}>
            Regístrate aquí
          </Link>
        </div>
      </div>
    </main>
  );
}