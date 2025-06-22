
import { Palette, Gamepad2, Sparkles, Mountain, Brush, Camera } from 'lucide-react';

const StyleIcons = () => {
  const styles = [
    { name: 'Cyberpunk', icon: Gamepad2, color: 'text-purple-500' },
    { name: 'Ghibli', icon: Mountain, color: 'text-green-500' },
    { name: 'Watercolor', icon: Brush, color: 'text-blue-500' },
    { name: 'Pixel Art', icon: Palette, color: 'text-pink-500' },
    { name: 'Fantasy', icon: Sparkles, color: 'text-yellow-500' },
    { name: 'Vintage', icon: Camera, color: 'text-orange-500' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-12">
      {styles.map((style, index) => (
        <div
          key={style.name}
          className="flex flex-col items-center animate-float"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 hover:scale-110 transition-transform duration-300">
            <style.icon className={`w-8 h-8 ${style.color}`} />
          </div>
          <span className="text-sm font-medium text-gray-700">{style.name}</span>
        </div>
      ))}
    </div>
  );
};

export default StyleIcons;
