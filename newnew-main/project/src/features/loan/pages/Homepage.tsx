import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, Calculator, MapPin, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl overflow-hidden mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Smart Loan Comparison
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                Compare loans from top banks in India, calculate EMIs, and find nearby branches - all in one place.
              </p>
              <div className="mt-10 sm:flex">
                <div className="rounded-md shadow">
                  <Link
                    to="/loans"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:text-lg"
                  >
                    Compare Loans
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/calculator"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 md:text-lg"
                  >
                    Calculate EMI
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                className="relative mx-auto rounded-lg shadow-xl"
                width={490}
                src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Person using a calculator with financial documents"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Loan Tools</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make informed decisions about your loans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="bg-indigo-100 inline-flex p-3 rounded-lg mb-4">
              <Landmark className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loan Comparison</h3>
            <p className="text-gray-600 mb-4">
              Compare loan options from top banks in India to find the best rates and terms for your needs.
            </p>
            <Link
              to="/loans"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              Compare Loans
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="bg-indigo-100 inline-flex p-3 rounded-lg mb-4">
              <Calculator className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">EMI Calculator</h3>
            <p className="text-gray-600 mb-4">
              Calculate your monthly EMI based on loan amount, interest rate, and tenure with our easy-to-use calculator.
            </p>
            <Link
              to="/calculator"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              Calculate EMI
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="bg-indigo-100 inline-flex p-3 rounded-lg mb-4">
              <MapPin className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Branch Locator</h3>
            <p className="text-gray-600 mb-4">
              Find bank branches near you using your current location or search by city, area, or bank name.
            </p>
            <Link
              to="/branches"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              Find Branches
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Banks Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Compare Loans from Top Banks</h2>
          <p className="mt-4 text-gray-600">
            We provide loan information from India's leading banking institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" 
              alt="State Bank of India" 
              className="h-10"
            />
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/2/28/HDFC_Bank_Logo.svg" 
              alt="HDFC Bank" 
              className="h-10"
            />
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" 
              alt="ICICI Bank" 
              className="h-10"
            />
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Axis_Bank_logo.svg" 
              alt="Axis Bank" 
              className="h-10"
            />
          </div>
          <div className="bg-white p-4 rounded-lg flex items-center justify-center h-24 shadow-sm">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/4/4c/Punjab_National_Bank_logo.svg" 
              alt="Punjab National Bank" 
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We make the loan comparison process simpler, smarter, and more transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="bg-indigo-100 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Information</h3>
              <p className="text-gray-600">
                All our loan data is verified and up-to-date, ensuring you make decisions based on accurate information.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="bg-indigo-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Comparison</h3>
              <p className="text-gray-600">
                Compare multiple loan options side-by-side to identify the best terms, rates, and features.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">
                Finding the right loan can save you thousands of rupees over the loan tenure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 rounded-xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to find your perfect loan?
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-100">
              Start comparing loans from top banks and calculate your EMI today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/loans"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Compare Loans
            </Link>
            <Link
              to="/calculator"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70"
            >
              Calculate EMI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;