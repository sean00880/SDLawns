import React from 'react';
import ServiceDetailPage from '../../../components/ServiceDetailPage';

const PremiumExteriorPage = () => {
  const title = 'Premium Exterior Detail';
  const price = '$250 (sedan) $295 (suv/truck) $320 (van)';
  const includes = [
    'Foam Cannon, Hand wash, and dry.',
    'Wax application',
    'Tire dressing',
    'Door Jamb cleaning',
    'Exterior trim dressing',
    'Windows and mirrors',
    'Cermaic Spray Sealant',
    'Detail of rims and tires',
    'Clay bar exterior',
    '1 step polishing',
  ];
    const service = 'premium-exterior';

  return (
    <ServiceDetailPage title={title} price={price} includes={includes} service={service} />
  );
};

export default PremiumExteriorPage;
