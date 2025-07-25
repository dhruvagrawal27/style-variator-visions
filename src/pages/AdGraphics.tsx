import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Target, Upload, X, CheckCircle, Download, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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
  resolution: 'square' | 'portrait' | 'landscape';
  wantHeadlineVariations: boolean;
}

interface AdResults {
  viewLink?: string;
  downloadUrl?: string;
}

const AdGraphics = () => {
  const [formData, setFormData] = useState<AdFormData>({
    variationCount: 1,
    headline: '',
    subHeading: '',
    pointers: '',
    cta: '',
    buttonText: '',
    email: '',
    imageFile: null,
    personDetails: '',
    otherRequirements: '',
    resolution: 'square',
    wantHeadlineVariations: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AdResults | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert Google Drive ViewLink to direct image URL
  const getDirectImageUrl = (url: string) => {
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    return url;
  };

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

  const resetForm = () => {
    setResults(null);
    setFormData({
      variationCount: 1,
      headline: '',
      subHeading: '',
      pointers: '',
      cta: '',
      buttonText: '',
      email: '',
      imageFile: null,
      personDetails: '',
      otherRequirements: '',
      resolution: 'square',
      wantHeadlineVariations: false,
    });
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

    // Calculate dynamic timeout: 3 minutes per variation (180 seconds)
    const timeoutDuration = formData.variationCount * 180 * 1000; // Convert to milliseconds
    
    console.log(`Setting timeout for ${formData.variationCount} variations: ${timeoutDuration / 1000} seconds`);

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
      submitData.append('resolution', formData.resolution);
      submitData.append('wantHeadlineVariations', String(formData.wantHeadlineVariations));
      
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      }

      console.log('Submitting to ad graphics webhook:', {
        variationCount: formData.variationCount,
        headline: formData.headline,
        email: formData.email,
        hasImage: !!formData.imageFile,
        timeoutDuration: timeoutDuration / 1000 + ' seconds'
      });

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutDuration);

      const response = await fetch('https://dhruvthc.app.n8n.cloud/webhook/28c13a76-b3e0-4486-8bf8-8fc09b25d88c', {
        method: 'POST',
        body: submitData,
        signal: controller.signal,
      });

      // Clear timeout if request completes successfully
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Webhook response text:', responseText);

      let result;
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
          console.log('Webhook response parsed:', result);
        } catch (parseError) {
          console.log('Response is not JSON, treating as text:', responseText);
          result = { message: responseText };
        }
      } else {
        console.log('Empty response, assuming success');
        result = { message: 'Request processed successfully' };
      }

      // Handle the response format: [{ "ViewLink": "..." }] or { "ViewLink": "..." }
      let viewLink = null;
      let downloadUrl = null;

      if (Array.isArray(result) && result.length > 0 && result[0].ViewLink) {
        viewLink = result[0].ViewLink;
        downloadUrl = result[0].ViewLink;
      } else if (result.ViewLink) {
        viewLink = result.ViewLink;
        downloadUrl = result.ViewLink;
      }

      console.log('Processed URLs:', { viewLink, downloadUrl });

      if (viewLink) {
        setResults({
          viewLink,
          downloadUrl
        });

        toast({
          title: "Success! 🎯",
          description: "Your high-conversion ad graphics are ready! Preview shown below.",
        });
      } else {
        toast({
          title: "Success! 🎯",
          description: "Your high-conversion ad graphics are being generated! Check your email soon.",
        });
      }

    } catch (error) {
      console.error('Error submitting ad graphics form:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        toast({
          title: "Processing Time Extended",
          description: `Your ${formData.variationCount} ad variation${formData.variationCount > 1 ? 's are' : ' is'} taking longer than expected. We'll send the results to your email once complete.`,
          variant: "default",
        });
      } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast({
          title: "Connection Error",
          description: "Unable to reach our AI service. Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: "Our AI is working hard! Please try again in a moment.",
          variant: "destructive",
        });
      }
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

  // Show results page if we have results
  if (results) {
    const displayImageUrl = results.viewLink ? getDirectImageUrl(results.viewLink) : null;
    const isGoogleDriveLink = results.viewLink?.includes('drive.google.com');

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900">
        <Navigation />
        <div className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold text-white mb-2">
                  🎉 Your AI Ad Graphics Are Ready!
                </h2>
                <p className="text-gray-300">
                  Generated {formData.variationCount} variation{formData.variationCount > 1 ? 's' : ''} and sent to <strong>{formData.email}</strong>
                </p>
              </div>

              {/* Variation count messaging */}
              <div className="mb-6 p-4 bg-cyan-500/20 border border-cyan-400/30 rounded-xl">
                <p className="text-sm text-cyan-200">
                  {formData.variationCount > 1 
                    ? `🎨 ${formData.variationCount} ad variations created! Preview of the generated design shown below.`
                    : '🎨 Your ad graphic is ready!'
                  }
                </p>
              </div>

              {displayImageUrl ? (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {formData.variationCount > 1 ? 'Preview - Generated Ad Design:' : 'Your Generated Ad:'}
                  </h3>
                  
                  <div className="relative inline-block">
                    <img
                      src={displayImageUrl}
                      alt={formData.variationCount > 1 ? 'Generated ad variation' : 'Generated ad'}
                      className="max-w-full max-h-96 rounded-xl shadow-lg mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden text-gray-300 p-4 border-2 border-dashed border-gray-400 rounded-xl bg-white/5">
                      <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Image preview not available</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="text-gray-300 p-6 border-2 border-dashed border-gray-400 rounded-xl bg-white/5">
                    <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Your ad preview will appear here soon!</p>
                  </div>
                </div>
              )}

              {results.downloadUrl ? (
                <div className="space-y-4 mb-6">
                  <p className="text-gray-200 font-medium">
                    {formData.variationCount > 1 
                      ? 'All your ad variations are ready for download!'
                      : 'Your ad graphic is ready for download!'
                    }
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white"
                  >
                    <a href={results.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5 mr-2" />
                      {isGoogleDriveLink ? 'Open Google Drive' : 'Download All Variations'}
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <p className="text-gray-200 font-medium">
                    Processing complete! Download link sent to your email.
                  </p>
                  <div className="p-4 bg-cyan-500/20 rounded-xl border border-cyan-400/30">
                    <p className="text-sm text-cyan-200">
                      📧 Check your email for the download link
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={resetForm}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                Create Another Ad 🎯
              </Button>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/30">
                <p className="text-sm text-gray-300">
                  ✨ <strong>Pro Tip:</strong> Each variation is optimized for different platforms and audiences. 
                  Use them across your marketing campaigns for maximum impact!
                </p>
              </div>
            </div>
          </div>
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
                />
                {errors.variationCount && (
                  <p className="text-red-400 text-sm font-medium">{errors.variationCount}</p>
                )}
              </div>

              {/* Resolution Section */}
              <div className="space-y-3">
                <label className="text-lg font-semibold text-white block mb-2">🖼️ Resolution</label>
                <div className="flex gap-6">
                  <button
                    type="button"
                    className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 ${formData.resolution === 'square' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/20 bg-white/5'} transition-colors`}
                    onClick={() => setFormData(prev => ({ ...prev, resolution: 'square' }))}
                  >
                    <img src="https://img.icons8.com/ios-filled/50/000000/square.png" alt="Square" className="w-8 h-8 mb-1" />
                    <span className="text-white text-sm">Square<br/>(1:1)</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 ${formData.resolution === 'portrait' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/20 bg-white/5'} transition-colors`}
                    onClick={() => setFormData(prev => ({ ...prev, resolution: 'portrait' }))}
                  >
                    <img src="https://img.icons8.com/ios-filled/50/000000/portrait.png" alt="Portrait" className="w-8 h-8 mb-1" />
                    <span className="text-white text-sm">Portrait<br/>(4:5)</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 ${formData.resolution === 'landscape' ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/20 bg-white/5'} transition-colors`}
                    onClick={() => setFormData(prev => ({ ...prev, resolution: 'landscape' }))}
                  >
                    <img src="https://img.icons8.com/ios-filled/50/000000/landscape.png" alt="Landscape" className="w-8 h-8 mb-1" />
                    <span className="text-white text-sm">Landscape<br/>(16:9)</span>
                  </button>
                </div>
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
                  required
                />
                {errors.headline && (
                  <p className="text-red-400 text-sm font-medium">{errors.headline}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wantHeadlineVariations"
                  checked={formData.wantHeadlineVariations}
                  onCheckedChange={(checked) => {
                    const isChecked = !!checked;
                    setFormData({ ...formData, wantHeadlineVariations: isChecked });
                  }}
                />
                <Label htmlFor="wantHeadlineVariations" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Do you want graphics in different variations of headline?
                </Label>
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[100px] placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[80px] placeholder:text-white/80"
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
                  className="rounded-xl bg-white/20 backdrop-blur-sm border-cyan-400/30 text-white min-h-[80px] placeholder:text-white/80"
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
