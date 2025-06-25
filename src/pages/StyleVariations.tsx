
import FormProvider from '@/components/FormProvider';
import Navigation from '@/components/Navigation';

const StyleVariations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      <div className="pt-16">
        <FormProvider />
      </div>
    </div>
  );
};

export default StyleVariations;
