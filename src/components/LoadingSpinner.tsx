
import { Sparkles, Palette, Wand2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="magic-card p-8 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto relative">
          <Palette className="w-20 h-20 text-magic-purple animate-spin" />
          <Sparkles className="w-6 h-6 text-magic-blush absolute top-0 right-0 animate-sparkle" />
          <Wand2 className="w-6 h-6 text-magic-teal absolute bottom-0 left-0 animate-sparkle" style={{animationDelay: '1s'}} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ✨ Creating Your Magical Variations...
      </h2>
      
      <div className="space-y-3 text-gray-600">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-magic-purple rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-magic-blush rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-magic-teal rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
        
        <p className="font-medium">AI is applying unique art styles to your image</p>
        <p className="text-sm">This usually takes 30-60 seconds per variation</p>
        
        <div className="mt-6 p-4 bg-white/20 rounded-xl">
          <p className="text-sm">
            🎨 <strong>What's happening:</strong><br/>
            Your image is being transformed into multiple artistic styles, 
            uploaded to Google Drive, and the download link will be sent to your email!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
