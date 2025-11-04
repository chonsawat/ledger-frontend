import { useEffect } from 'react'

export function formatCurrency(currency: number) {
    let num = Number(currency).toLocaleString('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "฿ " + num;
}


export const useShortcut = (shortcut: string, callback: (event: {key:string}) => void) => {
  const handleKeyDown = (event: {key:string}) => {
    console.log(event.key);
    
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