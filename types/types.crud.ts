// types.crud.ts
// 1) Enums  2) Tipos de formulario (UI)  3) Tipos de persistencia (DB-ready)
// 4) Helpers de normalización  5) Mappers form -> persist

/* ========================= Enums ========================= */

export type Modalidad = "ALEMAN" | "FRANCES";
export type TipoCuota = "ORDINARIA" | "ADICIONAL";

/* ====================== Utilitarios ====================== */

export type DateString = string; // "YYYY-MM-DD" o ISO
export type DecimalString = string; // "123.4567"

/** Normaliza number|string a string con 4 decimales (para DECIMAL(14,4)) */
export function toDecimal4(v: DecimalString | number): number {
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isNaN(n)) {
      return n;
    }
  } else {
    return v;
  }
  return 0;
}

/** Helper para nullables: aplica normalizador o deja null/undefined */
function mapNullable<T, R>(
  value: T | null | undefined,
  f: (x: T) => R
): R | null {
  return value == null ? null : f(value);
}

/* ================== Types de Formularios (UI) ================== */
/* Fechas: DateString  | Decimales: DecimalString | FK: number | boolean/string según corresponda */

export interface UsuarioForm {
  username: string;
  password: string;
  rolId?: number | null;
  idSocio?: number | null;
}
export type UsuarioUpdateForm = Partial<UsuarioForm>;

export interface VariablesForm {
  descripcion: string;
  valor: DecimalString;
}
export type VariablesUpdateForm = Partial<VariablesForm>;

export interface RolForm {
  descripcion: string;
}
export type RolUpdateForm = Partial<RolForm>;

export interface SocioForm {
  cedula: string;
  nombre: string;
  fechaNacimiento?: DateString | null;
  fechaIngreso?: DateString | null;
  fechaSalida?: DateString | null;
  montoAccion?: DecimalString | null;
  multiplicador?: number | null;
  correo: string;
  telefono: string;
}
export type SocioUpdateForm = Partial<SocioForm>;

export interface AccionForm {
  socioId: number;
  fecha: DateString;
  monto_colones: DecimalString;
  cantidadAcciones: number;
  periodo?: string | null;
  pesoMultiplicador?: number | null;
}
export type AccionUpdateForm = Partial<AccionForm>;

export interface PrestamoForm {
  socioId: number;
  monto: DecimalString;
  plazo: number;
  motivo?: string | null;
  modalidad: Modalidad;
  saldoCapital: DecimalString;
  saldoInteresOrdinario: DecimalString;
  saldoInteresMoratorio: DecimalString;
}
export type PrestamoUpdateForm = Partial<PrestamoForm>;

export interface PagoForm {
  socioId: number;
  prestamoId?: number | null;
  fechaProyectada: DateString;
  fechaReal?: DateString | null;
  diasAtraso?: number | null;
  monto: DecimalString;
  interesOrdinario: DecimalString;
  tipoCuota: TipoCuota;
  interesExtraordinario?: DecimalString | null;
}
export type PagoUpdateForm = Partial<PagoForm>;

export interface SolicitudForm {
  socioId: number;
  fechaSolicitud: DateString;
  detalle?: string | null;
  aprobada?: boolean;
  fechaAprobacion?: DateString | null;
  cerrada?: boolean;
}
export type SolicitudUpdateForm = Partial<SolicitudForm>;

export interface VotacionForm {
  socioId: number;
  solicitudId: number;
  fecha: DateString;
  hora?: string | null; // "HH:mm"
  observacion?: string | null;
  aprueba?: boolean;
}
export type VotacionUpdateForm = Partial<VotacionForm>;

/* ============== Types de Persistencia (DB-ready) ============== */
/* Fechas: Date | Decimales: string (con 4 decimales) */

export interface UsuarioPersist {
  username: string;
  password: string;
  rolId: number | null;
  idSocio: number | null;
}

export interface VariablesPersist {
  descripcion: string;
  valor: number; // "####.####"
}

export interface RolPersist {
  descripcion: string;
}

export interface SocioPersist {
  cedula: string;
  nombre: string;
  fechaNacimiento: string | null;
  fechaIngreso: string | null;
  fechaSalida: string | null;
  montoAccion: number | null; // "####.####"
  multiplicador: number | null;
  correo: string;
  telefono: string;
}

export interface AccionPersist {
  socioId: number;
  fecha: string;
  monto_colones: number; // "####.####"
  cantidadAcciones: number;
  periodo: string | null;
  pesoMultiplicador: number | null;
}

export interface PrestamoPersist {
  socioId: number;
  monto: number;
  plazo: number;
  motivo: string | null;
  modalidad: Modalidad;
  saldoCapital: number;
  saldoInteresOrdinario: number;
  saldoInteresMoratorio: number;
}

export interface PagoPersist {
  socioId: number;
  prestamoId: number | null;
  fechaProyectada: string;
  fechaReal: string | null;
  diasAtraso: number | null;
  monto: number;
  interesOrdinario: number;
  tipoCuota: TipoCuota;
  interesExtraordinario: number | null;
}

export interface SolicitudPersist {
  socioId: number;
  fechaSolicitud: string;
  detalle: string | null;
  aprobada: boolean; // si no viene, default en DB
  fechaAprobacion: string | null;
  cerrada: boolean; // si no viene, default en DB
}

export interface VotacionPersist {
  socioId: number;
  solicitudId: number;
  fecha: string;
  hora: string | null;
  observacion: string | null;
  aprueba: boolean; // si no viene, default en DB
}

/* ================== Mappers: form -> persist ================== */
/* Convierte los types de formulario a los DB-ready (para prisma.create/update) */

export function mapUsuarioFormToPersist(
  f: UsuarioForm | UsuarioUpdateForm
): UsuarioPersist {
  return {
    username: f.username ?? "",
    password: f.password ?? "",
    rolId: (f as UsuarioForm).rolId ?? null,
    idSocio: (f as UsuarioForm).idSocio ?? null,
  };
}

export function mapVariablesFormToPersist(
  f: VariablesForm | VariablesUpdateForm
): VariablesPersist {
  return {
    descripcion: f.descripcion ?? "",
    valor: toDecimal4((f as VariablesForm).valor ?? "0"),
  };
}

export function mapRolFormToPersist(f: RolForm | RolUpdateForm): RolPersist {
  return {
    descripcion: f.descripcion ?? "",
  };
}

export function mapSocioFormToPersist(
  f: SocioForm | SocioUpdateForm
): SocioPersist {
  return {
    cedula: f.cedula ?? "",
    nombre: f.nombre ?? "",
    fechaNacimiento: f.fechaNacimiento ?? null,
    fechaIngreso: f.fechaIngreso ?? null,
    fechaSalida: f.fechaSalida ?? null,
    montoAccion: mapNullable((f as SocioForm).montoAccion, toDecimal4),
    multiplicador: (f as SocioForm).multiplicador ?? null,
    correo: f.correo ?? "",
    telefono: f.telefono ?? "",
  };
}

export function mapAccionFormToPersist(
  f: AccionForm | AccionUpdateForm
): AccionPersist {
  return {
    socioId: (f as AccionForm).socioId ?? 0,
    fecha: f.fecha ?? "",
    monto_colones: toDecimal4((f as AccionForm).monto_colones ?? "0"),
    cantidadAcciones: (f as AccionForm).cantidadAcciones ?? 0,
    periodo: (f as AccionForm).periodo ?? null,
    pesoMultiplicador: (f as AccionForm).pesoMultiplicador ?? null,
  };
}

export function mapPrestamoFormToPersist(
  f: PrestamoForm | PrestamoUpdateForm
): PrestamoPersist {
  return {
    socioId: (f as PrestamoForm).socioId ?? 0,
    monto: toDecimal4((f as PrestamoForm).monto ?? "0"),
    plazo: (f as PrestamoForm).plazo ?? 0,
    motivo: (f as PrestamoForm).motivo ?? null,
    modalidad: (f as PrestamoForm).modalidad ?? "FRANCES",
    saldoCapital: toDecimal4((f as PrestamoForm).saldoCapital ?? "0"),
    saldoInteresOrdinario: toDecimal4(
      (f as PrestamoForm).saldoInteresOrdinario ?? "0"
    ),
    saldoInteresMoratorio: toDecimal4(
      (f as PrestamoForm).saldoInteresMoratorio ?? "0"
    ),
  };
}

export function mapPagoFormToPersist(
  f: PagoForm | PagoUpdateForm
): PagoPersist {
  return {
    socioId: (f as PagoForm).socioId ?? 0,
    prestamoId: (f as PagoForm).prestamoId ?? null,
    fechaProyectada: f.fechaProyectada ?? "",
    fechaReal: f.fechaReal ?? "",
    diasAtraso: (f as PagoForm).diasAtraso ?? null,
    monto: toDecimal4((f as PagoForm).monto ?? "0"),
    interesOrdinario: toDecimal4((f as PagoForm).interesOrdinario ?? "0"),
    tipoCuota: (f as PagoForm).tipoCuota ?? "ORDINARIA",
    interesExtraordinario: mapNullable(
      (f as PagoForm).interesExtraordinario,
      toDecimal4
    ),
  };
}

export function mapSolicitudFormToPersist(
  f: SolicitudForm | SolicitudUpdateForm
): SolicitudPersist {
  return {
    socioId: (f as SolicitudForm).socioId ?? 0,
    fechaSolicitud: f.fechaSolicitud ?? "",
    detalle: (f as SolicitudForm).detalle ?? null,
    aprobada: (f as SolicitudForm).aprobada ?? false,
    fechaAprobacion: f.fechaAprobacion ?? null,
    cerrada: (f as SolicitudForm).cerrada ?? false,
  };
}

export function mapVotacionFormToPersist(
  f: VotacionForm | VotacionUpdateForm
): VotacionPersist {
  return {
    socioId: (f as VotacionForm).socioId ?? 0,
    solicitudId: (f as VotacionForm).solicitudId ?? 0,
    fecha: f.fecha ?? "",
    hora: (f as VotacionForm).hora ?? null,
    observacion: (f as VotacionForm).observacion ?? null,
    aprueba: (f as VotacionForm).aprueba ?? false,
  };
}

/* ================= Ejemplos de uso =================
import { PrestamoForm, mapPrestamoFormToPersist } from "./types.crud";

const formData: PrestamoForm = {
  socioId: 1,
  monto: "150000",
  plazo: 12,
  modalidad: "FRANCES",
  saldoCapital: "150000",
  saldoInteresOrdinario: "0",
  saldoInteresMoratorio: "0",
};

const data = mapPrestamoFormToPersist(formData);
// prisma.prestamo.create({ data })
===================================================== */
