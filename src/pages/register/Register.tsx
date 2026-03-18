import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import { useState } from 'react';

export default function Register() {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      role: '1',
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
      phoneNumber: Yup.string().required('Phone number is required'),
      role: Yup.string()
        .oneOf(['1', '2'], 'Please select a valid role')
        .required('Role is required'),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        'You must accept the terms and conditions',
      ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const userData = {
          name: values.fullName,
          email: values.email,
          password: values.password,
          phone_number: values.phoneNumber,
          role_id: parseInt(values.role),
        };

        console.log('Sending to backend:', userData);

        const response = await api.register(userData);

        await Swal.fire({
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

        resetForm();
      } catch (error: any) {
        await Swal.fire({
          title: 'Registration Failed',
          text:
            error.response?.data?.message ||
            'An error occurred. Please try again.',
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

  const roleOptions = [
    { value: '1', label: 'Admin' },
    { value: '2', label: 'Employee' },
  ];

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden bg-slate-950">
      <div className="flex w-full max-w-7xl mx-auto bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-slate-800">
        {/* Left Side - Register Form (50%) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-400">
                Get started with your free account
              </p>
            </div>

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

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                  placeholder="Enter your phone number (10 digits)"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Role - Dropdown */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                    formik.touched.role && formik.errors.role
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-700 focus:ring-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 cursor-pointer appearance-none`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  <option value="" disabled className="bg-slate-800">
                    Select your role
                  </option>
                  {roleOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-slate-800"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.role && formik.errors.role && (
                  <p className="mt-1 text-sm text-red-400">
                    {formik.errors.role}
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
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`w-full px-4 py-3 pr-12 rounded-lg bg-slate-800/50 border ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-700 focus:ring-blue-500'
                    } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                    placeholder="Create a password"
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

              {/* Confirm Password Field with Peek */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={`w-full px-4 py-3 pr-12 rounded-lg bg-slate-800/50 border ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-700 focus:ring-blue-500'
                    } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                  >
                    {showConfirmPassword ? (
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

        {/* Right Side - Product Image */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
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
