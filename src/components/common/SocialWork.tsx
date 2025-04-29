// src/components/SocialWork.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/hooks/useTheme";
import cowDark from "../../assets/cow-dark.png";

// Theme Constants
const accentColor = "#3498db";
const accentColorHover = "#2980b9";
const backgroundDark = "#0f0f0f";
const backgroundLight = "#f6f9fc";
const cardBackgroundDark = "#1e1e1e";
const cardBackgroundLight = "#ffffff";
const textDark = "#ffffff";
const textLight = "#222222";
const textSecondaryDark = "#a0a0a0";
const textSecondaryLight = "#666666";

// Declare global types
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Styled Components
const SectionContainer = styled.section<{ theme: "light" | "dark" }>`
  padding: 4rem 2rem;
  background-color: ${({ theme }) =>
    theme === "dark" ? backgroundDark : backgroundLight};
  transition: background-color 0.4s ease;
`;

const SectionContent = styled.div`
  /* max-width: 1000px; */
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2<{ theme: "light" | "dark" }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => (theme === "dark" ? textDark : textLight)};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${accentColor};
    border-radius: 2px;
  }
`;

const SectionDescription = styled.p<{ theme: "light" | "dark" }>`
  font-size: 1.1rem;
  color: ${({ theme }) =>
    theme === "dark" ? textSecondaryDark : textSecondaryLight};
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  margin: 2rem 0;
  border-radius: 0 12px 12px 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const CowImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DonateButton = styled(motion.button)<{ theme: "light" | "dark" }>`
  padding: 0.9rem 2.5rem;
  background: linear-gradient(135deg, ${accentColor}, ${accentColorHover});
  color: #ffffff;
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`;

// Donation Form Styles
const FormContainer = styled.div<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "dark" ? cardBackgroundDark : cardBackgroundLight};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2rem auto;
`;

const FormTitle = styled.h3<{ theme: "light" | "dark" }>`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => (theme === "dark" ? textDark : textLight)};
  text-align: center;
`;

const AmountOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AmountOption = styled.button<{
  selected: boolean;
  theme: "light" | "dark";
}>`
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ selected }) =>
    selected
      ? `linear-gradient(135deg, ${accentColor}, ${accentColorHover})`
      : "transparent"};
  color: ${({ selected, theme }) =>
    selected
      ? "#fff"
      : theme === "dark"
      ? textSecondaryDark
      : textSecondaryLight};
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? accentColor : theme === "dark" ? "#333" : "#ccc"};

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ selected, theme }) =>
      selected ? accentColorHover : theme === "dark" ? "#2a2a2a" : "#f0f0f0"};
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const CustomAmountInput = styled.input<{ theme: "light" | "dark" }>`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#2a2a2a" : "#f7f9fc"};
  color: ${({ theme }) => (theme === "dark" ? textDark : textLight)};
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#e1e5ee")};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
    border-color: ${accentColor};
  }

  &::placeholder {
    color: ${({ theme }) => (theme === "dark" ? "#666" : "#aaa")};
  }
`;

const CurrencySymbol = styled.span<{ theme: "light" | "dark" }>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: ${({ theme }) =>
    theme === "dark" ? textSecondaryDark : textSecondaryLight};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const BackButton = styled.button<{ theme: "light" | "dark" }>`
  flex: 1;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#e0e0e0")};
  color: ${({ theme }) =>
    theme === "dark" ? textSecondaryDark : textSecondaryLight};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === "dark" ? "#444" : "#d0d0d0")};
  }
`;

const PayButton = styled.button<{
  disabled: boolean;
  theme: "light" | "dark";
}>`
  flex: 2;
  padding: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  background: ${({ disabled }) =>
    disabled
      ? "#ccc"
      : `linear-gradient(135deg, ${accentColor}, ${accentColorHover})`};
  color: #fff;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  transition: all 0.3s ease;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "0 5px 15px rgba(52, 152, 219, 0.3)"};

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "0 8px 20px rgba(52, 152, 219, 0.4)"};
  }
`;

// Main Component
export const SocialWork: React.FC = () => {
  const { theme } = useTheme();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handlePresetSelection = (amount: string) => {
    setSelectedPreset(amount);
    setCustomAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleDonate = () => {
    if (!customAmount) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: parseInt(customAmount) * 100, 
      currency: "INR",
      name: "Cow Shelter",
      description: "Donation for Cow Shelter",
      handler: function (response: any) {
        alert(
          `Thank you for your generous donation! Payment ID: ${response.razorpay_payment_id}`
        );
        setShowDonationForm(false);
        setCustomAmount("");
        setSelectedPreset(null);
      },
      prefill: {},
      theme: {
        color: accentColor,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (!showDonationForm) {
    return (
      <SectionContainer theme={theme} id="social-work" ref={ref}>
        <SectionContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <SectionHeader>
              <motion.div variants={itemVariants}>
                <SectionTitle theme={theme}>
                  🐄 My Social Work – Cow Shelter
                </SectionTitle>
                <SectionDescription theme={theme}>
                  We started a shelter to rescue and treat cows and other
                  animals injured in accidents or abandoned. Every donation
                  helps provide food, shelter, and medical care for these gentle
                  animals.
                </SectionDescription>
                <motion.div
                  variants={itemVariants}
                  style={{ textAlign: "center" }}
                >
                  <DonateButton
                    theme={theme}
                    onClick={() => setShowDonationForm(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Donate Now
                  </DonateButton>
                </motion.div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <ImageContainer>
                  <CowImage
                    src={cowDark}
                    alt="Cow Shelter"
                    loading="lazy"
                    style={{
                      maxWidth: "600px",
                      height: "auto",
                      aspectRatio: "2/1",
                      alignSelf: "center",
                    }}
                  />
                </ImageContainer>
              </motion.div>
            </SectionHeader>
          </motion.div>
        </SectionContent>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer theme={theme} id="social-work">
      <SectionContent>
        <FormContainer theme={theme}>
          <FormTitle theme={theme}>Make a Donation</FormTitle>

          <AmountOptionsGrid>
            {["1", "10", "50", "100", "500", "1000"].map((amount) => (
              <AmountOption
                key={amount}
                selected={selectedPreset === amount}
                theme={theme}
                onClick={() => handlePresetSelection(amount)}
              >
                ₹{amount}
              </AmountOption>
            ))}
          </AmountOptionsGrid>

          <InputContainer>
            <CurrencySymbol theme={theme}>₹</CurrencySymbol>
            <CustomAmountInput
              type="number"
              theme={theme}
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Enter custom amount"
              min="1"
            />
          </InputContainer>

          <ButtonGroup>
            <BackButton
              theme={theme}
              onClick={() => setShowDonationForm(false)}
            >
              Back
            </BackButton>
            <PayButton
              theme={theme}
              disabled={!customAmount}
              onClick={handleDonate}
            >
              Proceed to Pay
            </PayButton>
          </ButtonGroup>
        </FormContainer>
      </SectionContent>
    </SectionContainer>
  );
};

export default SocialWork;
