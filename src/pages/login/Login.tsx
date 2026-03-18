import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import useAuthStore from '../../utils/store/useAuthStore';
import { useState } from 'react';
import { api } from '../../services/api'; // Import your API service
import { useNavigate } from 'react-router-dom';

// Define types
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        // Call actual API
        const response = await api.login({
          email: values.email,
          password: values.password,
        });

        // After successful API response:
        const userData = {
          id: response.data.user.id,
          name: response.data.user.name || 'User',
          email: response.data.user.email,
          role_id: response.data.user.role_id === 1 ? 'admin' : 'employee',
        };

        login(userData); // Update global state

        // Save token if using JWT
        if (values.rememberMe) {
          localStorage.setItem('token', response.data.token);
        } else {
          sessionStorage.setItem('token', response.data.token);
        }

        // Show success message
        await Swal.fire({
          title: 'Success!',
          text: 'Login successful! Welcome back.',
          icon: 'success',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Continue',
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            navigate('/dashboard'); // Redirect after message
          },
        });

        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
      } catch (error: any) {
        // Show error message
        await Swal.fire({
          title: 'Error!',
          text:
            error.response?.data?.message ||
            'Login failed. Please check your credentials.',
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
              {/* Product Image */}
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
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Access your attendance dashboard and manage your workforce
                efficiently
              </p>
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
                  className="block text-sm font-medium text-gray-300 mb-2"
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
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password Field with Peek */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`w-full px-4 py-3 pr-12 rounded-lg bg-slate-800/50 border ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-700 focus:ring-blue-500'
                    } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? (
                      // Eye slash icon (password hidden)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      // Eye icon (password visible)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-slate-700 rounded bg-slate-800/50 cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-sm text-gray-300 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition duration-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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
              <p className="text-center text-sm text-gray-400 mt-6">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition duration-200"
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
