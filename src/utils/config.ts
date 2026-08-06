/**
 * The only block you need to edit to go live. Every value that appears anywhere
 * on the site comes from here or from src/utils/translations.ts.
 */
export const CONFIG = {
  brand: 'SKD',
  brandTag: 'DEVELOPERS',
  brandFull: 'SKD DEVELOPERS',
  established: '2009',                          // TODO: real founding year
  phoneDisplay: '+91 97265 47157',              // TODO: real phone
  phoneDial: '+919726547157',                   // TODO: digits only
  whatsapp: '919726547157',                     // TODO: wa.me number, no +
  email: 'info@skddevelopers.com',              // TODO: real email
  city: 'Surat',
  state: 'Gujarat',
  addressLine: 'Varachha, Surat, Gujarat 395008', // TODO: real address
  stats: { years: '20+', projects: '150+', onTime: '100%' }, // TODO: real numbers
};
export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.addressLine);
export const WA_URL = 'https://wa.me/' + CONFIG.whatsapp;
export const TEL_URL = 'tel:' + CONFIG.phoneDial;
