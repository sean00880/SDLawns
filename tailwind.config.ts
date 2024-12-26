import type { Config } from "tailwindcss";

/** 
 * A minimal type definition for the plugin context parameters.
 * Expand or refine as needed. 
 */
type TailwindPluginAPI = {
  addUtilities: (
    utilities: Record<string, Record<string, string>>,
    variants?: string[]
  ) => void;
  theme: (path: string) => any;
  e: (className: string) => string;
};

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
		colors: {
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			"dark-green": "#004D40",
			"dark-black": "#000000",
			"pure-white": "#FFFFFF",
			card: {
			  DEFAULT: "hsl(var(--card))",
			  foreground: "hsl(var(--card-foreground))",
			},
			popover: {
			  DEFAULT: "hsl(var(--popover))",
			  foreground: "hsl(var(--popover-foreground))",
			},
			primary: {
			  DEFAULT: "hsl(var(--primary))",
			  foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
			  DEFAULT: "hsl(var(--secondary))",
			  foreground: "hsl(var(--secondary-foreground))",
			},
			muted: {
			  DEFAULT: "hsl(var(--muted))",
			  foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
			  DEFAULT: "hsl(var(--accent))",
			  foreground: "hsl(var(--accent-foreground))",
			},
			destructive: {
			  DEFAULT: "hsl(var(--destructive))",
			  foreground: "hsl(var(--destructive-foreground))",
			},
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			chart: {
			  1: "hsl(var(--chart-1))",
			  2: "hsl(var(--chart-2))",
			  3: "hsl(var(--chart-3))",
			  4: "hsl(var(--chart-4))",
			  5: "hsl(var(--chart-5))",
			},
		  },
	
		  borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		  },
	

      keyframes: {
        fadeOneThird: {
          "0%, 30%": { opacity: "1" },
          "33%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-30s-infinite": "fadeOneThird 30s infinite ease-in-out",
      },
      animationDelay: {
        "0s": "0s",
        "10s": "10s",
        "20s": "20s",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),

    // This plugin generates `.delay-0s`, `.delay-10s`, `.delay-20s` classes
    function addAnimationDelayClasses({ addUtilities, theme, e }: TailwindPluginAPI) {
      // get the dictionary from theme("animationDelay")
      const delays = theme("animationDelay") || {};

      // Build a single object to pass to addUtilities
      const utilities: Record<string, Record<string, string>> = {};

      // For each delay key: e.g. key="10s", value="10s"
      // we produce `.delay-10s { animation-delay: 10s }`
      for (const [key, value] of Object.entries(delays)) {
        // ensure `value` is cast to string if TypeScript sees it as unknown
        utilities[`.delay-${e(key)}`] = {
          animationDelay: String(value),
        };
      }

      // Now pass the object to addUtilities
      addUtilities(utilities, ["responsive"]);
    },
  ],
} satisfies Config;
