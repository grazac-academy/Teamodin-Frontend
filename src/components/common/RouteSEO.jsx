import { useLocation } from 'react-router-dom';
import { getSEOForPath } from '../../utils/seoConfig';
import useSEO from '../../hooks/useSEO';

/**
 * RouteSEO listens to React Router route changes and automatically syncs
 * page titles, descriptions, OpenGraph tags, canonical links, and robots directives
 * based on the active URL path.
 */
export const RouteSEO = () => {
  const location = useLocation();
  const seoData = getSEOForPath(location.pathname);

  useSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: seoData.canonical || location.pathname,
    ogType: seoData.ogType || 'website',
    ogImage: seoData.ogImage || '/favicon.svg',
    noindex: seoData.noindex ?? false,
    jsonLd: seoData.jsonLd,
  });

  return null;
};

export default RouteSEO;
