import dayjs from "dayjs";
import "dayjs/locale/es";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";

// Activar plugins
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.locale("es");

/**
 * Formatea una fecha mostrando:
 * - "Hoy" si la fecha es hoy
 * - "Ayer" si la fecha es ayer
 * - Fecha formateada (DD/MM/YYYY) en otros casos
 */
export function formatCustomDate(dateString: Date): string {
  const date = dayjs(dateString);

  if (date.isToday()) return "Hoy";
  if (date.isYesterday()) return "Ayer";

  return date.format("DD/MM/YYYY");
}