/* ============================================
   featuresData — "Why choose us" points
   --------------------------------------------
   Flat array of the five reasons to choose Nilachal Infracon /
   North East Buildmart. Shape: { id, icon, title, description }.
   Consumed by the Why-Choose-Us section (prompt 09).
   ============================================ */

export const featuresData = [
  {
    id: 'genuine-products',
    icon: 'mdi:check-decagram-outline',
    title: 'Genuine Products',
    description: '100% authentic and original — only branded, warranty-backed products.',
  },
  {
    id: 'competitive-pricing',
    icon: 'mdi:tag-outline',
    title: 'Competitive Pricing',
    description: 'Best prices for best quality, with transparent, honest quotations.',
  },
  {
    id: 'fast-safe-delivery',
    icon: 'mdi:truck-fast-outline',
    title: 'Fast & Safe Delivery',
    description: 'Timely, secure delivery across Northeast India, right to your site.',
  },
  {
    id: 'expert-support',
    icon: 'mdi:account-hard-hat-outline',
    title: 'Expert Support',
    description: 'Professional guidance at every step, from selection to installation.',
  },
  {
    id: 'strong-network',
    icon: 'mdi:handshake-outline',
    title: 'Strong Network',
    description: 'A wide, dependable supply network reaching customers across the region.',
  },
];

// TODO remove in prompt 09 — temporary mirror of the old 3-category-tab
// shape so the legacy FeaturesSection keeps building until it is rebuilt.
export const featuresCategories = [
  {
    id: 1,
    category: 'Why Choose Us',
    items: [
      {
        icon: 'mdi:check-decagram-outline',
        title: 'Genuine Products',
        description: '100% authentic and original — only branded, warranty-backed products.',
      },
      {
        icon: 'mdi:tag-outline',
        title: 'Competitive Pricing',
        description: 'Best prices for best quality, with transparent, honest quotations.',
      },
      {
        icon: 'mdi:truck-fast-outline',
        title: 'Fast & Safe Delivery',
        description: 'Timely, secure delivery across Northeast India, right to your site.',
      },
    ],
  },
  {
    id: 2,
    category: 'Support & Service',
    items: [
      {
        icon: 'mdi:account-hard-hat-outline',
        title: 'Expert Support',
        description: 'Professional guidance at every step, from selection to installation.',
      },
      {
        icon: 'mdi:handshake-outline',
        title: 'Strong Network',
        description: 'A wide, dependable supply network reaching customers across the region.',
      },
    ],
  },
];

export default featuresData;
