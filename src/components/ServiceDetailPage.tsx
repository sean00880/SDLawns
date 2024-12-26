import React from 'react';
import Link from 'next/link';

interface ServiceDetailPageProps {
  title: string;
  price: string;
  includes: string[];
  service: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ title, price, includes, service }) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="glassmorphism-card p-8">
        <h1 className="text-3xl font-bold text-pure-white mb-4">{title}</h1>
        
        <div className="glass p-6 mb-8">
          <h2 className="text-sm font-medium text-blue-200 mb-2">Pricing</h2>
          <p className="text-2xl font-semibold text-blue-100">{price}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-pure-white mb-4">Service Includes:</h2>
          <ul className="space-y-3">
            {includes.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link 
          href={`/booking?service=${service}`}
          className="inline-flex items-center justify-center px-6 py-3 border border-blue-500 text-base font-medium rounded-md text-blue-100 bg-blue-900 bg-opacity-50 hover:bg-opacity-70 transition-all duration-200 hover:scale-105"
        >
          Book This Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
