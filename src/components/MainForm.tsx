
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import { Sparkles } from 'lucide-react';

interface FormData {
  email: string;
  variationCount: number;
  quality: string;
  styleNotes: string;
  imageFile: File | null;
  imageUrl: string | null;
}

interface MainFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: {[key: string]: string};
  setErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MainForm = ({ formData, setFormData, errors, setErrors, onSubmit, isLoading }: MainFormProps) => {
  const handleImageSelect = (file: File | null, url: string | null) => {
    setFormData(prev => ({
      ...prev,
      imageFile: file,
      imageUrl: url
    }));
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  return (
    <div className="magic-card p-8 max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-8">
        
        {/* Image Upload Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            📸 Upload Your Image
          </Label>
          <ImageUpload
            onImageSelect={handleImageSelect}
            error={errors.image}
          />
        </div>

        {/* Variation Count */}
        <div className="space-y-3">
          <Label htmlFor="variations" className="text-lg font-semibold text-gray-800">
            🎨 How many style variations? (1-10)
          </Label>
          <Input
            id="variations"
            type="number"
            min="1"
            max="10"
            value={formData.variationCount}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              variationCount: parseInt(e.target.value) || 1
            }))}
            className="rounded-xl bg-white/50 backdrop-blur-sm border-magic-purple/30"
          />
          {errors.variationCount && (
            <p className="text-red-500 text-sm font-medium">{errors.variationCount}</p>
          )}
        </div>

        {/* Quality Selector */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-800">
            ⚡ Quality Level
          </Label>
          <Select 
            value={formData.quality} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, quality: value }))}
          >
            <SelectTrigger className="rounded-xl bg-white/50 backdrop-blur-sm border-magic-purple/30">
              <SelectValue placeholder="Choose quality level" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm">
              <SelectItem value="high">🌟 High - Best quality (slower)</SelectItem>
              <SelectItem value="medium">⚡ Medium - Balanced (recommended)</SelectItem>
              <SelectItem value="low">🚀 Low - Fastest generation</SelectItem>
            </SelectContent>
          </Select>
          {errors.quality && (
            <p className="text-red-500 text-sm font-medium">{errors.quality}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-lg font-semibold text-gray-800">
            📧 Email (for download link)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="rounded-xl bg-white/50 backdrop-blur-sm border-magic-purple/30"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-medium">{errors.email}</p>
          )}
        </div>

        {/* Optional Style Notes */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-lg font-semibold text-gray-800">
            💭 Style Preferences (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="e.g., 'I love dark fantasy vibes' or 'bright and colorful please!'"
            value={formData.styleNotes}
            onChange={(e) => setFormData(prev => ({ ...prev, styleNotes: e.target.value }))}
            className="rounded-xl bg-white/50 backdrop-blur-sm border-magic-purple/30 min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full magic-button text-lg py-4 sparkle-effect"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Creating Magic...
            </>
          ) : (
            <>
              ✨ Transform My Image Into Art ✨
            </>
          )}
        </Button>
      </form>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-gradient-to-r from-magic-lavender/20 to-magic-teal/20 rounded-2xl">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-magic-purple" />
          How it works:
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🎨 <strong>AI Processing:</strong> Your image gets transformed by advanced AI models</li>
          <li>📤 <strong>Cloud Storage:</strong> Variations are uploaded to Google Drive</li>
          <li>📧 <strong>Email Delivery:</strong> Download link sent directly to your inbox</li>
          <li>⚡ <strong>Preview:</strong> First variation appears here instantly!</li>
        </ul>
      </div>
    </div>
  );
};

export default MainForm;
