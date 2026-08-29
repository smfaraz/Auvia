import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  image?: string;
  jsonLd?: object | string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  canonicalUrl,
  ogType = 'website',
  image = 'https://auviatherapy.com/images/kids-hero.jpg',
  jsonLd
}) => {
  const siteName = "Auvia Behavior Centers";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://auviatherapy.com');
  
  // Default extensive keywords if none provided
  const defaultKeywords = "ABA therapy, autism treatment, behavior analysis, autism centers Texas, BCBA, early intervention, autism therapy, RBT, children with autism, autism spectrum disorder support, special needs care";
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Canonical URL for SEO deduplication */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph (OG) tags for Facebook/LinkedIn/Slack */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Tell robots to index and follow links */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {jsonLd && (
        <script type="application/ld+json">
          {typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
