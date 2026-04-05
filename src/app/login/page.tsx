'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '@/components/auth/page.module.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    // TODO: Llamar al backend con formData
    // await loginUsuario(formData);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log In</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="correo" className={styles.label}>
            Correo electrónico
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            className={styles.input}
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasena" className={styles.label}>
            Contraseña
          </label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="********"
            className={styles.input}
            value={formData.contrasena}
            onChange={handleChange}
            required
          />

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