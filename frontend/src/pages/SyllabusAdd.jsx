import React, { useState } from 'react';

const SyllabusAdd = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    topics: '',
    duration: '',
    tags: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
  ...formData,
  tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
  topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
  duration: formData.duration,  };


  try {
    const response = await fetch('http://localhost:8081/syllabus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add syllabus');
    }

    const data = await response.json();
    console.log('Syllabus added:', data);

   setFormData({
      subject: '',
      description: '',
      topics: '',
      duration: '',
      tags: '',
    });

    alert('Syllabus added successfully!');

  } catch (error) {
    console.error('Error:', error.message);
    alert('Error adding syllabus: ' + error.message);
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Syllabus</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <label className="flex flex-col">
          Subject
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            type="text"
            required
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          Topics (comma separated)
          <textarea
            name="topics"
            value={formData.topics}
            onChange={handleChange}
            rows={3}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          Duration (hours)
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            type="number"
            min="0"
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          Tags (comma separated)
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            type="text"
            className="border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Add Syllabus
        </button>
      </form>
    </div>
  );
};

export default SyllabusAdd;
