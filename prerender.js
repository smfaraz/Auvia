import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define all key public routes and their specific SEO metadata
const routes = [
  {
    path: '',
    title: 'Auvia Behavior Centers | Autism Therapy & Expert ABA Services',
    description: 'Auvia Behavior Centers provides clinical excellence, play-based Autism Therapy, and Applied Behavior Analysis (ABA) for children diagnosed with autism spectrum disorder (ASD).',
    keywords: 'Auvia, Auvia Behavior Centers, Auvia Therapy, autism therapy, autism treatment, ABA therapy, play-based ABA, early intervention autism',
    canonical: 'https://auviatherapy.com',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'services',
    title: 'Autism Therapy Programs & ABA Services',
    description: 'Explore our play-based center-based autism therapy programs, early intervention, and school readiness services designed for children with autism.',
    keywords: 'autism therapy services, center based ABA, early intervention, school readiness, social skills group, autism treatment',
    canonical: 'https://auviatherapy.com/services',
    image: 'https://auviatherapy.com/images/kids-aba.jpg'
  },
  {
    path: 'parent-help-center',
    title: 'Parent Resources & Autism Therapy Guides',
    description: 'Find guides, answers, and resources on autism therapy, ASD diagnosis, insurance support, and family behavior support at Auvia.',
    keywords: 'autism parent support, autism therapy guides, autism diagnosis steps, family support autism, parent behavior training',
    canonical: 'https://auviatherapy.com/parent-help-center',
    image: 'https://auviatherapy.com/images/kids-Therapy.jpg'
  },
  {
    path: 'what-is-autism',
    title: 'Understanding Autism Spectrum Disorder (ASD) & Care',
    description: 'Learn about autism spectrum disorder, common traits, early milestones, and how specialized autism therapy can help your child grow.',
    keywords: 'understanding autism, ASD traits, autism milestones, autism spectrum disorder, pediatric development, autism therapy help',
    canonical: 'https://auviatherapy.com/what-is-autism',
    image: 'https://auviatherapy.com/images/kids-diagnosis.jpg'
  },
  {
    path: 'what-is-aba',
    title: 'Applied Behavior Analysis (ABA) Autism Therapy Guide',
    description: 'Discover how Applied Behavior Analysis (ABA) works at Auvia. Explore the gold standard of evidence-based autism therapy for children.',
    keywords: 'autism therapy ABA, what is ABA therapy, applied behavior analysis, gold standard autism therapy, behavior modification',
    canonical: 'https://auviatherapy.com/what-is-aba',
    image: 'https://auviatherapy.com/images/kids-aba.jpg'
  },
  {
    path: 'insurance-by-state',
    title: 'Autism Therapy Insurance Coverage by State',
    description: 'Check your commercial insurance eligibility for center-based autism therapy. We accept Aetna, Blue Cross Blue Shield, Cigna, and more.',
    keywords: 'autism therapy insurance, ABA therapy insurance, in network autism care, Texas ABA insurance, Aetna autism therapy',
    canonical: 'https://auviatherapy.com/insurance-by-state',
    image: 'https://auviatherapy.com/images/kids-insurance.jpg'
  },
  {
    path: 'insurance-financial-assistance',
    title: 'Autism Therapy Insurance & Billing Assistance',
    description: 'Learn about autism therapy insurance benefits, in-network providers, and our billing assistance programs to help you get started.',
    keywords: 'autism therapy financial aid, ABA insurance assistance, funding autism therapy, insurance copays ABA',
    canonical: 'https://auviatherapy.com/insurance-financial-assistance',
    image: 'https://auviatherapy.com/images/kids-insurance.jpg'
  },
  {
    path: 'locations',
    title: 'Find an Autism Therapy Center Near You | Locations',
    description: 'Search for Auvia Behavior Centers across Texas and beyond. Find a sanctuary for center-based autism therapy near your home.',
    keywords: 'autism therapy locations, autism center near me, local ABA therapy, finding an autism clinic, local BCBA services',
    canonical: 'https://auviatherapy.com/locations',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'about',
    title: 'About Auvia | Our Mission & Autism Therapy Experts',
    description: 'Meet Auvia Behavior Centers. Learn about our passionate clinical leadership, modern therapy sanctuaries, and dedication to autism therapy excellence.',
    keywords: 'Auvia mission, autism therapy experts, BCBA leaders, clinical excellence autism care',
    canonical: 'https://auviatherapy.com/about',
    image: 'https://auviatherapy.com/images/about-kids.jpg'
  },
  {
    path: 'careers',
    title: 'Autism Therapy Careers | Join Our BCBA & RBT Family',
    description: 'Join Auvia Behavior Centers. We are hiring passionate BCBAs and RBTs who want to provide compassionate, play-based autism therapy.',
    keywords: 'autism therapy careers, BCBA jobs, RBT jobs, careers in ABA, Auvia careers, behavior technician jobs',
    canonical: 'https://auviatherapy.com/careers',
    image: 'https://auviatherapy.com/images/kids-team.jpg'
  },
  {
    path: 'contact',
    title: 'Contact Us | Start Autism Therapy Today',
    description: 'Get in touch with Auvia. Fill out our simple parent inquiry form to verify your insurance, ask questions, or schedule an autism therapy center tour.',
    keywords: 'contact autism center, autism therapy intake, schedule center tour, verify ABA insurance',
    canonical: 'https://auviatherapy.com/contact',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Patient Data & HIPAA Safety Standards',
    description: 'Read the Privacy Policy of Auvia Behavior Centers. Learn how we safeguard your child\'s data and comply with HIPAA security guidelines.',
    keywords: 'patient privacy, HIPAA compliance autism, medical data safety, Auvia privacy policy',
    canonical: 'https://auviatherapy.com/privacy',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'locations/irving-tx',
    title: 'Autism Therapy in Irving, TX | Auvia Behavior Centers',
    description: 'Welcome to Auvia Behavior Centers in Irving, TX. Our state-of-the-art center is a play-based developmental sanctuary built to provide early intervention and clinical excellence for children with autism.',
    keywords: 'autism therapy Irving, ABA therapy Irving TX, autism center Irving, pediatric therapist Irving, early intervention autism',
    canonical: 'https://auviatherapy.com/locations/irving-tx',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'locations/blaine-mn',
    title: 'Autism Therapy in Blaine, MN | Auvia Behavior Centers',
    description: 'Welcome to Auvia Behavior Centers in Blaine, MN. Our state-of-the-art center is a play-based developmental sanctuary built to provide early intervention and clinical excellence for children with autism.',
    keywords: 'autism therapy Blaine, ABA therapy Blaine MN, autism center Blaine, pediatric therapist Blaine, early intervention autism',
    canonical: 'https://auviatherapy.com/locations/blaine-mn',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  }
];

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

console.log('🚀 Running Auvia Static Pre-Rendering (SSG) Script...');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: dist/index.html not found! Run "npm run build" first.');
  process.exit(1);
}

// Helper to generate semantic static HTML body for crawlers (SSG indexation)
function getSemanticBody(route) {
  const currentYear = new Date().getFullYear();
  const commonHeader = `
    <header style="padding: 20px; background: #ffffff; border-bottom: 1px solid #eaeaea;">
      <nav style="display: flex; gap: 20px; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; flex-wrap: wrap;">
        <a href="/" style="font-weight: bold; text-decoration: none; color: #141414; font-size: 1.35rem;">Auvia Behavior Centers</a>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <a href="/services" style="text-decoration: none; color: #4d9689; font-weight: 600;">Services</a>
          <a href="/locations" style="text-decoration: none; color: #4d9689; font-weight: 600;">Locations</a>
          <a href="/parent-help-center" style="text-decoration: none; color: #4d9689; font-weight: 600;">Parent Resources</a>
          <a href="/careers" style="text-decoration: none; color: #4d9689; font-weight: 600;">Careers</a>
          <a href="/contact" style="text-decoration: none; color: #141414; font-weight: bold;">Get Started</a>
        </div>
      </nav>
    </header>
  `;

  const commonFooter = `
    <footer style="background: #141414; color: #ffffff; padding: 60px 20px; text-align: center; margin-top: auto; border-top: 5px solid #4d9689;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 25px;">
        <h3 style="font-size: 1.6rem; margin: 0; color: #4d9689;">Auvia Behavior Centers</h3>
        <p style="color: #a0aec0; max-width: 600px; margin: 0 auto; line-height: 1.6;">Providing clinical excellence, Play-Based Applied Behavior Analysis (ABA) therapy, and autism treatment sanctuaries across multiple states.</p>
        <div style="display: flex; gap: 20px; justify-content: center; margin: 15px 0; flex-wrap: wrap;">
          <a href="/services" style="color: #e2e8f0; text-decoration: none;">Services</a> |
          <a href="/locations" style="color: #e2e8f0; text-decoration: none;">Locations</a> |
          <a href="/parent-help-center" style="color: #e2e8f0; text-decoration: none;">Parent Help Center</a> |
          <a href="/careers" style="color: #e2e8f0; text-decoration: none;">Careers</a> |
          <a href="/privacy" style="color: #e2e8f0; text-decoration: none;">Privacy Policy</a>
        </div>
        <p style="color: #718096; font-size: 0.85rem; margin: 0;">&copy; ${currentYear} Auvia Behavior Centers. All rights reserved. HIPAA Compliant Clinical Sanctuaries.</p>
      </div>
    </footer>
  `;

  const keywordsList = route.keywords
    ? route.keywords.split(',').map(kw => `<li style="margin-bottom: 10px;"><strong>${kw.trim()}</strong>: Dedicated clinical focus to help children reach development milestones.</li>`).join('')
    : '';

  return `
    <div style="display: flex; flex-direction: column; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf9f6; color: #2d3748;">
      ${commonHeader}
      <main style="flex: 1; max-width: 900px; margin: 60px auto; padding: 0 20px; width: 100%; box-sizing: border-box;">
        <article style="background: #ffffff; padding: 40px; border-radius: 32px; border: 1px solid #141414; box-shadow: 4px 4px 0px #141414;">
          <h1 style="font-size: 2.8rem; color: #141414; margin-top: 0; margin-bottom: 24px; font-family: Georgia, serif;">${route.title}</h1>
          <p style="font-size: 1.25rem; line-height: 1.7; color: #4a5568; margin-bottom: 40px; font-weight: 500;">${route.description}</p>
          
          <section style="margin-top: 40px; padding: 35px; background: #faf9f6; border: 1px solid #e2e8f0; border-radius: 24px;">
            <h2 style="font-size: 1.8rem; color: #141414; margin-top: 0; margin-bottom: 20px;">Services & Core Clinical Competencies</h2>
            <ul style="line-height: 1.8; color: #4a5568; padding-left: 24px; font-size: 1.1rem; margin: 0;">
              ${keywordsList}
            </ul>
          </section>
          
          <div style="margin-top: 45px; text-align: center;">
            <a href="/contact" style="display: inline-block; padding: 18px 45px; background: #141414; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 20px; font-size: 1.2rem; border: 2px solid #141414; transition: all 0.3s;">Verify Insurance & Get Started Today</a>
          </div>
        </article>
      </main>
      ${commonFooter}
    </div>
  `;
}

// 2. Read the default compiled template
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// 3. Process each route
routes.forEach((route) => {
  let content = indexHtml;
  const siteName = 'Auvia Behavior Centers';
  const fullTitle = route.path === '' ? route.title : `${route.title} | ${siteName}`;

  // Replace primary title
  content = content.replace(
    /<title>.*?<\/title>/gi,
    `<title>${fullTitle}</title>`
  );

  // Replace primary description
  content = content.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/gi,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace primary keywords
  content = content.replace(
    /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/gi,
    `<meta name="keywords" content="${route.keywords}" />`
  );

  // Replace canonical URL
  content = content.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace Open Graph og:title
  content = content.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:title" content="${fullTitle}" />`
  );

  // Replace Open Graph og:description
  content = content.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Replace Open Graph og:url
  content = content.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // Replace Open Graph og:image
  content = content.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:image" content="${route.image}" />`
  );

  // Replace Twitter twitter:title
  content = content.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:title" content="${fullTitle}" />`
  );

  // Replace Twitter twitter:description
  content = content.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Replace Twitter twitter:image
  content = content.replace(
    /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:image" content="${route.image}" />`
  );

  // Inject semantic HTML body into root for crawler indexability (SSG)
  const semanticBody = getSemanticBody(route);
  content = content.replace(
    /<div\s+id="root"><\/div>/gi,
    `<div id="root">${semanticBody}</div>`
  );

  if (route.path === '') {
    // For root (Home page), write directly back to dist/index.html
    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log(`  ✓ Pre-rendered Home page: dist/index.html`);
  } else {
    // Create subfolder e.g., dist/services/
    const routeDir = path.join(distPath, route.path);
    fs.mkdirSync(routeDir, { recursive: true });
    
    // Write static pre-rendered index.html inside the subfolder
    const routeIndexPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeIndexPath, content, 'utf-8');
    console.log(`  ✓ Pre-rendered route: /${route.path} -> dist/${route.path}/index.html`);
  }
});

console.log('🎉 Static pre-rendering completed successfully! All routes fully indexed.');
