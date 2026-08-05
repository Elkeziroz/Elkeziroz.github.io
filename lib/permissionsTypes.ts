export type PermissionKey =
  | "can_manage_events"
  | "can_create_notices"
  | "can_manage_web"
  | "can_review_apps"
  | "can_manage_users"
  | "can_manage_system"
  | "can_manage_tasks";

export type RoleDefinition = {
  key: string;
  name: string;
  level: number;
};

export const MANAGED_ROLES: RoleDefinition[] = [
  { key: "admin", name: "Administrador", level: 90 },
  { key: "smod", name: "Supervisor / SMod", level: 80 },
  { key: "dev", name: "Developer", level: 70 },
  { key: "mod", name: "Moderador", level: 60 },
  { key: "soporte", name: "Soporte", level: 40 },
  { key: "ayudante", name: "Ayudante", level: 20 },
];

export const PERMISSION_DEFINITIONS: { key: PermissionKey; label: string; description: string }[] = [
  { key: "can_manage_tasks", label: "Gestión de Tareas Staff", description: "Acceso total a la página de tareas, asignación a miembros de Discord y control de prioridades" },
  { key: "can_manage_events", label: "Gestión de Eventos", description: "Crear, editar y publicar eventos en la página principal" },
  { key: "can_create_notices", label: "Avisos Internos Staff", description: "Publicar y responder comunicados oficiales para el equipo" },
  { key: "can_manage_web", label: "Ajustes de la Web", description: "Personalizar imágenes, textos, galerías, wiki e IPs públicas" },
  { key: "can_review_apps", label: "Solicitudes de Staff", description: "Revisar, aceptar, rechazar o eliminar postulaciones enviadas" },
  { key: "can_manage_users", label: "Gestión de Usuarios", description: "Buscar jugadores y revisar registro de sanciones" },
  { key: "can_manage_system", label: "Sistema & Arquitectura", description: "Ver estado técnico y matriz de permisos del servidor" },
];

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Record<PermissionKey, boolean>> = {
  admin: {
    can_manage_tasks: true,
    can_manage_events: true,
    can_create_notices: true,
    can_manage_web: true,
    can_review_apps: true,
    can_manage_users: true,
    can_manage_system: true,
  },
  smod: {
    can_manage_tasks: false,
    can_manage_events: true,
    can_create_notices: true,
    can_manage_web: false,
    can_review_apps: true,
    can_manage_users: true,
    can_manage_system: false,
  },
  dev: {
    can_manage_tasks: false,
    can_manage_events: true,
    can_create_notices: true,
    can_manage_web: true,
    can_review_apps: false,
    can_manage_users: false,
    can_manage_system: true,
  },
  mod: {
    can_manage_tasks: false,
    can_manage_events: false,
    can_create_notices: true,
    can_manage_web: false,
    can_review_apps: true,
    can_manage_users: true,
    can_manage_system: false,
  },
  soporte: {
    can_manage_tasks: false,
    can_manage_events: false,
    can_create_notices: true,
    can_manage_web: false,
    can_review_apps: false,
    can_manage_users: true,
    can_manage_system: false,
  },
  ayudante: {
    can_manage_tasks: false,
    can_manage_events: false,
    can_create_notices: true,
    can_manage_web: false,
    can_review_apps: false,
    can_manage_users: false,
    can_manage_system: false,
  },
};
