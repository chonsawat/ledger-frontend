export function formatCurrency(currency) {
    let num = Number(currency).toLocaleString('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return "฿ " + num;
}
