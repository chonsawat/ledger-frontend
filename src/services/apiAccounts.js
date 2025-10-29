const API_URL = import.meta.env.VITE_API_URL

export async function fetchAccounts() {
  const res = await fetch(`${API_URL}/api/accounts`);

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  return data
}

export async function fetchAccountById(theId) {
  const res = await fetch(`${API_URL}/api/account/${theId}`)

  if (!res.ok) throw Error("Fail to fetch data")
    
  const data = await res.json();
  return data
}