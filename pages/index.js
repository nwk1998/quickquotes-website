import { useState } from 'react';

export default function QuickQuoteForm() {
  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setLoading(true);

    // Fake AI response
    setTimeout(() => {
      const suggestion =
        service === 'Plumbing'
          ? 'Looks like a leaking water heater. Possibly bottom tank rust. Located in basement.'
          : service === 'Electrical'
          ? 'Visible corrosion on breaker panel. Might need panel upgrade.'
          : 'Issue detected. Please confirm the area and details below.';
      setAiSuggestion(suggestion);
      setDescription(suggestion);
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Quote request submitted!');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a QuickQuote</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">What service do you need?</label>
          <select
            className="w-full border p-2 rounded"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select one</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="HVAC">HVAC</option>
            <option value="Roofing">Roofing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload a photo (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {loading && <p className="text-sm text-blue-500 mt-2">Analyzing image...</p>}
          {aiSuggestion && (
            <p className="text-sm text-green-600 mt-2">AI Suggestion: {aiSuggestion}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Briefly describe the issue</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="text-sm text-gray-600">
          *Final pricing may vary after on-site evaluation. You’re not obligated to accept any quote.
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
