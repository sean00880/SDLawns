const packages = [
    {
      name: 'Basic Package',
      price: '$100 (sedan) $155 (suv/truck) $195 (van)',
      description: 'Hand wash and dry, Wheel and tire cleaning, Window cleaning (exterior) and (interior), Vacuuming seats, carpets, and mats, Wipe down of dashboard, console, and door panels, Window cleaning',
      href: '/services/basic-package',
    },
    {
      name: 'Standard Package',
      price: '$210-(sedan) $255-(suv/truck) $310-(van)',
      description: 'Foam Cannon, Hand wash, and dry., Wax application, Tire dressing, Exterior trim dressing, Carpet deodorizer and Steamer, Deep cleaning of upholstery, Leather cleaning and conditioning, Stain removal, Compressed air purge, Complete interior vacuum, Natural shine application/uv protector, Cleaning of windows and mirrors',
      href: '/services/standard-package',
    },
    {
      name: 'Premium Package',
      price: '$325-(sedan) $375 -(suv/truck) $450-(vans)',
      description: 'Steam cleaning of all surfaces, Odor removal treatment, Detailed cleaning of vents and crevices, Clay bar treatment, Paint sealant application, Waterless Hand Wash, and dry., Wax application, Tire dressing, Exterior trim dressing, Carpet deodorizer and Steamer, Deep cleaning of upholstery, Leather cleaning and conditioning, Stain removal, Compressed air purge, Complete interior vacuum, Natural shine application/uv protector, Cleaning of windows and mirrors',
      href: '/services/premium-package',
    },
  ];

  const exteriorServices = [
    {
      name: 'Basic Exterior Wash',
      price: '$60- (sedan) $80 - (suv/truck) $100 (van)',
      description: 'Same description as on-site',
      href: '/services/basic-exterior',
    },
    {
      name: 'Standard Exterior Detail',
      price: '$95 (sedan) $140 - (suv/truck) $160 (van)',
      description: 'Foam Cannon, Hand wash, and dry. Wax application Tire dressing Exterior trim dressing Windows and mirrors Ceramic Spray Sealant Detail of rims and tires Door jamb cleaning',
      href: '/services/standard-exterior',
    },
    {
      name: 'Standard Interior Detail',
      price: '$185 (sedan) $225 (suv/truck) $250 (van)',
      description: 'Carpet deodorizer and Steamer Deep cleaning of upholstery Leather cleaning and conditioning Stain removal compressed air purge complete interior vacuum natural shine application/uv protector Cleaning of windows and mirrors',
      href: '/services/standard-interior',
    },
  ];

  const interiorServices = [
    {
      name: 'Basic interior cleaning',
      price: '$70 (sedan) $110 (suv/truck) $130 (van)',
      description: 'Window cleaning (exterior) and (interior) Vacuuming seats, carpets, and mats Wipe down of dashboard, console, and door panels Window cleaning',
      href: '/services/basic-interior',
    },
    {
      name: 'Standard Interior Detail',
      price: '$185 (sedan) $225 (suv/truck) $250 (van)',
      description: 'Carpet deodorizer and Steamer Deep cleaning of upholstery Leather cleaning and conditioning Stain removal compressed air purge complete interior vacuum natural shine application/uv protector Cleaning of windows and mirrors',
      href: '/services/standard-interior',
    },
    {
      name: 'Premium Interior Detail',
      price: 'Sedan ($265) Suv/truck ($305) Van ($325)',
      description: 'Steam cleaning of all surfaces Odor removal treatment Detailed cleaning of vents and crevices Carpet deodorizer and Steamer Deep cleaning of upholstery Leather cleaning and conditioning Stain removal compressed air purge complete interior vacuum natural shine application/uv protector Cleaning of windows and mirrors',
      href: '/services/premium-interior',
    },
  ];

export { packages, exteriorServices, interiorServices };
