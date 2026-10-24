import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  preparePapAffiliateInBrowserUrl,
  trackPostAffiliateClick,
} from "../utils/postAffiliatePro";

/**
 * PAP click tracking on every SPA navigation.
 * Initial page load is also tracked from public/index.html (official snippet).
 */
function PostAffiliateTracker() {
  const location = useLocation();

  useEffect(() => {
    preparePapAffiliateInBrowserUrl();
    // Re-fire click track on SPA navigations (and after affiliate hash→query)
    trackPostAffiliateClick();
  }, [location.pathname, location.search, location.hash]);

  return null;
}

export default PostAffiliateTracker;
