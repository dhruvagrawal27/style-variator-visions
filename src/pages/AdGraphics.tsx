import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Target, Upload, X } from 'lucide-react';

interface AdFormData {
  variationCount: number;
  headline: string;
  subHeading: string;
  pointers: string;
  cta: string;
  buttonText: string;
  email: string;
  imageFile: File | null;
  personDetails: string;
  otherRequirements: string;
}

const AdGraphics = () => {
  const [formData, setFormData] = useState<AdFormData>({
    variationCount: 3,
    headline: '',
    subHeading: '',
    pointers: '',
    cta: '',
    buttonText: '',
    email: '',
    imageFile: null,
    personDetails: '',
    otherRequirements: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.headline.trim()) {
      newErrors.headline = 'Headline is required';
    }
    
    if (!formData.subHeading.trim()) {
      newErrors.subHeading = 'Sub heading is required';
    }
    
    if (!formData.pointers.trim()) {
      newErrors.pointers = 'Key points are required';
    }
    
    if (!formData.cta.trim()) {
      newErrors.cta = 'Call-to-action is required';
    }
    
    if (!formData.buttonText.trim()) {
      newErrors.buttonText = 'Button text is required';
    }
    
    if (formData.variationCount < 1 || formData.variationCount > 10) {
      newErrors.variationCount = 'Variation count must be between 1 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    setImagePreview(null);
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
      submitData.append('variationCount', formData.variationCount.toString());
      submitData.append('headline', formData.headline);
      submitData.append('subHeading', formData.subHeading);
      submitData.append('pointers', formData.pointers);
      submitData.append('cta', formData.cta);
      submitData.append('buttonText', formData.buttonText);
      submitData.append('email', formData.email);
      submitData.append('personDetails', formData.personDetails);
      submitData.append('otherRequirements', formData.otherRequirements);
      
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      }

      console.log('Submitting to ad graphics webhook:', {
        variationCount: formData.variationCount,
        headline: formData.headline,
        email: formData.email,
        hasImage: !!formData.imageFile
      });

      const response = await fetch('https://dhruvthc.app.n8n.cloud/webhook-test/28c13a76-b3e0-4486-8bf8-8fc09b25d88c', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Success! 🎯",
        description: "Your high-conversion ad graphics are being generated! Check your email soon.",
      });

      // Reset form
      setFormData({
        variationCount: 3,
        headline: '',
        subHeading: '',
        pointers: '',
        cta: '',
        buttonText: '',
        email: '',
        imageFile: null,
        personDetails: '',
        otherRequirements: ''
      });
      setImagePreview(null);

    } catch (error) {
      console.error('Error submitting ad graphics form:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Our AI is working hard! Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-12 h-12 text-cyan-400 mr-4 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ad Graphics Generator
              </h1>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Create High-Conversion Ad Graphics 🎯
            </h2>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Generate professional ad graphics that convert. Perfect for agencies, 
              founders, and marketers who need compelling visual content.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Variation Count */}
              <div className="space-y-3">
                <Label htmlFor="variations" className="text-lg font-semibold text-white">
                  🎨 Number of Ad Variations (1-10)
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                />
                {errors.variationCount && (
                  <p className="text-red-400 text-sm font-medium">{errors.variationCount}</p>
                )}
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <Label htmlFor="headline" className="text-lg font-semibold text-white">
                  📢 Headline *
                </Label>
                <Input
                  id="headline"
                  placeholder="Your compelling headline here..."
                  value={formData.headline}
                  onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                  required
                />
                {errors.headline && (
                  <p className="text-red-400 text-sm font-medium">{errors.headline}</p>
                )}
              </div>

              {/* Sub Heading */}
              <div className="space-y-3">
                <Label htmlFor="subHeading" className="text-lg font-semibold text-white">
                  📝 Sub Heading *
                </Label>
                <Input
                  id="subHeading"
                  placeholder="Supporting text or secondary message..."
                  value={formData.subHeading}
                  onChange={(e) => setFormData(prev => ({ ...prev, subHeading: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                  required
                />
                {errors.subHeading && (
                  <p className="text-red-400 text-sm font-medium">{errors.subHeading}</p>
                )}
              </div>

              {/* Pointers */}
              <div className="space-y-3">
                <Label htmlFor="pointers" className="text-lg font-semibold text-white">
                  ✅ Key Points/Features *
                </Label>
                <Textarea
                  id="pointers"
                  placeholder="• Feature 1&#10;• Feature 2&#10;• Feature 3"
                  value={formData.pointers}
                  onChange={(e) => setFormData(prev => ({ ...prev, pointers: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[100px] placeholder:text-gray-400"
                  required
                />
                {errors.pointers && (
                  <p className="text-red-400 text-sm font-medium">{errors.pointers}</p>
                )}
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Label htmlFor="cta" className="text-lg font-semibold text-white">
                  🎯 Call-to-Action *
                </Label>
                <Input
                  id="cta"
                  placeholder="Get Started Today, Learn More, etc."
                  value={formData.cta}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                  required
                />
                {errors.cta && (
                  <p className="text-red-400 text-sm font-medium">{errors.cta}</p>
                )}
              </div>

              {/* Button Text */}
              <div className="space-y-3">
                <Label htmlFor="buttonText" className="text-lg font-semibold text-white">
                  🔘 Button Text *
                </Label>
                <Input
                  id="buttonText"
                  placeholder="Sign Up Now, Download Free, etc."
                  value={formData.buttonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                  required
                />
                {errors.buttonText && (
                  <p className="text-red-400 text-sm font-medium">{errors.buttonText}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-lg font-semibold text-white">
                  📧 Email (for download link) *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-gray-400"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm font-medium">{errors.email}</p>
                )}
              </div>

              {/* File Upload Only */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-white">
                  📸 Founder/Owner Image (Optional)
                </Label>
                <p className="text-sm text-gray-300">
                  Upload a photo of yourself or company founder to include in the ad
                </p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="block w-full p-8 border-2 border-dashed border-cyan-400/50 rounded-2xl text-center cursor-pointer hover:border-cyan-400 transition-colors bg-white/10 backdrop-blur-sm"
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                    <p className="text-lg font-medium text-white mb-2">
                      {formData.imageFile ? formData.imageFile.name : 'Drop your image here or click to browse'}
                    </p>
                    <p className="text-sm text-gray-300">JPG, JPEG, PNG files supported</p>
                  </label>
                </div>

                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-40 rounded-xl shadow-lg mx-auto block"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Person Details */}
              <div className="space-y-3">
                <Label htmlFor="personDetails" className="text-lg font-semibold text-white">
                  👤 Person Details (Optional)
                </Label>
                <Textarea
                  id="personDetails"
                  placeholder="Name, designation, company name, achievements..."
                  value={formData.personDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, personDetails: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[80px] placeholder:text-gray-400"
                />
              </div>

              {/* Other Requirements */}
              <div className="space-y-3">
                <Label htmlFor="otherRequirements" className="text-lg font-semibold text-white">
                  ⭐ Other Requirements (Optional)
                </Label>
                <Textarea
                  id="otherRequirements"
                  placeholder="Add stars, ratings (4.5/5), specific colors, etc."
                  value={formData.otherRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherRequirements: e.target.value }))}
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[80px] placeholder:text-gray-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-lg py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full transform hover:scale-105 transition-all"
                disabled={isLoading}
              >
                🎯 Generate High-Conversion Ads ✨
              </Button>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30">
              <h3 className="font-semibold text-white mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-cyan-400" />
                How it works:
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>🎨 <strong>AI Design:</strong> Advanced AI creates conversion-optimized ad layouts</li>
                <li>📧 <strong>Email Delivery:</strong> All variations sent directly to your inbox</li>
                <li>🎯 <strong>High Converting:</strong> Designed for maximum engagement and conversions</li>
                <li>⚡ <strong>Fast Turnaround:</strong> Professional ads ready in minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdGraphics;
