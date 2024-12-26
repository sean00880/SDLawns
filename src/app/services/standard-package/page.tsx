import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const StandardPackagePage = () => {
  const title = 'Standard Package';
  const price = '$210 (sedan) $255 (suv/truck) $310 (van)';
  const includes = [
    'Foam Cannon, Hand wash, and dry.',
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
    const service = 'standard-package';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default StandardPackagePage;
