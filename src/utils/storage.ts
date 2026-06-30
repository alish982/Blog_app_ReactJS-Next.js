const isBrowser = typeof window !== "undefined";

export function getStorageItem<T>(key: string): T | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Error", e);
  }
}

export function removeStorageItem(key: string): void {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
}
