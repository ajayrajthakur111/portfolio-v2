import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi";

const SectionContainer = styled.section`
  width: 100%;
  padding: 5rem 0;
  background: ${(props) => (props.theme === "dark" ? "#181818" : "#f9f9f9")};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#222222")};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${(props) => (props.theme === "dark" ? "#a0a0a0" : "#666666")};
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsContainer = styled.div`
  position: relative;
  padding: 2rem 0;
`;

const TestimonialsSlider = styled(motion.div)`
  display: flex;
  overflow-x: hidden;
  gap: 2rem;
  margin: 0 2rem;
  padding: 1rem 0;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${(props) =>
    props.theme === "dark" ? "#1e1e1e" : "#ffffff"};
  border-radius: 1rem;
  padding: 2rem;
  min-width: 350px;
  flex: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    min-width: 300px;
  }
`;

const QuoteIcon = styled.div`
  background-color: #3498db;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const TestimonialContent = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme === "dark" ? "#e0e0e0" : "#333333")};
  line-height: 1.7;
  flex-grow: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#222222")};
  margin: 0;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: ${(props) => (props.theme === "dark" ? "#a0a0a0" : "#666666")};
  margin: 0;
`;

const NavigationButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1e1e1e" : "#ffffff"};
  color: ${(props) =>
    props.disabled
      ? props.theme === "dark"
        ? "#555555"
        : "#cccccc"
      : props.theme === "dark"
      ? "#e0e0e0"
      : "#333333"};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover:not(:disabled) {
    background-color: #3498db;
    color: white;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;

const PageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const IndicatorDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) =>
    active ? "#3498db" : theme === "dark" ? "#444" : "#ccc"};
  cursor: pointer;
  transition: background 0.3s;
  outline: none;
  padding: 0;
  margin: 0;
`;

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "CEO",
    company: "Acme Corp",
    content: "Working with you was a fantastic experience. Highly recommended!",
    avatar: "",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "CTO",
    company: "Techify",
    content: "Delivered on time and exceeded expectations. Will hire again.",
    avatar: "",
  },
  {
    id: "3",
    name: "Carol Lee",
    role: "Product Manager",
    company: "InnovateX",
    content: "Professional, communicative, and skilled. Great results.",
    avatar: "",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Lead Designer",
    company: "DesignPro",
    content: "Creative solutions and attention to detail. Loved the work.",
    avatar: "",
  },
  {
    id: "5",
    name: "Eva Green",
    role: "Marketing Head",
    company: "MarketMakers",
    content: "Helped us grow our brand with amazing web solutions.",
    avatar: "",
  },
];

const getItemsPerPage = () => (window.innerWidth < 768 ? 1 : 3);

const Testimonials: React.FC = () => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonialsByPage = useMemo(() => {
    const pages: Testimonial[][] = [];
    for (let i = 0; i < testimonials.length; i += itemsPerPage) {
      pages.push(testimonials.slice(i, i + itemsPerPage));
    }
    return pages;
  }, [itemsPerPage]);

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < testimonialsByPage.length - 1)
      setCurrentPage(currentPage + 1);
  };

  const goToPage = (pageIndex: number) => setCurrentPage(pageIndex);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionContainer ref={ref} theme={theme}>
      <SectionContent>
        <SectionHeader>
          <SectionTitle theme={theme}>Client Testimonials</SectionTitle>
          <SectionSubtitle theme={theme}>
            Here's what some of my clients have to say about working with me.
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsContainer>
          <PrevButton
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            theme={theme}
            aria-label="Previous testimonials"
          >
            <FiChevronLeft />
          </PrevButton>

          <TestimonialsSlider
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {testimonialsByPage[currentPage]?.map((testimonial: Testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                theme={theme}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
              >
                <QuoteIcon>
                  <FiMessageSquare />
                </QuoteIcon>
                <TestimonialContent theme={theme}>
                  "{testimonial.content}"
                </TestimonialContent>
                <TestimonialAuthor>
                  <AuthorAvatar
                    src={
                      testimonial.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        testimonial.name
                      )}&size=50`
                    }
                    alt={testimonial.name}
                  />
                  <AuthorInfo>
                    <AuthorName theme={theme}>{testimonial.name}</AuthorName>
                    <AuthorTitle theme={theme}>
                      {testimonial.role} @ {testimonial.company}
                    </AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsSlider>

          <NextButton
            onClick={goToNextPage}
            disabled={currentPage === testimonialsByPage.length - 1}
            theme={theme}
            aria-label="Next testimonials"
          >
            <FiChevronRight />
          </NextButton>

          <PageIndicators>
            {testimonialsByPage.map((_, index) => (
              <IndicatorDot
                key={index}
                active={index === currentPage}
                onClick={() => goToPage(index)}
                theme={theme}
                aria-label={`Go to testimonials page ${index + 1}`}
              />
            ))}
          </PageIndicators>
        </TestimonialsContainer>
      </SectionContent>
    </SectionContainer>
  );
};

export default Testimonials;