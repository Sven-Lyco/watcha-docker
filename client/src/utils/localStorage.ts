function loadFromLocal(key: string): any {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null; // Oder den gewünschten Standardwert verwenden
  } catch (error) {
    console.error(error);
  }
}

function saveToLocal(key: any, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { loadFromLocal, saveToLocal };
