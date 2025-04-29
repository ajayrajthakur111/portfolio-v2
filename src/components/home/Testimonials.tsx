// src/components/home/Testimonials.tsx
import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight, FiMessageSquare } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

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

const SectionContainer = styled.section<{ theme: 'light' | 'dark' }>`
  padding: 5rem 2rem;
  background: ${({ theme }) => (theme === 'dark' ? '#181818' : '#f9f9f9')};
  transition: background 0.3s ease;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2<{ theme: 'light' | 'dark' }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#222222')};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const SectionSubtitle = styled.p<{ theme: 'light' | 'dark' }>`
  font-size: 1.1rem;
  color: ${({ theme }) => (theme === 'dark' ? '#a0a0a0' : '#666666')};
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

const TestimonialCard = styled(motion.div)<{ theme: 'light' | 'dark' }>`
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'rgba(30,30,30,0.75)' : 'rgba(255,255,255,0.8)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#2e2e2e' : '#eaeaea')};
  border-radius: 1rem;
  padding: 2rem;
  min-width: 350px;
  flex: 1;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

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
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`;

const TestimonialContent = styled.p<{ theme: 'light' | 'dark' }>`
  font-size: 1.1rem;
  font-style: italic;
  color: ${({ theme }) => (theme === 'dark' ? '#e0e0e0' : '#333333')};
  line-height: 1.8;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: "“";
    position: absolute;
    left: 0;
    top: -0.4rem;
    font-size: 2rem;
    color: #3498db;
  }
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

const AuthorName = styled.h4<{ theme: 'light' | 'dark' }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#222222')};
  margin: 0;
`;

const AuthorTitle = styled.p<{ theme: 'light' | 'dark' }>`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme === 'dark' ? '#a0a0a0' : '#666666')};
  margin: 0;
`;

const NavigationButton = styled.button<{ disabled?: boolean; theme: 'light' | 'dark' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => (theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${({ disabled, theme }) =>
    disabled
      ? theme === 'dark'
        ? '#555555'
        : '#cccccc'
      : theme === 'dark'
      ? '#e0e0e0'
      : '#333333'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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

const IndicatorDot = styled.button<{ $active: boolean; theme: 'light' | 'dark' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) =>
    $active ? '#3498db' : theme === 'dark' ? '#333333' : '#dddddd'};
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  outline: none;
  padding: 0;
  margin: 0;

  &:hover {
    background-color: #3498db;
  }
`;

const getItemsPerPage = () => (window.innerWidth < 768 ? 1 : 3);

const Testimonials: React.FC = () => {
  const { theme } = useTheme(); // 'light' | 'dark'
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonialsByPage = useMemo(() => {
    const pages: Testimonial[][] = [];
    for (let i = 0; i < testimonials.length; i += itemsPerPage) {
      pages.push(testimonials.slice(i, i + itemsPerPage));
    }
    return pages;
  }, [itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optional: Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) =>
        prev < testimonialsByPage.length - 1 ? prev + 1 : 0
      );
    }, 8000); // Change every 8s

    return () => clearInterval(interval);
  }, [testimonialsByPage.length]);

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < testimonialsByPage.length - 1)
      setCurrentPage(currentPage + 1);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionContainer theme={theme} ref={ref}>
      <SectionContent>
        <SectionHeader>
          <SectionTitle theme={theme}>Client Testimonials</SectionTitle>
          <SectionSubtitle theme={theme}>
            Here’s what some of my clients have to say about working with me.
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsContainer>
          <PrevButton onClick={goToPrevPage} disabled={currentPage === 0} theme={theme}>
            <FiChevronLeft />
          </PrevButton>

          <TestimonialsSlider
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {testimonialsByPage[currentPage]?.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                theme={theme}
                variants={slideVariants}
              >
                <QuoteIcon>
                  <FiMessageSquare />
                </QuoteIcon>
                <TestimonialContent theme={theme}>
                  {testimonial.content}
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
          >
            <FiChevronRight />
          </NextButton>

          <PageIndicators>
            {testimonialsByPage.map((_, index) => (
              <IndicatorDot
                key={index}
                $active={index === currentPage}
                theme={theme}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </PageIndicators>
        </TestimonialsContainer>
      </SectionContent>
    </SectionContainer>
  );
};

export default Testimonials;
