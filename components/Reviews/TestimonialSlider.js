"use client"
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { GreenText, Title } from "../Whoweare/TextContent";
import { useLanguage } from "../../Context/Languagecontext";
import "./TestimonialSlider.css";
const TestimonialSlider = () => {
  const { language } = useLanguage();
  const [swiperKey, setSwiperKey] = useState(0);

  const companies = {
    eng: [
      {
        logo: 1,
        text: "Project management - 275% Growth",
      },
      {
        logo: 2,
        text: "Team management - 195% Growth",
      },
      {
        logo: 3,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 4,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 5,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 6,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 7,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 8,
        text: "Secure storage - 235% Growth",
      },
      {
        logo:9,
        text: "Secure storage - 235% Growth",
      },
      {
        logo: 10,
        text: "Secure storage - 235% Growth",
      },
    ],
    ar: [
      {
        logo: 1,
        text: "إدارة المشاريع - نمو 275%",
      },
      {
        logo: 2,
        text: "إدارة الفريق - نمو 195%",
      },
      {
        logo: 3,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 4,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 5,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 6,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 7,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 8,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 9,
        text: "التخزين الآمن - نمو 235%",
      },
      {
        logo: 10,
        text: "التخزين الآمن - نمو 235%",
      },
    ],
  };
  // Updated testimonial data structure
  const testimonials = {
    eng: [
      {
        text: "Working with Khales was a masterclass in professionalism. Their landscaping transformed our Dubai villa into a lush, serene retreat. Every detail—from layout to plant selection—was perfectly executed. It's an outdoor space we now truly enjoy every day.",
        name: "James W. – British Expat, Dubai",
        service: "Landscaping",
      },
      {
        text: "Khales brought our vision to life with incredible precision. Their interior design team curated our Abu Dhabi home with refined elegance and functional comfort. From the furniture layout to the lighting, everything reflects thoughtful design.",
        name: "Emily R. – American Expat, Abu Dhabi",
        service: "Interior Design",
      },
      {
        text: "From the very first consultation, Khales impressed me with their professionalism and depth of architectural knowledge. Our Ras Al Khaimah retreat now stands as a statement of contemporary elegance and balance—exactly what we dreamed of.",
        name: "Ivan K. – Russian Expat, Ras Al Khaimah",
        service: "Architectural Design",
      },
      {
        text: "As an Emirati, I was looking for a firm that could manage every aspect of my home's development—from planning to final handover. Khales exceeded every expectation. Their team ensured smooth coordination, clear communication, and timely delivery. Truly a full-service experience.",
        name: "Ahmed Al Mansoori – Emirati Client, Al Ain",
        service: "Full Project Management",
      },
    ],
    ar: [
      {
        text: "العمل مع خالص كان مثالاً للاحترافية. لقد حوّل فريق تنسيق الحدائق فيلتنا في دبي إلى ملاذ هادئ ومورق. كل تفصيلة، من التخطيط إلى اختيار النباتات، تم تنفيذها بإتقان. إنها مساحة خارجية نتمتع بها كل يوم.",
        name: "جيمس و. – مقيم بريطاني، دبي",
        service: "تنسيق حدائق",
      },
      {
        text: "خالص حولوا رؤيتنا إلى واقع بدقة مذهلة. فريق التصميم الداخلي صمم منزلنا في أبوظبي بأناقة راقية وراحة وظيفية. من توزيع الأثاث إلى الإضاءة، كل شيء يعكس تفكيراً وتصميماً مدروساً.",
        name: "إيميلي ر. – مقيمة أمريكية، أبوظبي",
        service: "تصميم داخلي",
      },
      {
        text: "منذ أول استشارة، أبهرني خالص باحترافيتهم وعمق معرفتهم المعمارية. أصبح منزلنا في رأس الخيمة اليوم تحفة من الأناقة المعاصرة والتوازن، تمامًا كما حلمنا.",
        name: "إيفان ك. – مقيم روسي، رأس الخيمة",
        service: "تصميم معماري",
      },
      {
        text: "بصفتي إماراتيًا، كنت أبحث عن شركة تدير كل جانب من جوانب بناء منزلي، من التخطيط حتى التسليم. خالص تجاوزوا كل التوقعات. فريقهم ضمن التنسيق السلس، التواصل الواضح، والتسليم في الوقت المحدد. تجربة متكاملة بحق.",
        name: "أحمد المنصوري – عميل إماراتي، العين",
        service: "إدارة مشاريع متكاملة",
      },
    ],
  };

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);
  }, [language]);

  return (
    <section className="creative-testimonial--slider">
      <div
        className="testimonial-inner"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/greenappletravel-ae/image/upload/v1730893099/greenapple/header/Untitled_design_69_k9jhxg.png)",
        }}
      >
        <div className="testimonial-row">
          <div
            className="testimonial-heading"
            style={{ marginTop: "40px", marginBottom: "60px" }}
          >
            <Title>
              {language === "ar" ? (
                <>
                  عملاؤنا <GreenText>وشركاؤنا</GreenText>
                </>
              ) : (
                <>
                  Clients <GreenText> & Partners</GreenText>
                </>
              )}
            </Title>
          </div>

          <div className="testimonial-wrap">
            <Swiper
              key={swiperKey}
              modules={[Autoplay]}
              spaceBetween={50}
              speed={3000}
              slidesPerView={1}
              loop
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              keyboard={{ enabled: true, onlyInViewport: true }}
              effect="slide"
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {testimonials[language].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide--inner">
                    <div className="testimonial-detail">
                      <p> &quot;{testimonial.text}&quot;</p>
                      <div className="testimonial-meta">
                        <span className="testimonial-name">
                          {testimonial.name}
                        </span>
                        <span className="testimonial-service">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="company-details--row">
          <Swiper
            key={swiperKey}
            modules={[Autoplay]}
            spaceBetween={30}
            speed={3000}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              reverseDirection: true, // Reverse the autoplay direction
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {companies[language].map((company, index) => (
              <SwiperSlide key={index}>
                <div className="company-box">
                  <div className="company-box-inner">
                    <div className="company-box-top">
                      <img
                        src={`./assets/Partners/${company.logo}.png`}
                        alt="Company Logo"
                        style={{
                          width: "50%",
                          height: "50%",
                          objectFit: "fill",
                        }}
                      />
                    </div>
                    <div className="company-box-bottom">
                      <span>{company.text}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
