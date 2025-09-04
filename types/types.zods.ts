// types.zod.ts
// Esquemas Zod para validar los formularios definidos en types.crud.ts
// + helpers validateAndMap* → validan y luego mapean a persistencia (DB-ready)

import { z } from "zod";
import {
  AccionForm,
  AccionPersist,
  mapAccionFormToPersist,
  mapPagoFormToPersist,
  mapPrestamoFormToPersist,
  mapRolFormToPersist,
  mapSocioFormToPersist,
  mapSolicitudFormToPersist,
  // mappers form -> persist
  mapUsuarioFormToPersist,
  mapVariablesFormToPersist,
  mapVotacionFormToPersist,
  PagoForm,
  PagoPersist,
  PrestamoForm,
  PrestamoPersist,
  RolForm,
  RolPersist,
  SocioForm,
  SocioPersist,
  SolicitudForm,
  SolicitudPersist,
  // forms (UI)
  UsuarioForm,
  // tipos persist (para devolver en validateAndMap)
  UsuarioPersist,
  VariablesForm,
  VariablesPersist,
  VotacionForm,
  VotacionPersist,
} from "./types.crud";

/* ==================== Validadores reutilizables ==================== */

// Fecha en string ("YYYY-MM-DD" o ISO) que sea parseable por Date.parse
export const DateStringZ = z
  .string()
  .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Fecha inválida" });

// Decimal(14,4) como string: +/- enteros y hasta 4 decimales
// Ejemplos válidos: "0", "12", "-5", "150000.25", "1.0000"
export const DecimalStringZ = z.string().regex(/^-?\d+(\.\d{1,4})?$/, {
  message: "Número decimal con hasta 4 decimales requerido (p.ej. 123.4567)",
});

// Enums (coinciden con tus literales de los forms)
export const ModalidadZ = z.enum(["ALEMAN", "FRANCES"]);
export const TipoCuotaZ = z.enum(["ORDINARIA", "ADICIONAL"]);

/* ========================== Usuario ========================== */

export const UsuarioFormZ = z.object({
  username: z.string().min(1, "Requerido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  rolId: z.number().int().nullable().optional(),
  idSocio: z.number().int().nullable().optional(),
});
export type UsuarioFormParsed = z.infer<typeof UsuarioFormZ>;

export const UsuarioUpdateFormZ = UsuarioFormZ.partial();

/* ========================= Variables ========================= */

export const VariablesFormZ = z.object({
  descripcion: z.string().min(1, "Requerido"),
  valor: DecimalStringZ,
});
export type VariablesFormParsed = z.infer<typeof VariablesFormZ>;

export const VariablesUpdateFormZ = VariablesFormZ.partial();

/* ============================ Rol ============================ */

export const RolFormZ = z.object({
  descripcion: z.string().min(1, "Requerido"),
});
export type RolFormParsed = z.infer<typeof RolFormZ>;

export const RolUpdateFormZ = RolFormZ.partial();

/* =========================== Socio =========================== */

export const SocioFormZ = z.object({
  cedula: z.string().min(1, "La identificación es requerida"),
  nombre: z.string().min(1, "El nombre un campo Requerido"),
  fechaNacimiento: DateStringZ.nullable().optional(),
  fechaIngreso: DateStringZ.nullable().optional(),
  fechaSalida: DateStringZ.nullable().optional(),
  montoAccion: DecimalStringZ.nullable().optional(),
  multiplicador: z.number().int().nullable().optional(),
  correo: z.email("Correo inválido"),
  telefono: z.string().nullable().optional(),
});

export type SocioFormParsed = z.infer<typeof SocioFormZ>;

export const SocioUpdateFormZ = SocioFormZ.partial();

/* =========================== Accion ========================== */

export const AccionFormZ = z.object({
  socioId: z.number().int(),
  fecha: DateStringZ,
  monto_colones: DecimalStringZ,
  cantidadAcciones: z.number().int().min(1, "≥ 1"),
  periodo: z.string().nullable().optional(),
  pesoMultiplicador: z.number().int().nullable().optional(),
});
export type AccionFormParsed = z.infer<typeof AccionFormZ>;

export const AccionUpdateFormZ = AccionFormZ.partial();

/* ========================== Prestamo ========================= */

export const PrestamoFormZ = z.object({
  socioId: z.number().int(),
  monto: DecimalStringZ,
  plazo: z.number().int().min(1, "≥ 1 mes"),
  motivo: z.string().nullable().optional(),
  modalidad: ModalidadZ, // "ALEMAN" | "FRANCES"
  saldoCapital: DecimalStringZ,
  saldoInteresOrdinario: DecimalStringZ,
  saldoInteresMoratorio: DecimalStringZ,
});
export type PrestamoFormParsed = z.infer<typeof PrestamoFormZ>;

export const PrestamoUpdateFormZ = PrestamoFormZ.partial();

/* ============================ Pago =========================== */

export const PagoFormZ = z.object({
  socioId: z.number().int(),
  prestamoId: z.number().int().nullable().optional(),
  fechaProyectada: DateStringZ,
  fechaReal: DateStringZ.nullable().optional(),
  diasAtraso: z.number().int().nullable().optional(),
  monto: DecimalStringZ,
  interesOrdinario: DecimalStringZ,
  tipoCuota: TipoCuotaZ, // "ORDINARIA" | "ADICIONAL"
  interesExtraordinario: DecimalStringZ.nullable().optional(),
});
export type PagoFormParsed = z.infer<typeof PagoFormZ>;

export const PagoUpdateFormZ = PagoFormZ.partial();

/* ========================= Solicitud ========================= */

export const SolicitudFormZ = z.object({
  socioId: z.number().int(),
  fechaSolicitud: DateStringZ,
  detalle: z.string().nullable().optional(),
  aprobada: z.boolean().optional(),
  fechaAprobacion: DateStringZ.nullable().optional(),
  cerrada: z.boolean().optional(),
});
export type SolicitudFormParsed = z.infer<typeof SolicitudFormZ>;

export const SolicitudUpdateFormZ = SolicitudFormZ.partial();

/* ========================= Votacion ========================== */

export const VotacionFormZ = z.object({
  socioId: z.number().int(),
  solicitudId: z.number().int(),
  fecha: DateStringZ,
  hora: z.string().nullable().optional(), // "HH:mm" si lo usas
  observacion: z.string().nullable().optional(),
  aprueba: z.boolean().optional(),
});
export type VotacionFormParsed = z.infer<typeof VotacionFormZ>;

export const VotacionUpdateFormZ = VotacionFormZ.partial();

/* ================= Helpers validate & map ================== */
/* Devuelven el objeto DB-ready usando tus mappers si la validación pasa. */

export function validateAndMapUsuario(form: UsuarioForm): UsuarioPersist {
  const parsed = UsuarioFormZ.parse(form);
  return mapUsuarioFormToPersist(parsed);
}
export function validateAndMapVariables(form: VariablesForm): VariablesPersist {
  const parsed = VariablesFormZ.parse(form);
  return mapVariablesFormToPersist(parsed);
}
export function validateAndMapRol(form: RolForm): RolPersist {
  const parsed = RolFormZ.parse(form);
  return mapRolFormToPersist(parsed);
}
export function validateAndMapSocio(form: SocioForm): SocioPersist {
  const parsed = SocioFormZ.parse(form);
  return mapSocioFormToPersist(parsed);
}
export function validateAndMapAccion(form: AccionForm): AccionPersist {
  const parsed = AccionFormZ.parse(form);
  return mapAccionFormToPersist(parsed);
}
export function validateAndMapPrestamo(form: PrestamoForm): PrestamoPersist {
  const parsed = PrestamoFormZ.parse(form);
  return mapPrestamoFormToPersist(parsed);
}
export function validateAndMapPago(form: PagoForm): PagoPersist {
  const parsed = PagoFormZ.parse(form);
  return mapPagoFormToPersist(parsed);
}
export function validateAndMapSolicitud(form: SolicitudForm): SolicitudPersist {
  const parsed = SolicitudFormZ.parse(form);
  return mapSolicitudFormToPersist(parsed);
}
export function validateAndMapVotacion(form: VotacionForm): VotacionPersist {
  const parsed = VotacionFormZ.parse(form);
  return mapVotacionFormToPersist(parsed);
}

/* ============== Export agrupado (cómodo de importar) ============== */
export const Schemas = {
  UsuarioFormZ,
  UsuarioUpdateFormZ,
  VariablesFormZ,
  VariablesUpdateFormZ,
  RolFormZ,
  RolUpdateFormZ,
  SocioFormZ,
  SocioUpdateFormZ,
  AccionFormZ,
  AccionUpdateFormZ,
  PrestamoFormZ,
  PrestamoUpdateFormZ,
  PagoFormZ,
  PagoUpdateFormZ,
  SolicitudFormZ,
  SolicitudUpdateFormZ,
  VotacionFormZ,
  VotacionUpdateFormZ,
};
