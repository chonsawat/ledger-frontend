import { useEffect } from 'react'

export function formatCurrency(currency) {
    let num = Number(currency).toLocaleString('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "฿ " + num;
}


export const useShortcut = (shortcut, callback) => {
  const handleKeyDown = (event) => {
    // Single key shortcuts (e.g. pressing a)
    if (shortcut === event.key && event.ctrlKey) {
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