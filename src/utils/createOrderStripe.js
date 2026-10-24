/**
 * Build JSON body for POST /koverx/api/createOrder_stripe
 *
 * API contract (exact field names):
 * {
 *   email, first_name, last_name, phone,
 *   address, city_name, state_name, zip_code,
 *   start_url, payment_token, product_id,
 *   address2, billing_address, billing_address2,
 *   billing_city_name, billing_state_name, billing_zip_code,
 *   billingSameAsShipping ("YES" | "NO"),
 *   promo_codes (string | null)
 * }
 */
export const buildCreateOrderStripeBody = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  address,
  aptSuite,
  city,
  stateCode,
  postalCode,
  sameAsShipping,
  address2,
  city2,
  billingStateCode,
  postalCode2,
  appliedDiscount,
  campaignId,
  contactDetailsId,
  checkoutLinkId,
  adminId,
  shippingId,
  newShippingId,
  newshippingCost,
  shippingCode,
  dateOfBirth,
  gender,
  requiresDOBAndGender,
  productIds,
  productPrices,
  originalPrices,
  gatewayIds,
  billingModelIds,
  promoCodes,
  quantities,
  paymentToken,
}) => {
  const primaryProductId = Array.isArray(productIds) ? productIds[0] : productIds;
  const primaryProductPrice = Array.isArray(productPrices)
    ? productPrices[0]
    : productPrices;
  const primaryOriginalPrice = Array.isArray(originalPrices)
    ? originalPrices[0]
    : originalPrices;

  const body = {
    email,
    first_name: firstName,
    last_name: lastName,
    phone: phoneNumber,
    address,
    address2: aptSuite || "",
    city_name: city,
    state_name: stateCode,
    zip_code: postalCode,
    billingSameAsShipping: sameAsShipping ? "YES" : "NO",
    start_url: window.location.href,
    payment_token: paymentToken,
    product_id: primaryProductId,
    product_price: primaryProductPrice,
    original_price: primaryOriginalPrice,
    promo_codes: appliedDiscount || null,
  };

  if (sameAsShipping) {
    body.billing_address = address;
    body.billing_address2 = aptSuite || "";
    body.billing_city_name = city;
    body.billing_state_name = stateCode;
    body.billing_zip_code = postalCode;
  } else {
    body.billing_address = address2 || "";
    body.billing_address2 = "";
    body.billing_city_name = city2 || "";
    body.billing_state_name = billingStateCode || "";
    body.billing_zip_code = postalCode2 || "";
  }

  if (campaignId) body.campaign_id = campaignId;
  if (contactDetailsId) body.contact_details_id = contactDetailsId;
  if (checkoutLinkId != null) body.checkout_link_id = checkoutLinkId;
  if (adminId != null && adminId !== "") body.admin_id = adminId;
  if (shippingId != null) body.shipping_id = shippingId;
  if (newShippingId != null) body.new_shipping_id = newShippingId;
  if (newshippingCost && parseFloat(newshippingCost) > 0)
    body.shipping_cost = newshippingCost;
  if (shippingCode) body.shipping_code = shippingCode;
  if (requiresDOBAndGender) {
    body.date_of_birth = dateOfBirth;
    body.gender = gender;
  }

  if (Array.isArray(productIds) && productIds.length > 1) {
    body["product_id_arr"] = productIds;
    body["product_price_arr"] = productPrices;
    body["original_price_arr"] = originalPrices;
    body["billing_model_id"] = billingModelIds;
    body["promoCodes"] = promoCodes;
    body["qty"] = quantities;
  }

  return body;
};
