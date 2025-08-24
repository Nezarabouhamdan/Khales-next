import Image from "next/image";
import CheckmarkIcon from "./icons/CheckmarkIcon"; // Assuming you have a checkmark icon component

const OurProcessSection = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Column 1: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {content.title}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">{content.description}</p>
            <ul className="space-y-4">
              {content.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start"
                >
                  <div className="flex-shrink-0">
                    {/* You can replace this with your actual checkmark icon component */}
                    <svg
                      className="w-6 h-6 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Image */}
          <div className="md:w-1/2">
            <div className="relative aspect-square shadow-xl rounded-lg overflow-hidden">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
