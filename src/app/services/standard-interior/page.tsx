import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const StandardInteriorPage = () => {
  const title = 'Standard Interior Detail';
  const price = '$185 (sedan) $225 (suv/truck) $250 (van)';
  const includes = [
    'Carpet deodorizer and Steamer',
    'Deep cleaning of upholstery',
    'Leather cleaning and conditioning',
    'Stain removal',
    'Compressed air purge',
    'Complete interior vacuum',
    'Natural shine application/uv protector',
    'Cleaning of windows and mirrors',
  ];
    const service = 'standard-interior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default StandardInteriorPage;
