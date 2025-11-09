import { useEffect } from 'react'

export function formatCurrency(currency: number) {
  let num = Number(currency).toLocaleString('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return "฿ " + num;
}

export const useShortcut = (shortcut: string, callback: (event: { key: string }) => void) => {
  const handleKeyDown = (event: { key: string }) => {

    // Single key shortcuts (e.g. pressing a)
    if (shortcut === event.key) {
      return callback(event)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
}

export const devDebug = (name: string, func: () => void) => {
  const specificDate = new Date();
  const specificTimestamp = specificDate.toISOString();

  if (import.meta.env.DEV && Boolean(import.meta.env.VITE_IS_DEVELOP) === true) {

    console.groupCollapsed(`${specificTimestamp}: ${name}`);
    func()
    console.groupEnd();
  }
}