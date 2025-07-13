import React, { useState } from 'react';

function SyllabusDelete() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    if (!id.trim()) return;

    setMessage(null);
    setError(null);

    fetch(`http://localhost:8081/syllabus/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.status === 204) {
          setMessage('Syllabus deleted successfully.');
        } else if (res.status === 404) {
          throw new Error('Syllabus not found.');
        } else {
          throw new Error('Failed to delete syllabus.');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Delete Syllabus By ID</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter syllabus ID"
          value={id}
          onChange={e => setId(e.target.value)}
          className="border rounded-l px-3 py-2 flex-grow"
        />
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default SyllabusDelete;
