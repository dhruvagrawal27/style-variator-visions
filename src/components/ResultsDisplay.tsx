
import { Download, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsDisplayProps {
  firstImageUrl?: string;
  downloadUrl?: string;
  email: string;
}

const ResultsDisplay = ({ firstImageUrl, downloadUrl, email }: ResultsDisplayProps) => {
  return (
    <div className="magic-card p-8 text-center animate-fade-in">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🎉 Your AI Variations Are Ready!
        </h2>
        <p className="text-gray-600">
          We've sent the download link to <strong>{email}</strong>
        </p>
      </div>

      {firstImageUrl && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview - First Variation:</h3>
          <img
            src={firstImageUrl}
            alt="First AI variation"
            className="max-w-full max-h-64 rounded-xl shadow-lg mx-auto animate-scale-in"
          />
        </div>
      )}

      {downloadUrl && (
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            All your stylized variations are ready for download!
          </p>
          <Button
            asChild
            className="magic-button animate-glow"
          >
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-5 h-5 mr-2" />
              Download All Variations
            </a>
          </Button>
        </div>
      )}

      <div className="mt-6 p-4 bg-magic-mint/20 rounded-xl">
        <p className="text-sm text-gray-600">
          ✨ <strong>Pro Tip:</strong> Each variation captures a unique artistic style. 
          Use them for social media, presentations, or creative projects!
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
