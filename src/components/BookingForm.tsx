"use client";
import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import { useRouter, useSearchParams } from 'next/navigation';

interface Prices {
  'basic-package': { sedan: number; 'suv/truck': number; van: number };
  'standard-package': { sedan: number; 'suv/truck': number; van: number };
  'premium-package': { sedan: number; 'suv/truck': number; van: number };
  'basic-exterior': { sedan: number; 'suv/truck': number; van: number };
  'standard-exterior': { sedan: number; 'suv/truck': number; van: number };
  'premium-exterior': { sedan: number; 'suv/truck': number; van: number };
  'basic-interior': { sedan: number; 'suv/truck': number; van: number };
  'standard-interior': { sedan: number; 'suv/truck': number; van: number };
  'premium-interior': { sedan: number; 'suv/truck': number; van: number };
}

type ServiceOption = keyof Prices;

const BookingForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get('service') ?? '';

  const [selectedService, setSelectedService] = useState<ServiceOption | ''>(
    serviceParam ? (serviceParam as ServiceOption) : ''
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    'sedan' | 'suv/truck' | 'van' | ''
  >('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const prices: Prices = {
    'basic-package': { sedan: 100, 'suv/truck': 155, van: 195 },
    'standard-package': { sedan: 210, 'suv/truck': 255, van: 310 },
    'premium-package': { sedan: 325, 'suv/truck': 375, van: 450 },
    'basic-exterior': { sedan: 60, 'suv/truck': 80, van: 100 },
    'standard-exterior': { sedan: 95, 'suv/truck': 140, van: 160 },
    'premium-exterior': { sedan: 250, 'suv/truck': 295, van: 320 },
    'basic-interior': { sedan: 70, 'suv/truck': 110, van: 130 },
    'standard-interior': { sedan: 185, 'suv/truck': 225, van: 250 },
    'premium-interior': { sedan: 265, 'suv/truck': 305, van: 325 },
  };

  const calculatePrice = () => {
    let price = 0;
    if (selectedService && selectedVehicleType) {
      price = prices[selectedService]?.[selectedVehicleType] || 0;
    }
    setTotalPrice(price);
    console.log('Total Price:', totalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedService, selectedVehicleType, selectedDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Grab all the form field values with FormData:
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    console.log('Form submitted:', {
      name,
      email,
      phone,
      service: selectedService,
      vehicleType: selectedVehicleType,
      date: selectedDate,
    });

    // Example of routing somewhere else after submission
    router.push('/');
  };

  return (
    <div className="booking-form-container grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="form-column">
        <h2>Book a Service</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="service">Select Service</label>
            <select
              id="service"
              name="service"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value as ServiceOption);
                calculatePrice();
              }}
              required
            >
              <option value="">-- Select a service --</option>
              <option value="basic-package">Basic Package</option>
              <option value="standard-package">Standard Package</option>
              <option value="premium-package">Premium Package</option>
              <option value="basic-exterior">Basic Exterior Wash</option>
              <option value="standard-exterior">Standard Exterior Detail</option>
              <option value="premium-exterior">Premium Exterior Detail</option>
              <option value="basic-interior">Basic Interior Cleaning</option>
              <option value="standard-interior">Standard Interior Detail</option>
              <option value="premium-interior">Premium Interior Detail</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={selectedVehicleType}
              onChange={(e) => {
                setSelectedVehicleType(
                  e.target.value as 'sedan' | 'suv/truck' | 'van'
                );
                calculatePrice();
              }}
              required
            >
              <option value="">-- Select vehicle type --</option>
              <option value="sedan">Sedan</option>
              <option value="suv/truck">SUV/Truck</option>
              <option value="van">Van</option>
            </select>
          </div>

          <Calendar onChange={setSelectedDate} />

          {/* Payment section - placeholder */}
          <div className="payment-section mt-4">
            <h3>Payment</h3>
            <p>Stripe integration will be added later.</p>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="price-summary-column lg:sticky top-20 p-4 bg-gray-100 rounded-md shadow">
        <h3>Price Summary</h3>
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default BookingForm;
