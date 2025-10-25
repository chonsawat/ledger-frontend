const API_URL = "http://chonsawat:8080/api"

export async function fetchLedgers() {
  const res = await fetch(`${API_URL}/ledger-desc`);

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  return data
}

export async function fetchLedgerById(theId) {
  const res = await fetch(`${API_URL}/ledger/${theId}`)

  if (!res.ok) throw Error("Fail to fetch data")
    
  const data = await res.json();
  return data
}