const API_URL = import.meta.env.VITE_API_URL

export async function fetchLedgers() {
  const res = await fetch(`${API_URL}/api/ledger-desc`);

  if (!res.ok) throw Error("Fail to fetch data")

  const data = await res.json();
  return data
}

export async function fetchLedgerById(theId) {
  const res = await fetch(`${API_URL}/api/ledger/${theId}`)

  if (!res.ok) throw Error("Fail to fetch data")
    
  const data = await res.json();
  return data
}

export async function addLedger(newLedger) {
  try {
    console.group("addLedger");
    console.log(newLedger);
    console.groupEnd("addLedger");
    
    const res = await fetch(`${API_URL}/api/ledger`, {
      method: "POST",
      body: JSON.stringify(newLedger),
      headers: {
          "Accept": "application/hal+json",
          "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
        const errorText = await res.text(); // Capture the raw error response
        console.error("Error:", res.status, errorText); // Log status and error details
        throw Error();
    }
    const {data} = await res.json();
    return data
  } catch {
    throw Error("Failed creating you order");
  }
}