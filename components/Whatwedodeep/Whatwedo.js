import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./styles.css"; // Create this CSS file
import { useLanguage } from "../../Context/Languagecontext";
import { Title, GreenText } from "../Whoweare/TextContent";

export default function ServicesSwiper() {
  const { language } = useLanguage(); // Use the context
  const services = {
    eng: [
      {
        title: "Projects feasibility study",
        image: "https://i.ibb.co/yFThVWVN/architecture.png", // Use imported assets here
        link: "/Projectfeasability",
      },
      {
        title: "Interior Design",
        image: "https://i.ibb.co/Gfcksvnj/interior.png",
        link: "InteriorDesign",
      },
      {
        title: "Development Planning",
        image:
          "https://img.freepik.com/premium-photo/back-view-architects-engineers-helmet-construction-site-generative-ai_81262-3132.jpg", // URL example
        link: "Developmentplanning",
      },
      {
        title: "Project Management",
        image: "https://i.ibb.co/XkjJMvHQ/project-management.png",
        link: "/ProjectManagement",
      },

      {
        title: "Landscaping",
        image: "https://i.ibb.co/zWqLyY8p/landscape.png",
        link: "/LandscapingDesign",
      },
      {
        title: "Investing",
        image: "https://i.ibb.co/xqHS6kX0/real-estate.png",
        link: "/Investing",
      },
      {
        title: "Engineering Consulting",
        image: "https://i.ibb.co/99QD96G8/eng-cons.jpg",
        link: "/EngineeringConsultancy",
      },
    ],
    ar: [
      {
        title: "دراسة جدوى المشاريع",
        image: "https://i.ibb.co/yFThVWVN/architecture.png",
      },
      {
        title: "التصميم الداخلي",
        image: "https://i.ibb.co/Gfcksvnj/interior.png",
      },
      {
        title: "التخطيط التنموي",
        image:
          "https://img.freepik.com/premium-photo/back-view-architects-engineers-helmet-construction-site-generative-ai_81262-3132.jpg", // URL example
      },

      {
        title: "إدارة المشاريع",
        image: "https://i.ibb.co/XkjJMvHQ/project-management.png",
      },

      {
        title: "تنسيق الحدائق",
        image: "https://i.ibb.co/zWqLyY8p/landscape.png",
      },
      {
        title: "الإستثمار",
        image: "https://i.ibb.co/xqHS6kX0/real-estate.png",
      },

      {
        title: "الاستشارات الهندسية",
        image: "https://i.ibb.co/99QD96G8/eng-cons.jpg",
      },
    ],
  };
  const selectedservices = services[language] || services["eng"];
  const title = {
    eng: [{ head: "Our", colored: "Services" }],
    ar: [
      {
        head: "خدماتنا ",
        colored: "المميزة",
      },
    ],
  };
  const selectedtitle = title[language] || title["eng"];

  return (
    <section id="services-section" className="services-section">
      <Title>
        {" "}
        {selectedtitle[0].head}{" "}
        <GreenText>{selectedtitle[0].colored}</GreenText>{" "}
      </Title>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={3} // Start with middle slide
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="services-swiper"
      >
        {selectedservices.map((service, index) => (
          <SwiperSlide key={index}>
            <a
              href={selectedservices[index].link}
              className="slide-link"
              aria-label={`View ${service.title} details`}
            >
              <div
                className="slide-content"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="slide-overlay" />
                <h3>
                  {service.title}
                  <span className="explore-text">
                    {language === "ar" ? "← استكشف المزيد" : "Explore more →"}
                  </span>
                </h3>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
