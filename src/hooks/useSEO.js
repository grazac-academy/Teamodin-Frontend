import { useEffect } from 'react';

/**
 * Custom React Hook for dynamically managing document SEO meta tags in React 19 SPAs.
 *
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} options.description - Meta description
 * @param {string} [options.keywords] - Meta keywords
 * @param {string} [options.canonical] - Canonical URL or pathname
 * @param {string} [options.ogType] - OpenGraph type ('website', 'article', etc.)
 * @param {string} [options.ogImage] - OpenGraph & Twitter preview image URL
 * @param {boolean} [options.noindex] - Whether search engines should noindex this page
 * @param {Object} [options.jsonLd] - Structured JSON-LD schema
 */
export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/favicon.svg',
  noindex = false,
  jsonLd,
} = {}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title.includes('HRStack') ? title : `${title} | HRStack`;
    }

    // Helper: update or create meta tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    // 3. Meta Keywords
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Robots Directives
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
    setMetaTag('name', 'robots', robotsContent);
    setMetaTag('name', 'googlebot', robotsContent);

    // 5. OpenGraph Tags
    const formattedTitle = title ? (title.includes('HRStack') ? title : `${title} | HRStack`) : 'HRStack';
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'HRStack');
    
    // Resolve absolute canonical / current URL
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hrstack.example.com';
    const currentUrl = canonical 
      ? (canonical.startsWith('http') ? canonical : `${baseUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
      : (typeof window !== 'undefined' ? window.location.href : baseUrl);

    setMetaTag('property', 'og:url', currentUrl);
    
    // Image
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
    setMetaTag('property', 'og:image', fullImageUrl);

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 7. Canonical Link Tag
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', currentUrl);

    // 8. JSON-LD Structured Data
    const SCRIPT_ID = 'hrstack-seo-jsonld';
    let scriptElement = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = SCRIPT_ID;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [title, description, keywords, canonical, ogType, ogImage, noindex, jsonLd]);
}

export default useSEO;
