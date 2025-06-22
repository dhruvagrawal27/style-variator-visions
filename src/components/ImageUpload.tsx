
import { useState } from 'react';
import { Upload, Link, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadProps {
  onImageSelect: (file: File | null, url: string | null) => void;
  error?: string;
}

const ImageUpload = ({ onImageSelect, error }: ImageUploadProps) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect(file, null);
      setImageUrl('');
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    if (url) {
      setPreviewUrl(url);
      onImageSelect(null, url);
      setSelectedFile(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setImageUrl('');
    setPreviewUrl(null);
    onImageSelect(null, null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          variant={uploadMethod === 'file' ? 'default' : 'outline'}
          onClick={() => setUploadMethod('file')}
          className="rounded-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
        <Button
          type="button"
          variant={uploadMethod === 'url' ? 'default' : 'outline'}
          onClick={() => setUploadMethod('url')}
          className="rounded-full"
        >
          <Link className="w-4 h-4 mr-2" />
          Image URL
        </Button>
      </div>

      {uploadMethod === 'file' ? (
        <div className="relative">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="block w-full p-8 border-2 border-dashed border-magic-purple/50 rounded-2xl text-center cursor-pointer hover:border-magic-purple transition-colors bg-white/10 backdrop-blur-sm"
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-magic-purple" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {selectedFile ? selectedFile.name : 'Drop your image here or click to browse'}
            </p>
            <p className="text-sm text-gray-500">JPG, JPEG, PNG files supported</p>
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="rounded-xl bg-white/50 backdrop-blur-sm border-magic-purple/30"
          />
          <p className="text-sm text-gray-500 text-center">
            Paste the URL of any image from the web
          </p>
        </div>
      )}

      {previewUrl && (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-40 rounded-xl shadow-lg mx-auto block"
          />
          <button
            type="button"
            onClick={clearSelection}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
