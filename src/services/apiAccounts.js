const API_URL = "http://chonsawat:8080/api"

export async function fetchAccounts() {
  const res = await fetch(`${API_URL}/accounts`);

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  return data
}
