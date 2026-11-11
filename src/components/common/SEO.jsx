import useSEO from '../../hooks/useSEO';

/**
 * Declarative SEO Component.
 * Can be dropped into any page component to define or override meta tags.
 */
export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/favicon.svg',
  noindex = false,
  jsonLd,
}) => {
  useSEO({
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    noindex,
    jsonLd,
  });

  return null;
};

export default SEO;
