
import { Sparkles, Star } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12 pt-8">
      <div className="flex items-center justify-center mb-6">
        <Sparkles className="w-12 h-12 text-purple-400 mr-4 animate-sparkle" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Art Style Variations
        </h1>
        <Star className="w-12 h-12 text-cyan-400 ml-4 animate-sparkle" style={{animationDelay: '1s'}} />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4 sparkle-effect">
        Transform Your Image Into Multiple Art Styles 🌍🎨
      </h2>
      
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Upload any image and watch it transform into stunning artistic variations. 
        From cyberpunk aesthetics to Ghibli magic, create multiple styles in seconds!
      </p>
    </div>
  );
};

export default Header;
