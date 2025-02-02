import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUserAction, sendVerificationEmailAction, verifyEmailCodeAction } from '../Store/UserSlice';
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationPending, setVerificationPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {signInWithGoogle}=useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUserAction(formData))
      .then((data) => {
        if (data?.payload?.success) {
          setVerificationPending(true);
          toast.success("Registration successful. Please check your email for a verification code.");

          dispatch(sendVerificationEmailAction(formData.email))
            .then(emailResponse => {
              if (emailResponse?.payload?.success) {
                toast.success("Verification email sent successfully!");
                setVerificationSent(true);
              } else {
                toast.error(emailResponse?.payload?.message || "Error sending verification email.");
              }
            });
        } else {
          toast.error(data?.payload?.message || "Registration failed.");
        }
      })
      .catch((error) => {
        toast.error(error.message || "An unexpected error occurred.");
      });
  };

  const handleVerification = () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code.");
      return;
    }

    dispatch(verifyEmailCodeAction({ email: formData.email, verificationCode }))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success("Email verified successfully!");
          navigate("/organization-setup")
        } else {
          toast.error(data?.payload?.message || "Verification failed.");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Error verifying code.");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast.success("Signed in successfully! Please check your email for a verification code.");
        navigate("/organization-setup")
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200  to-yellow-300">
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 p-2">
            <Bot className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Get started with your AI chatbot journey</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!verificationSent ? (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      required
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      required
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md"
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="w-full pl-10 py-2 border border-gray-300 rounded-md"
                    />
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full py-2 bg-orange-600 text-white rounded-md flex justify-center items-center">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t ml-2 mr-2  border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className=" text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-yellow-100"
                onClick= { handleGoogleSignIn}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="mr-2 h-5 w-5"
                />
                Continue with Google
              </Button>
            </>
          ) 
          : (
            <div className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">Verification Code</label>
                <p className="mt-1 text-sm text-gray-500">We've sent a verification code to your email address</p>
                <div className="mt-2">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                    className="w-full text-center text-lg py-2 border border-gray-300 rounded-md tracking-widest"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button onClick={handleVerification} type="button" className="w-full py-2 bg-blue-600 text-white rounded-md flex justify-center items-center">
                Verify Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </form>
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

export default Registration;
