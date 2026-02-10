import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function FeedbackPage() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    alias: "",
    comment: "",
    score: 5,
    service: ""
  });

  useEffect(() => {
    if (!token) {
      setMessage("Invalid feedback link");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/feedback?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setValid(true))
      .catch(() => setMessage("This feedback link is no longer valid"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/feedback/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...form
        })
      });

      if (!res.ok) throw new Error();

      setValid(false);
      setMessage("Thank you for your feedback 🙏");
    } catch {
      setMessage("Failed to submit feedback");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking link...
      </div>
    );

  if (!valid)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Leave your feedback
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your feedback helps improve future services
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Alias */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Alias (optional)
            </label>
            <input
              type="text"
              placeholder="Client Name"
              value={form.alias}
              onChange={(e) =>
                setForm({ ...form, alias: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Feedback
            </label>
            <textarea
              rows="4"
              placeholder="Share your experience..."
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Score */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Rating (1–10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={form.score}
              onChange={(e) =>
                setForm({ ...form, score: Number(e.target.value) })
              }
              className="w-full"
            />
            <div className="text-center text-sm text-gray-700 mt-1">
              {form.score} / 10
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
