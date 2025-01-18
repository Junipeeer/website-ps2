import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="fixed flex gap-4 z-50">
      <Link to="/">Home</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/links">Links</Link>
    </nav>
  );
};

export default Navigation;