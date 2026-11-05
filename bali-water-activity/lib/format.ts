/** "06 minutes" to "6 min", "2 hours on water" stays as it is. */
export function shortDuration(duration: string): string {
  return duration.replace(/^0(\d)/, "$1").replace(/\bminutes?\b/, "min");
}
