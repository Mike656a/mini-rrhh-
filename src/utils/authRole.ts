/**
 * Algunas sesiones antiguas guardaron role como { code, name } en localStorage,
 * mientras que la versión actual utiliza un string. Mostrar siempre texto
 * evita el error de React "Objects are not valid as a React child".
 */
export function getAuthRoleLabel(role: unknown): string {
  if (typeof role === 'string') {
    const labels: Record<string, string> = {
      admin: 'Administrador',
      hr: 'Recursos Humanos',
      employee: 'Empleado',
    };

    const trimmed = role.trim();
    return labels[trimmed.toLowerCase()] ?? (trimmed || 'Usuario');
  }

  if (role !== null && typeof role === 'object') {
    const value = role as { name?: unknown; code?: unknown };
    if (typeof value.name === 'string' && value.name.trim()) {
      return value.name.trim();
    }
    if (typeof value.code === 'string') {
      return getAuthRoleLabel(value.code);
    }
  }

  return 'Usuario';
}
