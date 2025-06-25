
import { Button } from '@/components/ui/button';
import ResultsDisplay from '@/components/ResultsDisplay';

interface StyleVariationResultsProps {
  firstImageUrl?: string;
  downloadUrl?: string;
  email: string;
  variationCount: number;
  onReset: () => void;
}

const StyleVariationResults = ({ 
  firstImageUrl, 
  downloadUrl, 
  email, 
  variationCount, 
  onReset 
}: StyleVariationResultsProps) => {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <ResultsDisplay 
          firstImageUrl={firstImageUrl}
          downloadUrl={downloadUrl}
          email={email}
          variationCount={variationCount}
        />
        
        <div className="text-center mt-8">
          <Button
            onClick={onReset}
            variant="outline"
            className="rounded-full"
          >
            Create More Variations ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StyleVariationResults;
