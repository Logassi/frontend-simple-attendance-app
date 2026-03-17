import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

export default function Register() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters'),
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
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
      company: Yup.string().required('Company name is required'),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        'You must accept the terms and conditions',
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Your account has been created. Please check your email to verify your account.',
          icon: 'success',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Continue to Login',
          timer: 3000,
          timerProgressBar: true,
        });

        console.log('Registration values:', values);
      } catch (error) {
        // Show error message
        Swal.fire({
          title: 'Registration Failed',
          text: 'An error occurred. Please try again.',
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
        {/* Left Side - Register Form (50%) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-400">
                Get started with your free account
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.fullName && formik.errors.fullName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your full name"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

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

              {/* Company Field */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.company && formik.errors.company
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your company name"
                />
                {formik.touched.company && formik.errors.company && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.company}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Create a password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Confirm your password"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.agreeTerms}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-slate-700 rounded bg-slate-800/50 cursor-pointer"
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    I agree to the{' '}
                    <a
                      href="/terms"
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy"
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                  {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-400">
                      {formik.errors.agreeTerms}
                    </p>
                  )}
                </div>
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
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition duration-200"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Product Image (50%) */}
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
              <h2 className="text-4xl font-bold mb-4">Attendance Management</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Join thousands of companies managing their workforce efficiently
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
