import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define all key public routes and their specific SEO metadata
const routes = [
  {
    path: '',
    title: 'Expert ABA Therapy for Children with Autism | Home',
    description: 'Welcome to Auvia Behavior Centers. We provide compassionate, play-based Applied Behavior Analysis (ABA) therapy for children diagnosed with autism spectrum disorder (ASD).',
    keywords: 'ABA therapy, autism treatment, play-based ABA, early intervention autism, pediatric behavior therapy',
    canonical: 'https://auviatherapy.com',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'services',
    title: 'Our ABA Therapy Programs & Services',
    description: 'Explore our play-based center-based ABA therapy programs, early intervention, and school readiness services designed for children with autism.',
    keywords: 'ABA therapy services, center based ABA, early intervention, school readiness, social skills group',
    canonical: 'https://auviatherapy.com/services',
    image: 'https://auviatherapy.com/images/kids-aba.jpg'
  },
  {
    path: 'parent-help-center',
    title: 'Parent Help Center & ABA Resources',
    description: 'Find guides, answers, and resources on ABA therapy, autism diagnosis, insurance support, and family integration at Auvia.',
    keywords: 'autism parent support, ABA therapy guides, autism diagnosis steps, family support autism',
    canonical: 'https://auviatherapy.com/parent-help-center',
    image: 'https://auviatherapy.com/images/kids-Therapy.jpg'
  },
  {
    path: 'what-is-autism',
    title: 'Understanding Autism Spectrum Disorder (ASD)',
    description: 'Learn about autism spectrum disorder, common traits, early milestones, and how applied behavior analysis (ABA) can help your child grow.',
    keywords: 'understanding autism, ASD traits, autism milestones, autism spectrum disorder, pediatric development',
    canonical: 'https://auviatherapy.com/what-is-autism',
    image: 'https://auviatherapy.com/images/kids-diagnosis.jpg'
  },
  {
    path: 'what-is-aba',
    title: 'Applied Behavior Analysis (ABA) Therapy Guide',
    description: 'Discover how Applied Behavior Analysis (ABA) works at Auvia. Explore the gold standard of evidence-based therapy for children with autism.',
    keywords: 'what is ABA therapy, applied behavior analysis, gold standard autism therapy, behavior modification',
    canonical: 'https://auviatherapy.com/what-is-aba',
    image: 'https://auviatherapy.com/images/kids-aba.jpg'
  },
  {
    path: 'insurance-by-state',
    title: 'Insurance Coverage for ABA Therapy by State',
    description: 'Check your commercial insurance eligibility for center-based ABA therapy. We accept Aetna, Blue Cross Blue Shield, Cigna, and more across multiple states.',
    keywords: 'ABA therapy insurance, autism insurance coverage, in network ABA, Texas ABA insurance, Aetna ABA therapy',
    canonical: 'https://auviatherapy.com/insurance-by-state',
    image: 'https://auviatherapy.com/images/kids-insurance.jpg'
  },
  {
    path: 'insurance-financial-assistance',
    title: 'ABA Therapy Insurance & Financial Assistance',
    description: 'Learn about autism insurance benefits, in-network providers, and our billing assistance programs to help you start ABA therapy.',
    keywords: 'ABA insurance assistance, funding autism therapy, financial aid autism, insurance copays ABA',
    canonical: 'https://auviatherapy.com/insurance-financial-assistance',
    image: 'https://auviatherapy.com/images/kids-insurance.jpg'
  },
  {
    path: 'locations',
    title: 'Find an ABA Center Near You | Locations',
    description: 'Search for Auvia Behavior Centers across Texas and beyond. Find a sanctuary for center-based ABA therapy near your home.',
    keywords: 'ABA therapy locations, autism center near me, Texas ABA therapy, finding an autism clinic, local BCBA services',
    canonical: 'https://auviatherapy.com/locations',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'about',
    title: 'About Us | Our Mission & Clinical Leadership Team',
    description: 'Meet Auvia Behavior Centers. Learn about our passionate clinical leadership, modern therapy sanctuaries, and dedication to autism excellence.',
    keywords: 'Auvia mission, autism therapy experts, BCBA leaders, clinical excellence autism',
    canonical: 'https://auviatherapy.com/about',
    image: 'https://auviatherapy.com/images/about-kids.jpg'
  },
  {
    path: 'careers',
    title: 'Careers | Join Our BCBA and RBT Team',
    description: 'Join Auvia Behavior Centers. We are hiring passionate BCBAs and RBTs who want to provide compassionate, play-based ABA therapy.',
    keywords: 'BCBA jobs, RBT jobs, careers in ABA, autism therapy jobs, Auvia careers, behavior technician jobs',
    canonical: 'https://auviatherapy.com/careers',
    image: 'https://auviatherapy.com/images/kids-team.jpg'
  },
  {
    path: 'contact',
    title: 'Contact Us | Start ABA Therapy Today',
    description: 'Get in touch with Auvia. Fill out our simple parent inquiry form to verify your insurance, ask questions, or schedule a center tour.',
    keywords: 'contact autism center, ABA therapy intake, schedule center tour, verify ABA insurance',
    canonical: 'https://auviatherapy.com/contact',
    image: 'https://auviatherapy.com/images/kids-hero.jpg'
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Patient Data & Safety Standards',
    description: 'Read the Privacy Policy of Auvia Behavior Centers. Learn how we safeguard your child\'s data and comply with HIPAA security guidelines.',
    keywords: 'patient privacy, HIPAA compliance autism, medical data safety, Auvia privacy policy',
    canonical: 'https://auviatherapy.com/privacy',
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

// 2. Read the default compiled template
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// 3. Process each route
routes.forEach((route) => {
  let content = indexHtml;
  const siteName = 'Auvia Behavior Centers';
  const fullTitle = `${route.title} | ${siteName}`;

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
