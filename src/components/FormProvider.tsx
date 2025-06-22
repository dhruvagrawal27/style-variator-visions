import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StyleIcons from '@/components/StyleIcons';
import MainForm from '@/components/MainForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultsDisplay from '@/components/ResultsDisplay';

interface FormData {
  email: string;
  variationCount: number;
  quality: string;
  styleNotes: string;
  imageFile: File | null;
  imageUrl: string | null;
}

const FormProvider = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    variationCount: 3,
    quality: '',
    styleNotes: '',
    imageFile: null,
    imageUrl: null
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
    
    // Allow both file and URL - n8n will handle the logic
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
      
      // Allow both file and URL to be sent - let n8n handle the priority
      if (formData.imageFile) {
        submitData.append('image', formData.imageFile);
      }
      if (formData.imageUrl) {
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

      // Check if response has content before trying to parse JSON
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
      
      // Handle the new response format with ViewLink
      let firstImageUrl = null;
      let downloadUrl = null;

      // Check if result is an array (your new format)
      if (Array.isArray(result) && result.length > 0 && result[0].ViewLink) {
        firstImageUrl = result[0].ViewLink;
        downloadUrl = result[0].ViewLink;
      } 
      // Handle single object with ViewLink
      else if (result.ViewLink) {
        firstImageUrl = result.ViewLink;
        downloadUrl = result.ViewLink;
      }
      // Handle existing formats
      else {
        firstImageUrl = result.firstImageUrl || result.previewImage || result.imageUrl;
        downloadUrl = result.downloadUrl || result.driveLink;
      }

      console.log('Processed URLs:', { firstImageUrl, downloadUrl });
      
      setResults({
        firstImageUrl,
        downloadUrl
      });

      toast({
        title: "Success! ✨",
        description: "Your AI variations are ready! Check your email for the download link.",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More specific error handling
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast({
          title: "Connection Error",
          description: "Unable to reach our AI service. Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: "Our AI is trying very hard! Please try again in a moment.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    setFormData({
      email: '',
      variationCount: 3,
      quality: '',
      styleNotes: '',
      imageFile: null,
      imageUrl: null
    });
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
            variationCount={formData.variationCount}
          />
          
          <div className="text-center mt-8">
            <Button
              onClick={resetForm}
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
        <Header />
        <StyleIcons />
        <MainForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FormProvider;
