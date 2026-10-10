import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './UnauthorizedPage.css';

type UnauthorizedReason = 'credentials' | 'session' | 'required';

interface UnauthorizedLocationState {
  reason?: UnauthorizedReason;
}

export default function UnauthorizedPage() {
  const location = useLocation();
  const clearError = useAuthStore((state) => state.clearError);
  const state = location.state as UnauthorizedLocationState | null;
  const reason = state?.reason ?? 'session';
  const invalidCredentials = reason === 'credentials';
  const requiresLogin = reason === 'required';

  const title = invalidCredentials
    ? 'No pudimos verificar tus datos'
    : requiresLogin
      ? 'Identifícate para continuar'
      : 'Tu acceso necesita renovarse';

  const description = invalidCredentials
    ? 'El correo o la contraseña no coinciden con una cuenta autorizada. Revisa tus datos y vuelve a intentarlo.'
    : requiresLogin
      ? 'Este apartado es privado. Ingresa con tu cuenta para acceder a la información del personal.'
      : 'Por seguridad, tu sesión dejó de ser válida o ha caducado. Inicia sesión nuevamente para continuar.';

  return (
    <main className="access-page">
      <div className="access-ambient access-ambient-one" aria-hidden="true" />
      <div className="access-ambient access-ambient-two" aria-hidden="true" />

      <div className="access-shell">
        <header className="access-brand" aria-label="Mini RRHH">
          <span className="access-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="8" r="3" />
              <path d="M3.5 19v-1.3A5.7 5.7 0 0 1 9.2 12h.6a5.7 5.7 0 0 1 5.7 5.7V19" />
              <path d="M16 5.5a3 3 0 0 1 0 5.8M18 13.2a4.8 4.8 0 0 1 2.5 4.3V19" />
            </svg>
          </span>
          <span>Mini RRHH <span className="access-brand-divider">/</span> Seguridad</span>
        </header>

        <section className="access-card" aria-labelledby="unauthorized-heading">
          <div className="access-visual" aria-hidden="true">
            <span className="access-eyebrow">CONTROL DE ACCESO</span>
            <div className="access-orbit access-orbit-outer" />
            <div className="access-orbit access-orbit-inner" />
            <div className="access-shield">
              <svg viewBox="0 0 100 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 6 88 21v28c0 26-15.4 43.5-38 59-22.6-15.5-38-33-38-59V21L50 6Z" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" />
                <rect x="33" y="50" width="34" height="27" rx="5" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="4" />
                <path d="M40 50V39a10 10 0 0 1 20 0v11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="50" cy="63" r="3" fill="currentColor" />
                <path d="M50 66v5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="access-large-code">401</span>
            <span className="access-visual-caption">Solicitud no autorizada</span>
          </div>

          <div className="access-content">
            <div className="access-status"><span className="access-status-dot" /> ERROR DE AUTENTICACIÓN · 401</div>
            <h1 id="unauthorized-heading">{title}</h1>
            <p className="access-description">{description}</p>

            <div className="access-note">
              <span className="access-note-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5h.01" />
                </svg>
              </span>
              <p>Tus datos están protegidos. No se realizó ningún cambio en la información de empleados.</p>
            </div>

            <Link to="/login" onClick={clearError} className="access-primary-button">
              {invalidCredentials ? 'Intentar nuevamente' : 'Ir a iniciar sesión'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <p className="access-support">Si el problema continúa, comunícate con el administrador del sistema.</p>
          </div>
        </section>
        <footer className="access-footer">Mini RRHH <span aria-hidden="true">·</span> Gestión segura del personal</footer>
      </div>
    </main>
  );
}
