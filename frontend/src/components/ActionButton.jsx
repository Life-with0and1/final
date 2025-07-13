import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ baseRoute }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded shadow-md">
      <button
        onClick={() => navigate(`${baseRoute}/all`)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View All
      </button>

      <button
        onClick={() => navigate(`${baseRoute}/add`)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New
      </button>

      <button
        onClick={() => navigate(`${baseRoute}/get`)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Get by ID
      </button>

      <button
        onClick={() => navigate(`${baseRoute}/delete`)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete by ID
      </button>
    </div>
  );
};

export default ActionButton;
