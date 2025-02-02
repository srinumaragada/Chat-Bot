import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, FileText } from 'lucide-react';
import Button from '../utils/Button';
import Input from '../utils/Input';
import ProgressSteps from '../utils/ProgressSteps';

const SetupOrg = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [isFetchingDescription, setIsFetchingDescription] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/website-scan');
  };

  const fetchDescription = async (url) => {
    if (!url) return;
    setIsFetchingDescription(true);
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      console.log(result);
      
      const metaDescription = result.contents.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)/i);
      setDescription(metaDescription ? metaDescription[1] : 'No description available.');
      
    } catch (error) {
      console.error('Error fetching website description:', error);
      setDescription('No description available.');
    } finally {
      setIsFetchingDescription(false);
    }
  };

  useEffect(() => {
    if (website.startsWith('http')) {
      fetchDescription(website);
    }
  }, [website]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200  to-yellow-300">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <ProgressSteps
          steps={['Account', 'Organization', 'Website Scan', 'Integration']}
          currentStep={1}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Setup your organization</h2>
          <p className="mt-2 text-sm text-gray-600">
            Tell us about your company to help us personalize your chatbot
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    required
                    className="pl-10 bg-amber-100"
                  />
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Company Website URL
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    required
                    className="pl-10 bg-amber-100"
                    placeholder="https://"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Company Description
                </label>
                <div className="mt-1 relative">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="flex bg-amber-100 w-full rounded-md border border-gray-300  px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    required
                    value={isFetchingDescription ? 'Fetching description...' : description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-500" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Continue to Website Scan'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupOrg;
