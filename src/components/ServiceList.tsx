import React from 'react';
import Link from 'next/link';

interface Service {
  name: string;
  description: string;
  price: string;
  href: string;
}

interface ServiceListProps {
  title: string;
  services: Service[];

  // Optional: pass a flag for "isPackages"
  highlight?: boolean; 
}

const ServiceList: React.FC<ServiceListProps> = ({
  title,
  services,
  highlight = false
}) => {
  return (
    <section
      className={`glassmorphism-card p-6 mb-6 bg-gradient-to-br from-black via-[#001a15] to-[#004d40] shadow-2xl backdrop-blur-lg ${
        highlight ? 'border-2 border-green-300' : ''
      }`}
    >
      <h3
        className={`${
          highlight ? 'text-3xl' : 'text-2xl'
        } font-semibold text-white mb-4`}
      >
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className={`border rounded-lg p-4 text-white hover:scale-[1.02] transition-transform duration-300 ${
              highlight
                ? 'border-green-300 shadow-xl bg-[#021f19]/50'
                : 'border-white/20 shadow-lg bg-[#021f19]/25'
            }`}
          >
            <h4 className="text-lg font-semibold mb-1">{service.name}</h4>
            <p className="text-white/80 mb-1">{service.price}</p>
            <p className="text-sm text-white/70 mb-2">{service.description}</p>

            <div className="flex items-center space-x-2 mt-3">
              <Link
                href={service.href}
                className="underline text-sm hover:text-green-300"
              >
                Read More
              </Link>
              <Link
                href={`/booking?service=${service.name}`}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
