//@ts-ignore

// app/prestamos/create/page.tsx  (Next.js App Router)  — o  src/pages/prestamos/create.tsx (Pages Router)
"use client";

import React, { useState } from "react";
import {
  // Types de formulario
  PrestamoForm,
  // Helpers/mappers
  newPrestamoForm, // si no lo tienes, inicializa a mano como en initialState
  mapPrestamoFormToPersist,
  // Enums
  Modalidad,
} from "@/types.crud"; // <-- ajusta la ruta a tu archivo real

// --- Validación con Zod (mínima y local a esta página) ---
import { z } from "zod";

const PrestamoFormZ = z.object({
  socioId: z.number().int().min(1, "Seleccione un socio válido"),
  monto: z.string().min(1, "El monto es requerido"),
  plazo: z.number().int().min(1, "El plazo debe ser al menos 1 mes"),
  motivo: z.string().nullable().optional(),
  modalidad: z.enum(["ALEMAN", "FRANCES"]),
  saldoCapital: z.string().min(1),
  saldoInteresOrdinario: z.string().min(1),
  saldoInteresMoratorio: z.string().min(1),
});

type PrestamoFormErrors = Partial<
  Record<keyof z.infer<typeof PrestamoFormZ>, string>
>;

export default function PrestamoCreatePage() {
  // Estado del form (creación). Si no tienes newPrestamoForm, usa el objeto initialState de abajo.
  const [form, setForm] = useState<PrestamoForm>(
    newPrestamoForm
      ? newPrestamoForm()
      : {
          socioId: 0,
          monto: "0.0000",
          plazo: 1,
          modalidad: "FRANCES",
          saldoCapital: "0.0000",
          saldoInteresOrdinario: "0.0000",
          saldoInteresMoratorio: "0.0000",
          motivo: null,
        }
  );

  const [errors, setErrors] = useState<PrestamoFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const modalidades: Modalidad[] = ["ALEMAN", "FRANCES"];

  // Handlers tipados
  const onText = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value } as PrestamoForm));
  };

  const onNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(
      (prev) =>
        ({
          ...prev,
          [name]: value === "" ? ("" as any) : Number(value),
        } as PrestamoForm)
    );
  };

  // Validación + submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Zod parse
    const result = PrestamoFormZ.safeParse(form);
    if (!result.success) {
      // mapea errores campo a campo
      const fieldErrors: PrestamoFormErrors = {};
      result.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof PrestamoFormErrors;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Mapear a persistencia (fechas -> Date, decimales -> string(4))
    const toPersist = mapPrestamoFormToPersist(form);

    setSubmitting(true);
    try {
      // Llama tu API — ajusta la URL y payload a tu backend real
      const res = await fetch("/api/prestamos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPersist),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Error al crear préstamo");
        throw new Error(msg);
      }

      // TODO: redirige a la lista o muestra un toast de éxito
      alert("Préstamo creado correctamente ✅");
      // router.push("/prestamos");
    } catch (err: any) {
      alert(`Error: ${err.message ?? "No se pudo crear el préstamo"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Crear préstamo</h1>

      <form onSubmit={onSubmit}>
        {/* Socio */}
        <Field label="Socio ID" error={errors.socioId}>
          <input
            type="number"
            name="socioId"
            value={form.socioId}
            onChange={onNumber}
            min={1}
            required
          />
        </Field>

        {/* Monto */}
        <Field label="Monto" error={errors.monto}>
          <input
            name="monto"
            value={form.monto}
            onChange={onText}
            placeholder="150000.0000"
            required
          />
        </Field>

        {/* Plazo */}
        <Field label="Plazo (meses)" error={errors.plazo}>
          <input
            type="number"
            name="plazo"
            value={form.plazo}
            onChange={onNumber}
            min={1}
            required
          />
        </Field>

        {/* Modalidad */}
        <Field label="Modalidad" error={errors.modalidad}>
          <select name="modalidad" value={form.modalidad} onChange={onText}>
            {modalidades.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>

        {/* Saldos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          <Field label="Saldo capital" error={errors.saldoCapital}>
            <input
              name="saldoCapital"
              value={form.saldoCapital}
              onChange={onText}
              required
            />
          </Field>

          <Field label="Interés ordinario" error={errors.saldoInteresOrdinario}>
            <input
              name="saldoInteresOrdinario"
              value={form.saldoInteresOrdinario}
              onChange={onText}
              required
            />
          </Field>

          <Field label="Interés moratorio" error={errors.saldoInteresMoratorio}>
            <input
              name="saldoInteresMoratorio"
              value={form.saldoInteresMoratorio}
              onChange={onText}
              required
            />
          </Field>
        </div>

        {/* Motivo */}
        <Field label="Motivo (opcional)" error={errors.motivo}>
          <textarea
            name="motivo"
            value={form.motivo ?? ""}
            onChange={onText}
            rows={3}
          />
        </Field>

        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <button type="submit" disabled={submitting}>
            {submitting ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            onClick={() =>
              setForm(
                newPrestamoForm
                  ? newPrestamoForm()
                  : {
                      socioId: 0,
                      monto: "0.0000",
                      plazo: 1,
                      modalidad: "FRANCES",
                      saldoCapital: "0.0000",
                      saldoInteresOrdinario: "0.0000",
                      saldoInteresMoratorio: "0.0000",
                      motivo: null,
                    }
              )
            }
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------- Componentes UI simples -------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {error ? (
        <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
