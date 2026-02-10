export async function getFeedbackLink(invoiceId) {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const res = await fetch(`${API_URL}/feedback/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId })
    });

    if (!res.ok) {
      throw new Error("Failed to generate feedback link");
    }

    return await res.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
