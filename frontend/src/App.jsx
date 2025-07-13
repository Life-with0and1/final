import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import SyllabusPage from './pages/SyllabusPage';
import TagPage from './pages/TagPage';
import SyllabusAll from './pages/SyllabusAll';
import SyllabusAdd from './pages/SyllabusAdd';
import SyllabusGet from './pages/SyllabusGet';
import SyllabusDelete from './pages/SyllabusDelete';
import TagAll from './pages/TagAll';
import TagGet from './pages/TagGet';
import TagAdd from './pages/TagAdd';
import TagDelete from './pages/TagDelete';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/syllabus" />} />

        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/syllabus/all" element={<SyllabusAll />} />
        <Route path="/syllabus/add" element={<SyllabusAdd />} />
        <Route path="/syllabus/get" element={<SyllabusGet />} />
        <Route path="/syllabus/delete" element={<SyllabusDelete />} />

        <Route path="/tag" element={<TagPage />} />
        <Route path="/tag/all" element={<TagAll />} />
        <Route path="/tag/add" element={<TagAdd />} />
        <Route path="/tag/get" element={<TagGet />} />
        <Route path="/tag/delete" element={<TagDelete />} />
      </Routes>
    </Router>
  );
};

export default App;
