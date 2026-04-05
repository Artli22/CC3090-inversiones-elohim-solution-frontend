'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '@/components/auth/page.module.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    confirmPassword: '',
    telefono: '',
    direccion: '',
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

    if (formData.contrasena !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            className={styles.input}
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="apellido" className={styles.label}>
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Tu apellido"
            className={styles.input}
            value={formData.apellido}
            onChange={handleChange}
            required
          />

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

          <label htmlFor="telefono" className={styles.label}>
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="+1234567890"
            className={styles.input}
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="direccion" className={styles.label}>
            Dirección
          </label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            placeholder="Tu dirección completa"
            className={styles.input}
            value={formData.direccion}
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

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            className={styles.input}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse ➡️'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className={styles.link}>
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </main>
  );
}