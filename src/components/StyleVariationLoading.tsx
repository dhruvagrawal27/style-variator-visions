
import LoadingSpinner from '@/components/LoadingSpinner';

const StyleVariationLoading = () => {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default StyleVariationLoading;
