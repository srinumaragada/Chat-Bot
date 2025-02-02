import { useState } from 'react';
import { Code2, Mail, ExternalLink, MessageSquare, CheckCircle2, Twitter, Linkedin, Facebook } from 'lucide-react';
import Button from '../utils/Button';
import ProgressSteps from '../utils/ProgressSteps';
import ConfettiCanvas from '../utils/confetti';
import { toast,ToastContainer } from 'react-toastify';

const INTEGRATION_CODE = `<script>
  window.CHATBOT_CONFIG = {
    orgId: "your-org-id",
    theme: "light"
  };
</script>
<script 
    src="https://cdn.example.com/
    chatbot.js" async ></script>`;

const Integration = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [value1, setValue] = useState("");
  const handleTestIntegration = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
  };
const handleInstructions=()=>{
  setValue("")
         toast.success("Send Instructions to your Email")
}
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200  to-yellow-300">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <ProgressSteps
          steps={['Account', 'Organization', 'Website Scan', 'Integration']}
          currentStep={3}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Chatbot Integration</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose how you want to integrate the chatbot with your website
          </p>

          <div className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-red-200 bg-amber-200 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Code2 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Manual Integration</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Add this code to your website's &lt;head&gt; tag
                </p>
                <div className="relative">
                  <pre className="mb-4 rounded-lg bg-yellow-100 p-4">
                    <code className="text-sm text-black">{INTEGRATION_CODE}</code>
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(INTEGRATION_CODE)}
                    className="absolute right-2 top-2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white hover:bg-gray-700"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-amber-200 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Email to Developer</h3>
                <p className="mb-4 text-sm text-gray-600">
                  We'll send the integration instructions to your developer
                </p>
                <input
                id="email"
                name="email"
                value={value1}
                onChange={(e)=>{setValue(e.target.value)}}
                placeholder='Enter Your email...'
                className="border p-2 border-amber-600 bg-amber-200 rounded-md mb-2 w-[19rem]"/>
                
                <Button
                  variant="outline"
                  className={` w-full bg-orange-400`}
                  onClick={handleInstructions}
                  disabled={value1 == ""}
                >
                  Send Instructions
                </Button>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open('/test-chat', '_blank')}
                className="flex-1 bg-orange-600"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Test Chatbot
              </Button>
              
              <Button
                onClick={handleTestIntegration}
                className="flex-1 bg-orange-600"
              >
                <ExternalLink className="mr-2 h-4 w-4 " />
                Test Integration
              </Button>
            </div>

            {showSuccess && (
              <div className="rounded-lg bg-amber-200 p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <CheckCircle2 className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Integration Successful!
                </h3>
                <p className="mb-6 text-sm text-gray-600">
                  Your chatbot is now ready to help your customers
                </p>
                <div className="flex justify-center space-x-4">
                  <Button  className="bg-orange-900"onClick={() => window.open("/AdminPanel")}>
                    Explore Admin Panel
                  </Button>
                  <Button
                  className="bg-orange-900 text-white"
                    variant="outline"
                    onClick={() => window.open('/test-chat', '_blank')}
                  >
                    Start Chatting
                  </Button>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button title= "rgdg"className="text-gray-600 hover:text-gray-900">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button title= "rgdg" className="text-gray-600 hover:text-gray-900">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button title= "rgdg" className="text-gray-600 hover:text-gray-900">
                    <Facebook className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Integration;