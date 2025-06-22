
import { Download, CheckCircle, Image } from 'lucide-react';
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

      {firstImageUrl ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview - First Variation:</h3>
          <div className="relative inline-block">
            <img
              src={firstImageUrl}
              alt="First AI variation"
              className="max-w-full max-h-64 rounded-xl shadow-lg mx-auto animate-scale-in"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden text-gray-500 p-4 border-2 border-dashed border-gray-300 rounded-xl">
              <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Preview image will be available shortly</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-gray-500 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Your variation preview will appear here soon!</p>
          </div>
        </div>
      )}

      {downloadUrl ? (
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
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            Processing complete! Download link sent to your email.
          </p>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-700">
              📧 Check your email for the Google Drive download link
            </p>
          </div>
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
