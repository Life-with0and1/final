import React, { useState } from 'react';

function TagAdd() {
  const [tag, setTag] = useState('');
  const [syllabusId, setSyllabusId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddTag = () => {
    setMessage('');
    setError('');

    if (!tag.trim() || !syllabusId.trim()) {
      setError('Both tag name and syllabus ID are required.');
      return;
    }

    const payload = {
      tag: tag.trim(),
      syllabusId: syllabusId.trim(),
    };

    fetch('http://localhost:8082/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add tag.');
        return res.json();
      })
      .then(data => {
        setMessage('Tag added successfully.');
        setTag('');
        setSyllabusId('');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Tag to Syllabus</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tag name"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Syllabus ID"
          value={syllabusId}
          onChange={(e) => setSyllabusId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleAddTag}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Tag
      </button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}

export default TagAdd;
