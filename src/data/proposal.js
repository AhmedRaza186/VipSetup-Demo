// Content for the two-page proposal (/#proposal and the PDF from `npm run proposal`).
// Empty strings render as "________" blanks. Review every line before sending — especially
// the FAQ answers, which are commitments.
export const proposal = {
  preparedFor: 'Mustafa Hanif, Founder, VIP Setup',
  preparedBy: 'Ahmed Raza',
  contact: '', // e.g. 'WhatsApp 03xx xxxxxxx'
  date: 'September 2026',
  demoUrl: 'vip-setup-demo.vercel.app',

  intro:
    "You've seen the demo. This proposal covers what the real VIP Setup website includes, and how we get there in 3 to 4 weeks.",

  opportunity: [
    'VIP Setup already has what most restaurants pay agencies to invent: a real signature ("HMMM."), a loyal late-night crowd and food that photographs well.',
    'Karachi customers find food on Instagram and Google Maps. A fast website with its own ordering turns that attention into orders: one link that shows the menu and takes the order, with every order landing in your own order portal. No delivery-app commission on those orders.',
  ],

  demoVsFull: [
    { feature: 'Menu with photos and prices', demo: 'Yes', full: 'Yes, edited by you' },
    { feature: 'Online ordering', demo: 'Cart only', full: 'Full checkout, delivery or pickup' },
    { feature: 'Order portal', demo: 'Not in demo', full: 'Live orders: accept, prepare, deliver' },
    { feature: 'Owner dashboard', demo: 'Sold-out only', full: 'Prices, photos, deals, hours, sold-out' },
    { feature: 'Order and visitor stats', demo: 'Sample numbers', full: 'Real numbers' },
    { feature: 'Login', demo: 'Demo PIN', full: 'Secure login for you and staff' },
    { feature: 'Web address', demo: 'vercel.app link', full: 'Your own domain, e.g. vipsetup.pk' },
    { feature: 'Google search and Maps', demo: 'Basic', full: 'Full setup and hours sync' },
  ],

  scope: [
    { group: 'Website', items: ['Menu, about, founder, location', 'Photos optimised for mobile', 'Hours with today highlighted', 'Works on every device'] },
    { group: 'Online ordering', items: ['Cart, quantities and add-ons', 'Delivery or pickup checkout', 'Live order status for customers', 'Sold-out items blocked'] },
    { group: 'Order portal', items: ['Live orders with a sound alert', 'Accept, prepare, deliver, done', 'Order history and customers', 'Staff logins: counter, kitchen'] },
    { group: 'Owner dashboard', items: ['Edit prices, photos and text', 'One-tap sold out', 'Deals and combos', 'Hours and holiday closures'] },
    { group: 'Growth', items: ['Google search and Maps', 'Rich previews when shared', 'Stats: top items, busy hours', 'Instagram and review links'] },
  ],

  ai: {
    intro: 'Smart features that save your staff time and help sell more, working quietly in the background.',
    features: [
      { title: 'AI order assistant', body: 'A chat on the website that answers "what is spicy?" or "are you open?" in English or Roman Urdu, and helps customers build their order.' },
      { title: 'Smart suggestions', body: 'Suggests fries, drinks or sauces based on what is in the cart, so the average order goes up.' },
      { title: 'Weekly sales insights', body: 'A plain-language summary in your portal: best sellers, slow items, busy hours and which deal to run next.' },
      { title: 'Review replies', body: 'Drafts polite replies to Google reviews for you to approve in one tap.' },
    ],
  },

  timeline: [
    { when: 'Week 1', what: 'Final menu, prices and photos. Design sign-off.', fromYou: 'Menu, prices, photos, logo files' },
    { when: 'Week 2', what: 'Website and ordering built on your real menu.', fromYou: 'Quick review on your phone' },
    { when: 'Week 3', what: 'Order portal, dashboard, AI features, testing.', fromYou: 'Try the portal, feedback' },
    { when: 'Week 4', what: 'Domain, Google setup, launch, walkthrough.', fromYou: 'Domain and Google access' },
  ],

  needFromYou: [
    'Full menu with current prices and add-ons',
    'Photos (we can use your Instagram)',
    'Logo files and brand colours',
    'Access to Google Business profile and Instagram',
    'Who on your staff will handle orders (portal logins)',
    'One contact person for quick approvals',
  ],

  // No prices in this proposal: pricing is agreed once the scope is approved.
  care: ['Hosting, domain renewal and security', 'Small updates to text, prices and photos', 'Backups and uptime checks', 'Direct support when you need it'],
  pricingNote: 'Pricing is shared once you approve the scope.',

  // Listed without prices: quoted separately as extra charges.
  addOns: ['Online payments (JazzCash, Easypaisa, cards)', 'Urdu version of the site', 'Loyalty / repeat-customer deals', 'Kitchen ticket / receipt printing'],

  notIncluded: ['Food photography shoots', 'Paid ads and boosting posts', 'Third-party fees (payment gateways, delivery apps)'],

  faq: [
    { q: 'Do I pay commission on orders?', a: 'No. Orders come straight into your own order portal.' },
    { q: 'Can I change prices myself?', a: 'Yes, from the dashboard on your phone, any time.' },
    { q: 'Who owns the site?', a: 'You do: your domain, your content, your customers.' },
    { q: 'Do my staff need technical skills?', a: 'No. If they can use WhatsApp, they can use the portal. I train them at launch.' },
    { q: 'Can the AI give wrong answers?', a: 'It only answers from your menu, prices and hours, and hands anything else to your staff.' },
    { q: 'What happens during a rush?', a: 'Every order lands in the portal with a sound alert, so nothing gets missed.' },
    { q: 'Is customer data safe?', a: 'Yes. Secure logins, encrypted connections and regular backups.' },
    { q: 'What if I want changes later?', a: 'Small updates are part of ongoing care. Bigger features are quoted separately.' },
  ],

  nextSteps: ['Approve the scope', 'Agree pricing and start date', 'Kick-off: live in 3 to 4 weeks'],
};
