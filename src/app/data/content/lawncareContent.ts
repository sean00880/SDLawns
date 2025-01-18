export type Section = {
  title: string;
  description: string;
  image?: string;
};

export type Testimonial = {
  text: string;
  author: string;
};

export type Images = {
  before?: string;
  after?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  title: string;
  description: string;
  sections: Section[];
  testimonial?: Testimonial;
  images?: Images;
  faq?: FAQ[];
  excerpt?: string; // Short summary of the service
  listItems?: string[]; // List of key features or benefits
};

export const lawncareContent: Record<string, ServiceContent> = {
  "basic-lawn-mowing": {
    title: "Basic Lawn Mowing Service in San Diego",
    description: `
      A beautifully maintained lawn is the heart of any outdoor space. With our **Basic Lawn Mowing Service**, you’ll enjoy a lush, healthy lawn that enhances the beauty of your property. We go beyond just cutting grass—we’re here to elevate your lawn care experience to the next level. Whether you need weekly upkeep or one-time service, our professional team ensures your lawn always looks its best.
    `,
    excerpt: "Experience a beautifully maintained lawn with our expert mowing service.",
    listItems: [
      "Professional lawn mowing for all property sizes",
      "Edging and trimming for a polished look",
      "Grass clippings cleared for a pristine finish",
    ],
    sections: [
      {
        title: "Included Services",
        description: `
          - Mowing front and back lawns
          - Trimming edges and pathways
          - Grass clipping cleanup
        `,
        image: "/images/landscape1.jpg",
      },
    ],
    testimonial: {
      text: `"I was blown away by the transformation! Their attention to detail is unmatched."`,
      author: "Laura W.",
    },
    images: {
      before: "before-wilson.jpg",
      after: "landscape1.jpg",
    },
    faq: [
      {
        question: "Can you handle large properties?",
        answer: "Absolutely. We service properties of all sizes, from small yards to expansive estates.",
      },
      {
        question: "Do you offer organic lawn treatments?",
        answer: "Yes! We provide eco-friendly solutions tailored to your lawn’s needs.",
      },
    ],
  },

  "lawn-care-comprehensive-package": {
    title: "Lawn Care Comprehensive Package",
    description: `
      Take the guesswork out of maintaining a lush and inviting lawn with our **Lawn Care Comprehensive Package**. Perfect for homeowners seeking an all-in-one solution, this package brings together a wide array of professional lawn care services designed to keep your yard in pristine condition year-round.
    `,
    excerpt: "A complete lawn care solution for year-round beauty and health.",
    listItems: [
      "Comprehensive lawn maintenance services",
      "Cost-effective bundled solutions",
      "Tailored scheduling for optimal results",
    ],
    sections: [
      {
        title: "Included Services",
        description: `
          - Basic Lawn Mowing: Enjoy expertly manicured grass with regular mowing that promotes even, healthy growth while enhancing the overall appearance of your property.
          - Hedge Trimming: Our skilled team shapes and trims your hedges with precision, ensuring they remain visually stunning and healthy by promoting proper airflow and growth.
          - Tree/Weed Removal: Removing weeds and small trees from lawns, preventing regrowth, and ensuring complete debris cleanup.
        `,
        image: "/images/lawncare2.png",
      },
      {
        title: "Why This Package Is the Best Choice for Your Lawn",
        description: `
          - Cost-Effective Solution: Save significantly when you bundle essential services together rather than scheduling them individually.
          - Tailored Scheduling: Services are customized to fit your lawn’s unique needs, ensuring optimal results during every season of the year.
          - One-Stop Convenience: No need to juggle multiple contractors—our comprehensive approach ensures all aspects of lawn care are expertly managed by a single trusted team.
        `,
        image: "/images/lawncare-benefits.jpg",
      },
    ],
    testimonial: {
      text: `"The Lawn Care Comprehensive Package has completely transformed my yard. It’s the perfect combination of convenience, value, and quality. My lawn has never looked better!"`,
      author: "Sophia M.",
    },
    faq: [
      {
        question: "Can I add extra services to the package?",
        answer: "Yes, we can customize the package to include additional services such as irrigation setup or pest control to meet your specific needs.",
      },
      {
        question: "How often are the services performed?",
        answer: "Frequency options include weekly, bi-weekly, or monthly visits. We'll work with you to create a schedule that ensures your lawn remains beautiful year-round.",
      },
      {
        question: "Is this package suitable for large properties?",
        answer: "Absolutely! We tailor our services to lawns of all sizes, from cozy yards to expansive estates.",
      },
    ],
  },
};

