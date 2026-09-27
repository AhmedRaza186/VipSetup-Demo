export const site = {
  name: 'VIP Setup',
  phoneDisplay: '0306 2626261',
  phoneE164: '+923062626261',
  city: 'Karachi, Pakistan',
  // TODO: fill in the real street address — rendered only when set.
  streetAddress: '',
  timeZone: 'Asia/Karachi',
  // Index = day of week (0 = Sunday). Times are 24h "HH:MM" in Karachi time; a close time
  // earlier than the open time means the shift runs past midnight into the next day.
  hours: [
    { day: 'Sunday', open: '13:00', close: '02:00' },
    { day: 'Monday', open: '13:00', close: '02:00' },
    { day: 'Tuesday', open: '13:00', close: '02:00' },
    { day: 'Wednesday', open: '13:00', close: '02:00' },
    { day: 'Thursday', open: '13:00', close: '02:00' },
    { day: 'Friday', open: '14:00', close: '02:00' },
    { day: 'Saturday', open: '13:00', close: '03:00' },
  ],
  geo: { lat: 24.8840231, lng: 67.0687897 },
  mapsUrl:
    'https://www.google.com/maps/place/Vip+Setup/@24.8842244,67.0689471,17z/data=!4m15!1m8!3m7!1s0x3eb33f00740b4a13:0x15b95fa36d187cd0!2sVip+Setup!8m2!3d24.8840231!4d67.0687897!10e1!16s%2Fg%2F11zck2z2m5!3m5!1s0x3eb33f00740b4a13:0x15b95fa36d187cd0!8m2!3d24.8840231!4d67.0687897!16s%2Fg%2F11zck2z2m5',
};

const WHATSAPP_BASE = 'https://wa.me/923062626261';

export const whatsappUrl = (message) =>
  message ? `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}` : WHATSAPP_BASE;


const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
};

// Current day of week (0 = Sunday) and minutes past midnight in the restaurant's time zone,
// so the status is correct no matter where the visitor is.
const restaurantNow = (date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

/**
 * Returns { today, isOpen, label } where `today` is the index of the shift to highlight.
 * After midnight, a shift that started the previous day (e.g. Saturday until 3 am) still counts.
 */
export const getOpeningStatus = (date = new Date()) => {
  const { day, minutes } = restaurantNow(date);
  const yesterday = (day + 6) % 7;
  const prev = site.hours[yesterday];
  const cur = site.hours[day];

  // Still inside last night's shift?
  if (toMinutes(prev.close) < toMinutes(prev.open) && minutes < toMinutes(prev.close)) {
    return { today: yesterday, isOpen: true, label: `Open now · closes ${formatTime(prev.close)}` };
  }
  if (minutes >= toMinutes(cur.open)) {
    return { today: day, isOpen: true, label: `Open now · closes ${formatTime(cur.close)}` };
  }
  return { today: day, isOpen: false, label: `Closed · opens ${formatTime(cur.open)} today` };
};
