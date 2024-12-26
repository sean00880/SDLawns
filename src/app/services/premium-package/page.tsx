import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const PremiumPackagePage = () => {
  const title = 'Premium Package';
  const price = '$325 (sedan) $375 (suv/truck) $450 (vans)';
  const includes = [
    'Steam cleaning of all surfaces',
    'Odor removal treatment',
    'Detailed cleaning of vents and crevices',
    'Clay bar treatment',
    'Paint sealant application',
    'Waterless Hand Wash, and dry.',
    'Wax application',
    'Tire dressing',
    'Exterior trim dressing',
    'Carpet deodorizer and Steamer',
    'Deep cleaning of upholstery',
    'Leather cleaning and conditioning',
    'Stain removal',
    'Compressed air purge',
    'Complete interior vacuum',
    'Natural shine application/uv protector',
    'Cleaning of windows and mirrors',
  ];
    const service = 'premium-package';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default PremiumPackagePage;
