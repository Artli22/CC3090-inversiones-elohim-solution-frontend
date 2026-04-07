'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '@/app/components/auth/page.module.css';

type TFieldErrors = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  contrasena?: string;
  confirmPassword?: string;
};

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

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!isValidEmail(formData.correo)) {
      newErrors.correo = 'Correo inválido. Usa gmail, yahoo, outlook, hotmail, icloud o aol';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }

    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    } else if (formData.contrasena.length < 8) {
      newErrors.contrasena = 'La contraseña debe tener mínimo 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';
    } else if (formData.contrasena !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
    // TODO: Llamar al backend con formData (sin confirmPassword)
    // const datosRegistro = { ...formData };
    // delete datosRegistro.confirmPassword;
    // await registrarUsuario(datosRegistro);
    setIsLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>

        {generalError && <div className={styles.error}>{generalError}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            className={fieldErrors.nombre ? styles.inputError : styles.input}
            value={formData.nombre}
            onChange={handleChange}
          />
          {fieldErrors.nombre && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.nombre}</div>}

          <label htmlFor="apellido" className={styles.label}>
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Tu apellido"
            className={fieldErrors.apellido ? styles.inputError : styles.input}
            value={formData.apellido}
            onChange={handleChange}
          />
          {fieldErrors.apellido && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.apellido}</div>}

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

          <label htmlFor="telefono" className={styles.label}>
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="+1234567890"
            className={fieldErrors.telefono ? styles.inputError : styles.input}
            value={formData.telefono}
            onChange={handleChange}
          />
          {fieldErrors.telefono && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.telefono}</div>}

          <label htmlFor="direccion" className={styles.label}>
            Dirección
          </label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            placeholder="Tu dirección completa"
            className={fieldErrors.direccion ? styles.inputError : styles.input}
            value={formData.direccion}
            onChange={handleChange}
          />
          {fieldErrors.direccion && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.direccion}</div>}

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

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            className={fieldErrors.confirmPassword ? styles.inputError : styles.input}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {fieldErrors.confirmPassword && <div className={styles.error} style={{ marginBottom: '0px', marginTop: '-8px' }}>{fieldErrors.confirmPassword}</div>}

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
