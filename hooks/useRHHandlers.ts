import { useCallback } from "react";

// Convierte Date → "YYYY-MM-DD"
function toYmd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Crea handlers para un formulario T (p. ej. PrestamoForm, PagoForm, etc.) */
export function useRNHandlers<T>(setForm: React.Dispatch<React.SetStateAction<T>>) {
  /** TextInput.onChangeText — guarda string */
  const onText = useCallback(
    <K extends keyof T>(key: K) =>
      (value: string) => {
        setForm(prev => ({ ...prev, [key]: value } as T));
      },
    [setForm]
  );

  /** TextInput numérico — guarda number o "" si lo borran */
  const onNumber = useCallback(
    <K extends keyof T>(key: K) =>
      (value: string) => {
        const v = value.trim();
        setForm(prev => ({ ...prev, [key]: v === "" ? ("" as any) : Number(v) } as T));
      },
    [setForm]
  );

  /** TextInput para decimales — guarda string tal cual (lo normalizas en el mapper) */
  const onDecimal = useCallback(
    <K extends keyof T>(key: K) =>
      (value: string) => {
        setForm(prev => ({ ...prev, [key]: value } as T));
      },
    [setForm]
  );

  /** DateTimePicker.onChange — guarda "YYYY-MM-DD" (DateString) */
  const onDateFromPicker = useCallback(
    <K extends keyof T>(key: K) =>
      (_event: any, date?: Date) => {
        if (!date) return; // iOS cancela
        setForm(prev => ({ ...prev, [key]: toYmd(date) } as T));
      },
    [setForm]
  );

  /** TextInput para fechas — guarda "YYYY-MM-DD" que el usuario teclee */
  const onDateFromText = useCallback(
    <K extends keyof T>(key: K) =>
      (value: string) => {
        // aquí puedes validar regex YYYY-MM-DD si quieres
        setForm(prev => ({ ...prev, [key]: value } as T));
      },
    [setForm]
  );

  /** Picker/Switch/etc. — guarda el value tipado */
  const onValue = useCallback(
    <K extends keyof T>(key: K) =>
      (value: T[K]) => {
        setForm(prev => ({ ...prev, [key]: value } as T));
      },
    [setForm]
  );

  return { onText, onNumber, onDecimal, onDateFromPicker, onDateFromText, onValue };
}
