
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import StyleIcons from '@/components/StyleIcons';
import ImageUpload from '@/components/ImageUpload';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Sparkles, Star } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    email: '',
    variationCount: 3,
    quality: '',
    styleNotes: '',
    imageFile: null as File | null,
    imageUrl: null as string | null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    firstImageUrl?: string;
    downloadUrl?: string;
  } | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.imageFile && !formData.imageUrl) {
      newErrors.image = 'Please upload an image or provide an image URL';
    }
    
    if (!formData.quality) {
      newErrors.quality = 'Please select a quality level';
    }
    
    if (formData.variationCount < 1 || formData.variationCount > 10) {
      newErrors.variationCount = 'Variation count must be between 1 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Check all required fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('variationCount', formData.variationCount.toString());
      submitData.append('quality', formData.quality);
      submitData.append('styleNotes', formData.styleNotes);
      
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      } else if (formData.imageUrl) {
        submitData.append('imageUrl', formData.imageUrl);
      }

      console.log('Submitting to webhook:', {
        email: formData.email,
        variationCount: formData.variationCount,
        quality: formData.quality,
        hasFile: !!formData.imageFile,
        hasUrl: !!formData.imageUrl
      });

      const response = await fetch('https://dhruvthc.app.n8n.cloud/webhook-test/e24c660d-a564-483e-af8b-793785550ca1', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Webhook response:', result);
      
      setResults({
        firstImageUrl: result.firstImageUrl,
        downloadUrl: result.downloadUrl
      });

      toast({
        title: "Success! ✨",
        description: "Your AI variations are being created and will be sent to your email!",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment. Our AI is working hard!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <ResultsDisplay 
            firstImageUrl={results.firstImageUrl}
            downloadUrl={results.downloadUrl}
            email={formData.email}
          />
          
          <div className="text-center mt-8">
            <Button
              onClick={() => {
                setResults(null);
                setFormData({
                  email: '',
                  variationCount: 3,
                  quality: '',
                  styleNotes: '',
                  imageFile: null,
                  imageUrl: null
                });
              }}
              variant="outline"
              className="rounded-full"
            >
              Create More Variations ✨
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-magic-purple mr-4 animate-sparkle" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-magic-purple to-magic-blush bg-clip-text text-transparent">
              Style Variator
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

        {/* Style Icons */}
        <StyleIcons />

        {/* Main Form */}
        <div className="magic-card p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
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
      </div>
    </div>
  );
};

export default Index;
