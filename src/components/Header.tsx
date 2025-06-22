import { Sparkles, Star } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12 pt-8">
      <div className="flex items-center justify-center mb-6">
        <Sparkles className="w-12 h-12 text-magic-purple mr-4 animate-sparkle" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-pink-400 to-yellow-300 bg-clip-text text-transparent">
          DreamRender
        </h1>
        <Star className="w-12 h-12 text-magic-teal ml-4 animate-sparkle" style={{animationDelay: '1s'}} />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4 sparkle-effect">
        Bring Your Image to Life — In 10 Different Worlds 🌍🎨
      </h2>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Transform any image into stunning artistic variations with AI. 
        From cyberpunk aesthetics to Ghibli magic, create multiple styles in seconds!
      </p>
    </div>
  );
};

export default Header;
