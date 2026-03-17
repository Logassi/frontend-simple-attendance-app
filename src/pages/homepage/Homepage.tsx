import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Shield,
  BarChart,
  Camera,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../utils/store/useAuthStore';

export default function Homepage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm text-gray-300">
              Trusted by 10,000+ companies
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
            Smart Attendance
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Management System
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Streamline your workforce management with AI-powered facial
            recognition, real-time tracking, and comprehensive analytics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200"
                >
                  Watch Demo
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { label: 'Active Users', value: '10k+', icon: Users },
              { label: 'Companies', value: '500+', icon: Shield },
              { label: 'Accuracy', value: '99.9%', icon: CheckCircle },
              { label: 'Countries', value: '30+', icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-16 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to manage attendance
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful features that make attendance tracking simple, accurate,
              and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'Facial Recognition',
                description:
                  'AI-powered facial recognition for accurate and fraud-proof attendance marking.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Clock,
                title: 'Real-time Tracking',
                description:
                  'Monitor employee attendance in real-time with instant notifications.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: MapPin,
                title: 'Geo-fencing',
                description:
                  'Set location boundaries to ensure attendance is marked from valid locations.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: BarChart,
                title: 'Advanced Analytics',
                description:
                  'Comprehensive reports and insights to optimize workforce management.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Calendar,
                title: 'Leave Management',
                description:
                  'Streamlined leave requests and approval workflows.',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                icon: Shield,
                title: 'Secure & Compliant',
                description:
                  'Enterprise-grade security with GDPR and SOC2 compliance.',
                color: 'from-red-500 to-red-600',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Three simple steps to transform your attendance management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Account',
                description:
                  'Sign up for free and set up your company profile in minutes.',
              },
              {
                step: '02',
                title: 'Add Employees',
                description:
                  'Import or add employees and their facial recognition data.',
              },
              {
                step: '03',
                title: 'Start Tracking',
                description:
                  'Employees can start marking attendance with a simple selfie.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-blue-600/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
                {item.step !== '03' && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section
      <section className="py-20 px-4 sm:px-16 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$29',
                description: 'Perfect for small teams',
                features: [
                  'Up to 50 employees',
                  'Basic analytics',
                  'Email support',
                  'Facial recognition',
                ],
              },
              {
                name: 'Professional',
                price: '$99',
                description: 'Best for growing companies',
                features: [
                  'Up to 500 employees',
                  'Advanced analytics',
                  'Priority support',
                  'API access',
                  'Custom reports',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: [
                  'Unlimited employees',
                  'Dedicated account manager',
                  '24/7 phone support',
                  'Custom integration',
                  'SLA agreement',
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-600 to-purple-600 scale-105'
                    : 'bg-slate-800/50 border border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}
                >
                  {plan.name}
                </h3>
                <div
                  className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-white'}`}
                >
                  {plan.price}
                  {plan.price !== 'Custom' && (
                    <span className="text-lg font-normal text-gray-400">
                      /mo
                    </span>
                  )}
                </div>
                <p
                  className={`mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-400'}`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${plan.popular ? 'text-white' : 'text-blue-400'}`}
                      />
                      <span
                        className={
                          plan.popular ? 'text-white' : 'text-gray-300'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials Section
      <section className="py-20 px-4 sm:px-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "This system has revolutionized how we track attendance. The
                  facial recognition is incredibly accurate and has eliminated
                  time theft completely."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {['JD', 'SM', 'RK'][i - 1]}
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-semibold">
                      {['John Doe', 'Sarah Miller', 'Robert King'][i - 1]}
                    </p>
                    <p className="text-sm text-gray-400">
                      {
                        [
                          'CEO, TechCorp',
                          'HR Director, InnovateInc',
                          'Founder, StartupHub',
                        ][i - 1]
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section
      <section className="py-20 px-4 sm:px-16 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Attendance Management?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of companies already using our platform
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Free 14-day trial
          </p>
        </div>
      </section> */}
    </div>
  );
}
