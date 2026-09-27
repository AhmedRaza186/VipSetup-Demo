import { useState } from 'react';
import { menuCategories, menuItems } from '../../data/menu';
import { imageUrl } from '../../lib/images';
import { useSoldOut, toggleSoldOut, resetSoldOut } from '../../lib/store';

// Concept preview of the owner dashboard. Stats are sample data; the sold-out toggles are real
// and update the menu live in any open site tab on this device.
const DEMO_PIN = '1234';

const SAMPLE_STATS = [
  { label: 'WhatsApp orders this week', value: '142', note: '+18% vs last week' },
  { label: 'Menu views today', value: '1,086', note: 'Peak at 11 pm' },
  { label: 'Top item', value: 'Zingro Pro Max', note: '38 orders this week' },
  { label: 'Average order', value: 'Rs. 1,640', note: 'Across all orders' },
];

const PinScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pin === DEMO_PIN) onUnlock();
    else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-primary rounded-3xl shadow-xl p-8 text-center">
        <img src="/images/brand/logo.png" alt="VIP Setup" className="h-16 w-auto mx-auto" />
        <h1 className="mt-6 text-2xl font-poppins font-bold text-text-main">Owner Dashboard</h1>
        <p className="mt-2 text-text-muted font-nunito">Enter your PIN to continue.</p>
        <label htmlFor="pin" className="sr-only">PIN</label>
        <input
          id="pin"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ''));
            setError(false);
          }}
          className={`mt-6 w-full text-center tracking-[0.75em] text-2xl font-poppins font-semibold py-4 rounded-2xl border-2 bg-secondary focus:outline-none focus:border-brand-red ${error ? 'border-brand-red' : 'border-gray-200'}`}
          aria-invalid={error}
          aria-describedby="pin-help"
        />
        <p id="pin-help" className={`mt-3 text-sm font-nunito ${error ? 'text-brand-red' : 'text-text-muted'}`}>
          {error ? 'Wrong PIN, try again.' : 'Demo PIN: 1234'}
        </p>
        <button
          type="submit"
          className="mt-6 w-full py-4 rounded-full bg-brand-red text-white font-poppins font-semibold hover:bg-brand-red-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
        >
          Unlock
        </button>
        <a href="#" className="mt-4 inline-block text-sm font-poppins font-medium text-text-muted hover:text-brand-red">
          ← Back to website
        </a>
      </form>
    </div>
  );
};

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red ${checked ? 'bg-green-600' : 'bg-gray-300'}`}
  >
    <span
      className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
    ></span>
  </button>
);

const Dashboard = () => {
  const soldOut = useSoldOut();
  const available = menuItems.length - soldOut.length;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/images/brand/logo.png" alt="VIP Setup" className="h-10 w-auto" />
            <span className="hidden sm:inline font-poppins font-semibold text-text-main">Owner Dashboard</span>
            <span className="px-2.5 py-1 rounded-full bg-brand-yellow/20 text-[#8a5a00] text-xs font-poppins font-semibold uppercase tracking-wider">
              Preview
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border-2 border-text-main text-sm font-poppins font-semibold text-text-main hover:bg-text-main hover:text-white transition-colors"
          >
            Open website ↗
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-text-main">Assalam-o-Alaikum, Mustafa 👋</h1>
        <p className="mt-2 text-text-muted font-nunito text-lg">Here's how VIP Setup is doing.</p>

        {/* Stats */}
        <section aria-label="Sample stats" className="mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {SAMPLE_STATS.map((s) => (
              <div key={s.label} className="bg-primary rounded-2xl p-4 sm:p-5 shadow-sm">
                <p className="text-sm text-text-muted font-nunito">{s.label}</p>
                <p className="mt-2 text-xl sm:text-2xl font-poppins font-bold text-text-main leading-tight">{s.value}</p>
                <p className="mt-1 text-sm font-poppins font-medium text-green-700">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted font-nunito">Sample data. Live numbers come with the full version.</p>
        </section>

        {/* Menu availability */}
        <section className="mt-12 bg-primary rounded-3xl shadow-sm p-6 sm:p-8" aria-labelledby="availability-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="availability-title" className="text-2xl font-poppins font-bold text-text-main">Menu availability</h2>
              <p className="mt-1 text-text-muted font-nunito">
                Switch off anything that's sold out. The website updates instantly.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-poppins font-semibold text-text-main">
                {available}/{menuItems.length} available
              </span>
              {soldOut.length > 0 && (
                <button
                  type="button"
                  onClick={resetSoldOut}
                  className="text-sm font-poppins font-medium text-brand-red hover:underline"
                >
                  Mark all available
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-10">
            {menuCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-poppins font-semibold uppercase tracking-widest text-text-muted mb-3">{cat.label}</h3>
                <ul className="divide-y divide-secondary border border-secondary rounded-2xl">
                  {menuItems
                    .filter((item) => item.category === cat.id)
                    .map((item) => {
                      const isAvailable = !soldOut.includes(item.id);
                      return (
                        <li key={item.id} className="flex items-center gap-4 px-4 py-3">
                          <img
                            src={imageUrl(item.image)}
                            alt=""
                            className={`w-12 h-12 rounded-lg object-cover ${isAvailable ? '' : 'grayscale opacity-60'}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-poppins font-semibold text-text-main truncate">{item.name}</p>
                            <p className="text-sm text-text-muted font-nunito">{item.price}</p>
                          </div>
                          <span className={`hidden sm:inline text-sm font-poppins font-medium ${isAvailable ? 'text-green-700' : 'text-brand-red'}`}>
                            {isAvailable ? 'Available' : 'Sold out'}
                          </span>
                          <Toggle
                            checked={isAvailable}
                            onChange={() => toggleSoldOut(item.id)}
                            label={`${item.name} available`}
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-text-muted font-nunito">
          Coming in the full version: edit prices and photos, deals, opening hours, and live order stats.
        </p>
      </main>
    </div>
  );
};

const Admin = () => {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <Dashboard /> : <PinScreen onUnlock={() => setUnlocked(true)} />;
};

export default Admin;
