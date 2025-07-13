import React, { useState } from 'react';

function SyllabusGet() {
  const [id, setId] = useState('');
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    if (!id.trim()) return;

    setLoading(true);
    setError(null);
    setSyllabus(null);

    fetch(`http://localhost:8081/syllabus/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Syllabus not found');
        return res.json();
      })
      .then(data => {
        setSyllabus(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Get Syllabus By ID</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter syllabus ID"
          value={id}
          onChange={e => setId(e.target.value)}
          className="border rounded-l px-3 py-2 flex-grow"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {syllabus && (
        <div className="border rounded p-4 shadow">
          <h3 className="text-lg font-semibold mb-2">{syllabus.subject}</h3>
          <p className="mb-2">{syllabus.description}</p>
          <p><strong>Topics:</strong> {syllabus.topics?.join(', ') || 'N/A'}</p>
          <p><strong>Duration:</strong> {syllabus.duration || 'N/A'}</p>
          <p>
            <strong>Tags:</strong>{' '}
            {syllabus.tags && syllabus.tags.length > 0 ? (
              syllabus.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              'N/A'
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default SyllabusGet;
