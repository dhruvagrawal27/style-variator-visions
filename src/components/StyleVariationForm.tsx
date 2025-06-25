
import Header from '@/components/Header';
import StyleIcons from '@/components/StyleIcons';
import MainForm from '@/components/MainForm';

interface FormData {
  email: string;
  variationCount: number;
  quality: string;
  styleNotes: string;
  imageFile: File | null;
  imageUrl: string | null;
}

interface StyleVariationFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: {[key: string]: string};
  setErrors: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
  onSubmit: () => Promise<boolean>;
  isLoading: boolean;
}

const StyleVariationForm = ({ 
  formData, 
  setFormData, 
  errors, 
  setErrors, 
  onSubmit, 
  isLoading 
}: StyleVariationFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

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

export default StyleVariationForm;
