import React, { useState, useEffect } from 'react';

function TagAll() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8082/tag')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tags');
        return res.json();
      })
      .then(data => {
        setTags(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Tags</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="flex flex-wrap gap-3">
        {tags.length === 0 && !loading && <p>No tags found.</p>}
        {tags.map(tag => (
          <span
            key={tag.id || tag.name}
            className="bg-blue-200 text-blue-800 text-sm font-medium px-3 py-1 rounded"
          >
            {tag.name || tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagAll;
