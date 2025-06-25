
import { useStyleVariationForm } from '@/hooks/useStyleVariationForm';
import StyleVariationLoading from '@/components/StyleVariationLoading';
import StyleVariationResults from '@/components/StyleVariationResults';
import StyleVariationForm from '@/components/StyleVariationForm';

const FormProvider = () => {
  const {
    formData,
    setFormData,
    isLoading,
    results,
    errors,
    setErrors,
    submitForm,
    resetForm
  } = useStyleVariationForm();

  if (isLoading) {
    return <StyleVariationLoading />;
  }

  if (results) {
    return (
      <StyleVariationResults
        firstImageUrl={results.firstImageUrl}
        downloadUrl={results.downloadUrl}
        email={formData.email}
        variationCount={formData.variationCount}
        onReset={resetForm}
      />
    );
  }

  return (
    <StyleVariationForm
      formData={formData}
      setFormData={setFormData}
      errors={errors}
      setErrors={setErrors}
      onSubmit={submitForm}
      isLoading={isLoading}
    />
  );
};

export default FormProvider;
