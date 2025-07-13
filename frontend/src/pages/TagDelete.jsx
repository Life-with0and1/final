import React, { useState } from 'react';

function TagDelete() {
  const [tagName, setTagName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = () => {
    if (!tagName.trim()) {
      setError('Tag name is required.');
      return;
    }

    setError('');
    setMessage('');

    fetch(`http://localhost:8082/tag/${tagName}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.status === 204) {
          setMessage('Tag deleted successfully.');
          setTagName('');
        } else if (res.status === 404) {
          throw new Error('Tag not found.');
        } else {
          throw new Error('Failed to delete tag.');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Delete Tag by Name</h2>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
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

export default TagDelete;
