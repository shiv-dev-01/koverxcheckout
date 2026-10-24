import React, { useState, useEffect } from "react";
import {
  LogIn,
  Mail,
  HeartHandshake,
  Shield,
  Truck,
  Star,
  CheckCircle,
  ArrowRight,
  User,
  Key,
  ExternalLink,
} from "lucide-react";
import images from "../constants/images";
import { useLocation } from "react-router-dom";
import {
  injectOfficialPapSaleSnippet,
  loadThankYouOrderSnapshot,
  clearThankYouOrderSnapshot,
} from "../utils/postAffiliatePro";

function NewThankyouPage() {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();

  // Prefer router state; fall back to sessionStorage (PAP hash replaceState can wipe router state)
  const saved = loadThankYouOrderSnapshot() || {};
  const email = location.state?.email ?? saved.email;
  const orderId = location.state?.orderId ?? saved.orderId;
  const orderIds =
    location.state?.orderIds ||
    saved.orderIds ||
    [orderId].filter(Boolean);
  const firstName = location.state?.firstName ?? saved.firstName;
  const lastName = location.state?.lastName ?? saved.lastName;
  const productTotal =
    location.state?.productTotal ?? saved.productTotal ?? 0;
  const productId = location.state?.productId ?? saved.productId ?? "";

  // memberportel redire url
  const currentDomain = window.location.hostname;

  let memberPortalUrl = "https://member.koverx.com/"; // Default URL

  if (currentDomain === "checkout.koverx.co") {
    memberPortalUrl = "https://member.koverx.com/";
  } else if (currentDomain === "checkoutlive-koverx.wlmd.live") {
    memberPortalUrl = "http://mplive-koverx.wlmd.live/login";
  }

  /**
   * PAP General solution — thank-you page sale tracking.
   * Same as docs: tracker script + createSale + setTotalCost/OrderID/ProductID + register.
   */
  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);

    const primaryOrderId = (orderIds && orderIds[0]) || orderId;
    if (!primaryOrderId) {
      console.warn("[PAP] thank-you: no orderId — sale not registered");
      return;
    }

    const total =
      productTotal != null && productTotal !== ""
        ? String(productTotal)
        : "0";
    const pid = productId ? String(productId) : String(primaryOrderId);

    const t = setTimeout(() => {
      const ok = injectOfficialPapSaleSnippet({
        orderId: String(primaryOrderId),
        totalCost: total,
        productId: pid,
      });
      if (ok) clearThankYouOrderSnapshot();
      else console.warn("[PAP] thank-you: General solution sale snippet failed");
    }, 400);

    return () => clearTimeout(t);
  }, [orderId, orderIds, productTotal, productId]);

  // GoAffPro conversion tracking
  useEffect(() => {
    if (!orderId || !productTotal) return;

    try {
      window.goaffpro_order = {
        id: orderId,
        number: orderIds[0] || orderId,
        total: productTotal.toString(),
        currency: "USD",
      };

      // Inject GoAffPro loader script once
      const existingScript = document.querySelector('script[data-goaffpro-loader="true"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://api.goaffpro.com/loader.js";
        script.setAttribute("data-goaffpro-loader", "true");
        document.body.appendChild(script);
      }
    } catch (err) {
      console.error("GoAffPro tracking error:", err);
    }
  }, [orderId, orderIds, productTotal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-4">
      <div
        className={`w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl relative transform transition-all duration-700 mx-2 sm:mx-4 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl sm:rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full translate-x-1/2 translate-y-1/2 opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Header Section */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 border-b border-gray-100">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-6">
            <a href="https://www.koverx.com/" target="_blank" className="group">
              <img
                src={images.logo}
                alt="Logo"
                className="h-10 mb-2 sm:h-12 lg:h-14 transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg"
              />
            </a>
          </div>

          {/* Success Icon with Enhanced Animation */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div
              className={`relative transition-all duration-700 ${
                showContent ? "scale-100" : "scale-0"
              }`}
            >
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full animate-pulse"></div>
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full animate-ping opacity-20"></div>
              <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Title and Status */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:my-2 px-2">
              🎉 Order Successful!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Thank you for your purchase! Your order has been confirmed and a
              confirmation email has been sent to you.
            </p>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Order Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          {/* Primary Action Section */}
          {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Complete Your Consultation
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 max-w-lg mx-auto">
                To proceed with your order, please complete your medical consultation forms in your member portal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <button
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-base sm:text-lg font-semibold shadow-lg"
                  onClick={() => (window.location.href = memberPortalUrl)}
                >
                  <LogIn className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                  <span>Access Member Portal</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>or</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                
                <a
                  href="mailto:contact@koverx.com"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 text-sm sm:text-base font-medium"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </div> */}

          {/* Steps Section */}
          <div className="mb-6 sm:mb-8">
            {/* <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4 sm:mb-6">
              Next Steps
            </h3> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-center mb-2">
                  Check Your Email
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Look for member portal credentials in your email inbox
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-center mb-2">
                  Login to Portal
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Use your credentials to access your member portal
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-center mb-2">
                  Complete Forms
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  Fill out your medical consultation forms
                </p>
              </div>
            </div>
            <div className="flex mt-5 flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                className="group flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
                onClick={() => (window.location.href = memberPortalUrl)}
              >
                <LogIn className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span className="text-white">Access Member Portal</span>
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Email Information */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Member Portal Access
              </h3>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Your member portal credentials have been sent to:{" "}
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
              <p className="text-xs text-gray-500">
                If you don't see the email, please check your spam folder or
                contact our support team.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4 sm:mb-6">
              Why Choose koverx?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Secure & Private
                </h4>
                <p className="text-sm text-gray-600">
                  Your information is protected with bank-level security
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Fast Delivery
                </h4>
                <p className="text-sm text-gray-600">
                  Fast shipping on all orders with tracking
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 sm:p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Premium Support
                </h4>
                <p className="text-sm text-gray-600">
                  Reliable customer support with medical consultation included
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          {/* <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-4 sm:mb-6">
                Ready to Get Started?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <button
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-base sm:text-lg font-semibold shadow-lg w-full sm:w-auto"
                  onClick={() => (window.location.href = memberPortalUrl)}
                >
                  <LogIn className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                  <span>Access Member Portal</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a
                  href="mailto:contact@koverx.com"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 text-sm sm:text-base font-medium w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </div> */}

          {/* Support Section */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Need Help?
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Our support team is here to help you with any questions or
              concerns.
            </p>
            <a
              href="mailto:support@koverx.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              support@koverx.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewThankyouPage;
