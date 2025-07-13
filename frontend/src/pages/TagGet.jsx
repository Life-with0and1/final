import React, { useState } from 'react';

function TagGet() {
  const [tagName, setTagName] = useState('');
  const [tagData, setTagData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchTag = () => {
    if (!tagName.trim()) {
      setError('Tag name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setTagData(null);

    fetch(`http://localhost:8082/tag/${tagName}`) // adjust if endpoint is different
      .then(res => {
        if (!res.ok) throw new Error('Tag not found.');
        return res.json();
      })
      .then(data => {
        setTagData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Get Tag by Name</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className="border rounded-l px-3 py-2 flex-grow"
        />
        <button
          onClick={handleFetchTag}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {tagData && (
        <div className="border rounded p-4 shadow">
          <p><strong>ID:</strong> {tagData.id}</p>
          <p><strong>Name:</strong> {tagData.name}</p>
          {tagData.syllabusId && <p><strong>Syllabus ID:</strong> {tagData.syllabusId}</p>}
        </div>
      )}
    </div>
  );
}

export default TagGet;
