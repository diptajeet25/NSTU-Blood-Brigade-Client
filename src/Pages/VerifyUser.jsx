import { sendEmailVerification } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { MailCheck } from "lucide-react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const resend = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent again.");
    } catch (error) {
     toast.error("Please log in again to resend the verification email.");
    }
  };

  return (
    <>
    <title>Verify Email-NSTU Blood Brigade</title>
      <Navbar />

      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">

          <div className="flex justify-center mb-4 text-red-600">
            <MailCheck size={48} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Email Address
          </h2>

    
          <p className="mt-3 text-gray-600 text-sm">
            We’ve sent a verification link to your email address.  
            Please check your inbox and click the link to activate your account.
          </p>

          <button
            onClick={resend}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition"
          >
            Resend Verification Email
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Didn’t receive the email? Check your spam folder or try again.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VerifyEmail;
