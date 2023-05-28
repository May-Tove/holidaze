import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that automatically scrolls to the top of the page whenever the URL pathname changes.
 * Reference: https://dev.to/kunalukey/scroll-to-top-when-route-changes-reactjs-react-router-3bgn
 *
 * @returns {void}
 */
const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default ScrollToTop;
