// SKU → Image mapping
// Images are in /public/koverx_porduct_img/
// Usage: getImageBySku("TEST-CYP-200MG") => "/koverx_porduct_img/Injectable TRT.png"

const skuImageMap = {
  // ─── Injectable TRT ───────────────────────────────────────────
  "TEST-CYP-200MG": "Injectable TRT.png",

  // ─── Oral TRT / Enclomiphene ──────────────────────────────────
  "CRM-ENCO-TESTOS-ORAL-3M": "Oral TRT.png",

  // ─── Sermorelin ───────────────────────────────────────────────
  "SERM-30-1B": "Sermorelin.png",
  "SERM-30-3B": "Sermorelin.png",
  "SERM-6M": "Sermorelin.png",
  "SERM-12M": "Sermorelin.png",

  // ─── Metformin ────────────────────────────────────────────────
  "CRM-ANTIAGE-METFORM-3M": "Metformin.png",
  "METFORM-1M": "Metformin.png",
  "METFORM-6M": "Metformin.png",
  "METFORM-12M": "Metformin.png",

  // ─── Sirolimus / Rapamycin ────────────────────────────────────
  "CRM-RAPA-3M": "Metformin.png",
  "RAPA-1M": "Metformin.png",
  "RAPA-6M": "Metformin.png",
  "RAPA-12M": "Metformin.png",

  // ─── B12 ──────────────────────────────────────────────────────
  "CRM-B12-INJ-70D": "NAD+ Injectable.png",
  "B12-1M": "NAD+ Injectable.png",
  "B12-3M": "NAD+ Injectable.png",
  "B12-6M": "NAD+ Injectable.png",
  "B12-12M": "NAD+ Injectable.png",

  // ─── NAD+ Injectable ──────────────────────────────────────────
  "CRM-NAD-INJ-1M": "NAD+ Injectable.png",
  "NADINJ-3M": "NAD+ Injectable.png",
  "NADINJ-6M": "NAD+ Injectable.png",
  "NADINJ-12M": "NAD+ Injectable.png",

  // ─── NAD Nasal ────────────────────────────────────────────────
  "CRM-NAD-NASAL-1M": "NAD+ Injectable.png",
  "NADNASAL-3M": "NAD+ Injectable.png",
  "NADNASAL-6M": "NAD+ Injectable.png",
  "NADNASAL-12M": "NAD+ Injectable.png",

  // ─── PT-141 ───────────────────────────────────────────────────
  "CRM-PT141-INJ-1M": "PT-141.png",
  "PT141-1M": "PT-141.png",
  "PT141-3M": "PT-141.png",
  "PT141-6M": "PT-141.png",
  "PT141-12M": "PT-141.png",

  // ─── LDN (Low Dose Naltrexone) ────────────────────────────────
  "LDN-3MG-1M": "Metformin.png",
  "LDN-1M": "Metformin.png",
  "LDN-3M": "Metformin.png",
  "LDN-6M": "Metformin.png",
  "LDN-12M": "Metformin.png",

  // ─── Glutathione ──────────────────────────────────────────────
  "CRM-GLUTATH-1M": "Glutathione.png",
  "GLUTA-3M": "Glutathione.png",
  "GLUTA-6M": "Glutathione.png",
  "GLUTA-12M": "Glutathione.png",

  // ─── Birth Control / Plan B ───────────────────────────────────
  "LNG-1M": "Birth Control.png",

  // ─── HIV / Truvada ────────────────────────────────────────────
  "Truvadax90": "Metformin.png",
  "Truvadax-Basic": "Metformin.png",
  "Truvadax-Advance": "Metformin.png",

  // ─── Skincare / Tretinoin etc. ────────────────────────────────
  "TRE-NIA-HYA-30B": "Skincare.png",
  "TRE-NIA-HYA-60B": "Skincare.png",
  "TRE-NIA-HYA-89B": "Skincare.png",
  "HYD-VIT-NIA": "Skincare.png",
  "HYD-TRE-VIT-NIA": "Skincare.png",
  "HYD-TRE-NIA-HYD": "Skincare.png",

  // ─── Herpes / Valacyclovir ────────────────────────────────────
  "Valacyclovir1gx90": "HPV.png",
  "Valacyclovir500mg": "HPV.png",
  "Valacyclovir500mgx90": "HPV.png",
  "VALA-1G-24": "Cold Sores.png",

  // ─── Sexual Arousal ───────────────────────────────────────────
  "AROUSAL-CREAM": "Premature Ejaculation.png",
  "OXY-NSL-100IU": "Premature Ejaculation.png",

  // ─── Erectile Dysfunction / Sildenafil ────────────────────────
  "SILD-100MG-10-10-1B": "Erectile Dysfunction.png",
  "SILD-100MG-12-12-1B": "Erectile Dysfunction.png",
  "SILD-100MG-120-10-12B": "Erectile Dysfunction.png",
  "SILD-100MG-14-14-1B": "Erectile Dysfunction.png",
  "SILD-100MG-144-12-12B": "Erectile Dysfunction.png",
  "SILD-100MG-168-14-12B": "Erectile Dysfunction.png",
  "SILD-100MG-18-6-3B": "Erectile Dysfunction.png",
  "SILD-100MG-24-8-3B": "Erectile Dysfunction.png",
  "SILD-100MG-30-10-3B": "Erectile Dysfunction.png",
  "SILD-100MG-36-12-3B": "Erectile Dysfunction.png",
  "SILD-100MG-36-6-6B": "Erectile Dysfunction.png",
  "SILD-100MG-42-14-3B": "Erectile Dysfunction.png",
  "SILD-100MG-48-8-6B": "Erectile Dysfunction.png",
  "SILD-100MG-6-6-1B": "Erectile Dysfunction.png",
  "SILD-100MG-60-10-6B": "Erectile Dysfunction.png",
  "SILD-100MG-72-12-6B": "Erectile Dysfunction.png",
  "SILD-100MG-72-6-12B": "Erectile Dysfunction.png",
  "SILD-100MG-8-8-1B": "Erectile Dysfunction.png",
  "SILD-100MG-84-14-6B": "Erectile Dysfunction.png",
  "SILD-100MG-96-8-12B": "Erectile Dysfunction.png",
  "SILD-50MG-10-10-1B": "Erectile Dysfunction.png",
  "SILD-50MG-12-12-1B": "Erectile Dysfunction.png",
  "SILD-50MG-120-10-12B": "Erectile Dysfunction.png",
  "SILD-50MG-14-14-1B": "Erectile Dysfunction.png",
  "SILD-50MG-144-12-12B": "Erectile Dysfunction.png",
  "SILD-50MG-168-14-12B": "Erectile Dysfunction.png",
  "SILD-50MG-18-6-3B": "Erectile Dysfunction.png",
  "SILD-50MG-24-8-3B": "Erectile Dysfunction.png",
  "SILD-50MG-30-10-3B": "Erectile Dysfunction.png",
  "SILD-50MG-36-12-3B": "Erectile Dysfunction.png",
  "SILD-50MG-36-6-6B": "Erectile Dysfunction.png",
  "SILD-50MG-42-14-3B": "Erectile Dysfunction.png",
  "SILD-50MG-48-8-6B": "Erectile Dysfunction.png",
  "SILD-50MG-6-6-1B": "Erectile Dysfunction.png",
  "SILD-50MG-60-10-6B": "Erectile Dysfunction.png",
  "SILD-50MG-72-12-6B": "Erectile Dysfunction.png",
  "SILD-50MG-72-6-12B": "Erectile Dysfunction.png",
  "SILD-50MG-8-8-1B": "Erectile Dysfunction.png",
  "SILD-50MG-84-14-6B": "Erectile Dysfunction.png",
  "SILD-50MG-96-8-12B": "Erectile Dysfunction.png",

  // ─── Erectile Dysfunction / Tadalafil ─────────────────────────
  "TADA-10MG-10-10-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-12-12-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-120-10-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-14-14-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-144-12-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-168-14-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-18-6-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-24-8-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-30-10-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-36-12-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-36-6-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-42-14-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-48-8-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-6-6-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-60-10-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-72-12-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-72-6-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-8-8-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-84-14-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-10MG-96-8-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-10-10-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-12-12-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-120-10-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-14-14-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-144-12-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-168-14-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-18-6-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-24-8-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-30-10-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-36-12-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-36-6-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-42-14-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-48-8-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-6-6-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-60-10-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-72-12-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-72-6-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-8-8-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-84-14-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-20MG-96-8-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-2.5MG-180-30-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-2.5MG-30-30-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-2.5MG-360-30-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-2.5MG-90-30-3B": "Tadalafil-BGD8XJcE.png",
  "TADA-5MG-180-30-6B": "Tadalafil-BGD8XJcE.png",
  "TADA-5MG-30-30-1B": "Tadalafil-BGD8XJcE.png",
  "TADA-5MG-360-30-12B": "Tadalafil-BGD8XJcE.png",
  "TADA-5MG-90-30-3B": "Tadalafil-BGD8XJcE.png",

  // ─── Semaglutide (Weight Loss) ────────────────────────────────
  "Semaginj-CR1": "Semaglutide.png",
  "SEMA-0.5MG-30-D": "Semaglutide.png",
  "SEMA-1MG-30-1B": "Semaglutide.png",
  "SEMA-1.5MG-30-1B": "Semaglutide.png",
  "SEMA-2MG-30-1B": "Semaglutide.png",
  "SEMA-2.5MG-30-1B": "Semaglutide.png",
  "SG-MAINT-S3-A-V1": "Semaglutide.png",
  "SG-MAINT-S4-A": "Semaglutide.png",
  "SG-MAINT-S5-A": "Semaglutide.png",
  "SG-MAINT-S6-A": "Semaglutide.png",
  "SG-STARTER-3M-A": "Semaglutide.png",
  "SG-3MT-S2-A": "Semaglutide.png",
  "SG-3MT-S3-A": "Semaglutide.png",
  "SG-3MT-S4-A": "Semaglutide.png",
  "SG-3MT-S5-A": "Semaglutide.png",
  "Semaginj-CR1-6M": "Semaglutide.png",
  "SEMA-0.5MG-30-D-6M": "Semaglutide.png",
  "SEMA-1MG-30-6B": "Semaglutide.png",
  "SEMA-1.5MG-30-6B": "Semaglutide.png",
  "SEMA-2MG-30-6B": "Semaglutide.png",
  "SEMA-2.5MG-30-6B": "Semaglutide.png",
  "Semaginj-CR1-12M": "Semaglutide.png",
  "SEMA-0.5MG-30-D-12M": "Semaglutide.png",
  "SEMA-1MG-30-12B": "Semaglutide.png",
  "SEMA-1.5MG-30-12B": "Semaglutide.png",
  "SEMA-2MG-30-12B": "Semaglutide.png",
  "SEMA-2.5MG-30-12B": "Semaglutide.png",

  // ─── Tirzepatide (Weight Loss) ────────────────────────────────
  "TIRZ-CR1-V1": "Tirzepatide.png",
  "TIRZ-5MG-30-1B": "Tirzepatide.png",
  "TIRZ-7.5MG-30-1B": "Tirzepatide.png",
  "TIRZ-10MG-30-1B": "Tirzepatide.png",
  "TIRZ-12.5MG-30-1B": "Tirzepatide.png",
  "TIRZ-15MG-30-1B": "Tirzepatide.png",
  "TIRZ-2.5MG-30-6B-V1": "Tirzepatide.png",
  "TIRZ-CR1-6M": "Tirzepatide.png",
  "TIRZ-5MG-30-6B": "Tirzepatide.png",
  "TIRZ-7.5MG-30-6B": "Tirzepatide.png",
  "TIRZ-10MG-30-6B": "Tirzepatide.png",
  "TIRZ-12.5MG-30-6B": "Tirzepatide.png",
  "TIRZ-2.5MG-30-12B-V1": "Tirzepatide.png",
  "TIRZ-CR1-12M": "Tirzepatide.png",
  "TIRZ-5MG-30-12B": "Tirzepatide.png",
  "TIRZ-7.5MG-30-12B": "Tirzepatide.png",
  "TIRZ-10MG-30-12B": "Tirzepatide.png",
  "TIRZ-12.5MG-30-12B": "Tirzepatide.png",

  // ─── Extra / alternate SKUs ───────────────────────────────────
  "TIRZ-CR1": "Tirzepatide.png",

  // ─── Smoking Cessation ────────────────────────────────────────
  "BupropionSR150mg": "Smoking Cessation.png",
  "BupropionSR300mg": "Smoking Cessation.png",

  // ─── Acid Reflux ─────────────────────────────────────────────
  "Omeprazole40mg": "Acid Reflux.png",
  "Omeprazole20mg": "Acid Reflux.png",

  // ─── Birth Control ───────────────────────────────────────────
  "GenericOrthoCyclen": "Birth Control.png",
  "Generic Ortho Cyclen": "Birth Control.png",
  "Generic-Ortho-Cyclen": "Birth Control.png",
  "GENERIC-ORTHO-CYCLEN": "Birth Control.png",
  "NSEE": "Birth Control.png",
  "NSEEye": "Birth Control.png",

  // ─── Men's Hair Loss ─────────────────────────────────────────
  "FINA-1MG-90-30-3B": "Men's Hair Loss.png",
  "MIN-1MG-FINA-1.25MG": "Men's Hair Loss.png",
  "FINA-10-MINO-6": "Men's Hair Loss.png",

  // ─── Women's Hair Loss ───────────────────────────────────────
  "MIN-1MG-SPI-60MG": "Women's Hair Loss.png",

  // ─── Eyelash Treatment ───────────────────────────────────────
  "BIMA-5ML-90-30-3B": "Eyelash Treatment.png",

  // ─── Premature Ejaculation ───────────────────────────────────
  "SERT-25MG-90-30-3B": "Premature Ejaculation.png",
};

/**
 * Prefix-based rules: if exact match fails, check SKU prefix.
 * Add more entries here to handle any new SKU patterns.
 */
const skuPrefixMap = [
  { prefix: "TIRZ", img: "Tirzepatide.png" },
  { prefix: "TZ-", img: "Tirzepatide.png" },
  { prefix: "SEMA", img: "Semaglutide.png" },
  { prefix: "Semaginj", img: "Semaglutide.png" },
  { prefix: "SG-", img: "Semaglutide.png" },
  { prefix: "SERM", img: "Sermorelin.png" },
  { prefix: "TEST-CYP", img: "Injectable TRT.png" },
  { prefix: "CRM-ENCO", img: "Oral TRT.png" },
  { prefix: "METFORM", img: "Metformin.png" },
  { prefix: "CRM-ANTIAGE-METFORM", img: "Metformin.png" },
  { prefix: "RAPA", img: "Metformin.png" },
  { prefix: "CRM-RAPA", img: "Metformin.png" },
  { prefix: "LDN", img: "Metformin.png" },
  { prefix: "GLUTA", img: "Glutathione.png" },
  { prefix: "CRM-GLUTATH", img: "Glutathione.png" },
  { prefix: "PT141", img: "PT-141.png" },
  { prefix: "CRM-PT141", img: "PT-141.png" },
  { prefix: "NADINJ", img: "NAD+ Injectable.png" },
  { prefix: "NADNASAL", img: "NAD+ Injectable.png" },
  { prefix: "CRM-NAD", img: "NAD+ Injectable.png" },
  { prefix: "B12", img: "NAD+ Injectable.png" },
  { prefix: "CRM-B12", img: "NAD+ Injectable.png" },
  { prefix: "SILD", img: "Erectile Dysfunction.png" },
  { prefix: "TADA", img: "Tadalafil-BGD8XJcE.png" },
  { prefix: "TRE-", img: "Skincare.png" },
  { prefix: "HYD-", img: "Skincare.png" },
  { prefix: "Valacyclovir", img: "Herpes.png" },
  { prefix: "VALA", img: "Cold Sores.png" },
  { prefix: "LNG", img: "Birth Control.png" },
  { prefix: "AROUSAL", img: "Premature Ejaculation.png" },
  { prefix: "OXY", img: "Premature Ejaculation.png" },
  { prefix: "Truvada", img: "Metformin.png" },
  { prefix: "Bupropion", img: "Smoking Cessation.png" },
  { prefix: "BUPRO", img: "Smoking Cessation.png" },
  { prefix: "Omeprazole", img: "Acid Reflux.png" },
  { prefix: "OMEP", img: "Acid Reflux.png" },
  { prefix: "Generic", img: "Birth Control.png" },
  { prefix: "GENERIC", img: "Birth Control.png" },
  { prefix: "FINA", img: "Men's Hair Loss.png" },
  { prefix: "SERT", img: "Premature Ejaculation.png" },
];

/**
 * Returns the full public path to the product image based on SKU.
 * First tries exact match, then prefix match, then returns null.
 * @param {string} sku
 * @returns {string|null}
 */
export const getImageBySku = (sku) => {
  if (!sku) return null;
  const s = sku.trim();

  // 1. Exact match
  const exactImg = skuImageMap[s];
  if (exactImg) return `/koverx_porduct_img/${exactImg}`;

  // 2. Prefix-based fallback
  const prefixEntry = skuPrefixMap.find(({ prefix }) =>
    s.toUpperCase().startsWith(prefix.toUpperCase())
  );
  if (prefixEntry) return `/koverx_porduct_img/${prefixEntry.img}`;

  return null;
};

export default skuImageMap;
