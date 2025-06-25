
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Sparkles, Target } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">ArtForge AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/style-variations">
              <Button variant="ghost" className="text-white hover:text-purple-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Art Variations
              </Button>
            </Link>
            <Link to="/ad-graphics">
              <Button variant="ghost" className="text-white hover:text-cyan-300">
                <Target className="w-4 h-4 mr-2" />
                Ad Graphics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
