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
  img?: string; // Image for the service listing or section
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
    img: "mowing2.jpg",
    sections: [
      {
        title: "Included Services",
        description: `
          - Mowing front and back lawns
          - Trimming edges and pathways
          - Grass clipping cleanup
        `,
        image: "mowing2.jpg",
      },
    ],
    testimonial: {
      text: "I was blown away by the transformation! Their attention to detail is unmatched.",
      author: "Laura W.",
    },
    images: {
      before: "overgrown.jpg",
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

  "hedge-trimming": {
    title: "Hedge Trimming Service in San Diego",
    description: `
      Enhance the beauty of your landscape with our **Hedge Trimming Service**. Our skilled team provides precision trimming to ensure your hedges are healthy, visually appealing, and well-maintained.
    `,
    excerpt: "Precision trimming for stunning and healthy hedges.",
    listItems: [
      "Shaping and trimming for all hedge types",
      "Removal of excess trimmings",
      "Promotes healthy growth and proper airflow",
    ],
    img: "/images/shrub.jpg",
    sections: [
      {
        title: "Included Services",
        description: `
          - Shaping and trimming of hedges
          - Removal of trimmings
          - Ensuring healthy hedge growth
        `,
        image: "shrub.jpg",
      },
    ],
    testimonial: {
      text: "Our hedges have never looked so clean and beautiful. Highly recommend their services!",
      author: "Mark T.",
    },
    images: {
      before: "shrub.jpg",
      after: "trimming.jpg",
    },
    faq: [
      {
        question: "How often should I have my hedges trimmed?",
        answer: "We recommend trimming every 4-6 weeks during the growing season for optimal results.",
      },
      {
        question: "Do you handle large hedge projects?",
        answer: "Yes, we handle all hedge sizes and types, from small garden hedges to large estate projects.",
      },
    ],
  },

  "tree-weed-removal": {
    title: "Tree/Weed Removal Service in San Diego",
    description: `
      Say goodbye to unwanted trees and weeds with our **Tree/Weed Removal Service**. We provide complete removal, ensuring your outdoor space remains clean, safe, and beautiful.
    `,
    excerpt: "Comprehensive removal of trees and weeds for a cleaner yard.",
    listItems: [
      "Safe and efficient tree and weed removal",
      "Preventative treatments to inhibit regrowth",
      "Complete debris and stump cleanup",
    ],
    sections: [
      {
        title: "Included Services",
        description: `
          - Removing weeds and small trees from lawns
          - Preventative treatments to inhibit regrowth
          - Complete debris and stump cleanup
        `,
        image: "treeremoval.jpg",
      },
    ],
    testimonial: {
      text: "Their team removed all the unwanted trees and weeds from my property efficiently!",
      author: "Sarah P.",
    },
    images: {
      before: "weedbefore.png",
      after: "weedafter2.png",
    },
    faq: [
      {
        question: "Can you remove large trees?",
        answer: "Yes, we handle small to medium-sized trees safely. For larger trees, we can recommend trusted arborists.",
      },
      {
        question: "Are your treatments safe for pets?",
        answer: "Absolutely. We use eco-friendly treatments that are safe for both pets and the environment.",
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
          - Basic Lawn Mowing: Enjoy expertly manicured grass with regular mowing.
          - Hedge Trimming: Precision shaping and trimming for all hedge types.
          - Tree/Weed Removal: Comprehensive removal and preventative treatments.
        `,
        image: "lawncare2.png",
      },
      {
        title: "Why This Package Is the Best Choice for Your Lawn",
        description: `
          - Cost-Effective Solution: Save significantly with bundled services.
          - Tailored Scheduling: Customized services to fit your lawn’s needs.
          - One-Stop Convenience: All aspects of lawn care managed by a trusted team.
        `,
        image: "landscape3.jpg",
      },
    ],
    testimonial: {
      text: "The Lawn Care Comprehensive Package transformed my yard. It's the perfect combination of convenience and quality!",
      author: "Sophia M.",
    },
    faq: [
      {
        question: "Can I add extra services to the package?",
        answer: "Yes, we can customize the package to include additional services such as irrigation setup or pest control.",
      },
      {
        question: "How often are the services performed?",
        answer: "Frequency options include weekly, bi-weekly, or monthly visits.",
      },
      {
        question: "Is this package suitable for large properties?",
        answer: "Absolutely! We tailor our services to lawns of all sizes.",
      },
    ],
  },
};
