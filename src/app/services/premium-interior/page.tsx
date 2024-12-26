import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const PremiumInteriorPage = () => {
  const title = 'Premium Interior Detail';
  const price = 'Sedan ($265) Suv/truck ($305) Van ($325)';
  const includes = [
    'Steam cleaning of all surfaces',
    'Odor removal treatment',
    'Detailed cleaning of vents and crevices',
    'Carpet deodorizer and Steamer',
    'Deep cleaning of upholstery',
    'Leather cleaning and conditioning',
    'Stain removal',
    'Compressed air purge',
    'Complete interior vacuum',
    'Natural shine application/uv protector',
    'Cleaning of windows and mirrors',
  ];
    const service = 'premium-interior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default PremiumInteriorPage;
