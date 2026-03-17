import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import useAuthStore from '../../utils/store/useAuthStore';

// Define types
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const login = useAuthStore((state) => state.login);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        )
        .required('Password is required'),
    }),
    onSubmit: async (values: LoginFormValues, { setSubmitting }) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // After successful API response:
        const userData = {
          id: '123',
          name: 'John Doe',
          email: values.email,
          role: 'user' as const,
        };

        login(userData); // Update global state

        // Show success message
        Swal.fire({
          title: 'Success!',
          text: 'Login successful! Welcome back.',
          icon: 'success',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Continue',
          timer: 3000,
          timerProgressBar: true,
        });

        console.log('Login values:', values);
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Try Again',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden bg-slate-950">
      {/* Split Layout Container */}
      <div className="flex w-full max-w-7xl mx-auto bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-slate-800">
        {/* Left Side - Product Image (50%) */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              {/* Product Image - Replace src with your actual product image */}
              <div className="mb-8 relative">
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
                  <img
                    src="group-business-people-having-meeting.jpg"
                    alt="Meeting"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">Attendance Management</h2>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form (50%) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">Please sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/*Forgot Password */}
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {formik.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition duration-200"
                >
                  Sign up now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
