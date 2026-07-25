/* ============================================
   AboutSection Component
   CIT credibility band: accreditations, legacy & NE-2026 invite

   Animation: GSAP + ScrollTrigger via the shared `useReveal`
   hook (src/animations) — the mandatory reveal pattern for all
   public page sections. Framer Motion is kept only for the
   image hover micro-interaction.
   ============================================ */

import { motion } from "framer-motion";
import { Container, Typography, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useModal } from "../../../context/ModalContext";
import { useReveal } from "../../../animations";
import styles from "./AboutSection.module.css";

const campusImage = {
  src: "https://res.cloudinary.com/dn9gyaiik/image/upload/v1779669894/CIT-Campus_nndyrh.png",
  alt: "CIT Tumakuru campus",
};

const credibilityPoints = [
  {
    icon: "mdi:certificate-outline",
    title: "NAAC · AICTE · VTU · ISO",
    description:
      "Accredited, approved & affiliated — degrees recognised nationwide.",
  },
  {
    icon: "mdi:medal-outline",
    title: "25 Years of Legacy",
    description:
      "Established engineering institute with consistent VTU rank holders.",
  },
  {
    icon: "mdi:briefcase-check-outline",
    title: "85%+ Placement Record",
    description:
      "90+ recruiters every year — Infosys, Accenture, TCS, Deloitte, Bosch.",
  },
  {
    icon: "mdi:lightbulb-on-outline",
    title: "Innovation-First Campus",
    description:
      "Bharat 6G, Drone & BCI R&D labs · 4★ IIC rating · 21 patents filed.",
  },
];

const AboutSection = () => {
  const { openLeadDrawer } = useModal();

  // GSAP scroll-reveal — fades the content up once as it enters the viewport.
  // Refreshes ScrollTrigger internally so lazy-mounted sections measure right,
  // and no-ops (instant final state) under prefers-reduced-motion.
  const revealRef = useReveal();

  return (
    <section className={styles.overviewSection} id="about">
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />

      <Container maxWidth="xl">
        <div ref={revealRef} className={styles.mainWrapper}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>ABOUT CIT</span>
            <Typography
              variant="h2"
              className={styles.sectionTitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
                color: "#16324F",
                letterSpacing: "-0.01em",
              }}
            >
              25 Years of Engineering Excellence in Karnataka
            </Typography>
            <Typography
              variant="h3"
              className={styles.sectionSubtitle}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem" },
                color: "#4b5563",
                marginTop: "0.5rem",
              }}
            >
              Now welcoming North East students for the 2026 B.E. intake
            </Typography>
          </div>

          {/* Content Grid (Text + Campus Image) */}
          <div className={styles.contentGrid}>
            <div className={styles.textColumn}>
              <Typography className={styles.contentParagraph}>
                <strong>Channabasaveshwara Institute of Technology (CIT)</strong>{" "}
                is a NAAC-accredited, AICTE-approved and VTU-affiliated
                engineering institute in <strong>Tumakuru, Karnataka</strong> —
                recognised nationally with the IIRF "Best Brand" 2025 award for
                academic performance.
              </Typography>
              <Typography className={styles.contentParagraph}>
                Known for strong placements, VTU rank holders and rural-inclusive
                engineering education, CIT is now welcoming students from North
                East India for{" "}
                <strong>direct B.E. admission in the 2026 intake</strong>.
              </Typography>
              <Button
                variant="contained"
                onClick={() => openLeadDrawer("apply-now")}
                className={styles.ctaButton}
                endIcon={<Icon icon="mdi:arrow-right" />}
                sx={{
                  background:
                    "linear-gradient(135deg, #1E7B45 0%, #176437 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: { xs: "0.9375rem", md: "1rem" },
                  padding: { xs: "12px 28px", md: "14px 36px" },
                  borderRadius: "50px",
                  textTransform: "none",
                  boxShadow: "0 8px 30px rgba(30, 123, 69, 0.3)",
                  marginTop: "1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2E9A5C 0%, #1E7B45 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 14px 40px rgba(30, 123, 69, 0.45)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Apply for 2026 Admission
              </Button>
            </div>

            <div className={styles.imageColumn}>
              <motion.div
                className={styles.imageWrapper}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={campusImage.src}
                  alt={campusImage.alt}
                  className={styles.gridImage}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Credibility Points Row */}
          <div className={styles.differentiatorsRow}>
            <div className={styles.differentiatorsGrid}>
              {credibilityPoints.map((item, index) => (
                <div key={index} className={styles.differentiatorCard}>
                  <div className={styles.differentiatorIcon}>
                    <Icon icon={item.icon} />
                  </div>
                  <h4 className={styles.differentiatorTitle}>{item.title}</h4>
                  <p className={styles.differentiatorDesc}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
