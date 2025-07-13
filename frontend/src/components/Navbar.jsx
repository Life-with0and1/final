import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-6">
      <Link to="/syllabus" className="hover:text-yellow-400">Syllabus</Link>
      <Link to="/tag" className="hover:text-yellow-400">Tags</Link>
    </nav>
  );
};

export default Navbar;
