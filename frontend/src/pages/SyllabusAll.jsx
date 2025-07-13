import { useState, useEffect } from 'react';

function SyllabusAll() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/syllabus')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        setSyllabusList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Syllabus</h2>
      {syllabusList.length === 0 ? (
        <p>No syllabus found.</p>
      ) : (
        <div className="space-y-4">
          {syllabusList.map(({ id, subject, description, topics, duration, tags }) => (
            <div key={id} className="border rounded p-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{subject}</h3>
              <p className="mb-2">{description}</p>
              <p><strong>Topics:</strong> {topics?.join(', ') || 'N/A'}</p>
              <p><strong>Duration:</strong> {duration || 'N/A'}</p>
              <p>
                <strong>Tags:</strong>{' '}
                {tags && tags.length > 0 ? (
                  tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SyllabusAll;
