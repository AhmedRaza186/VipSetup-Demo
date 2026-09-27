const QtyStepper = ({ qty, onChange, name, size = 'md' }) => {
  const btn = size === 'sm' ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg';
  return (
    <div className="inline-flex items-center gap-3" role="group" aria-label={`Quantity of ${name}`}>
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={`Remove one ${name}`}
        className={`${btn} inline-flex items-center justify-center rounded-full border-2 border-text-main text-text-main font-poppins font-semibold hover:bg-text-main hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main`}
      >
        −
      </button>
      <span className="min-w-6 text-center font-poppins font-semibold text-text-main" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label={`Add one more ${name}`}
        className={`${btn} inline-flex items-center justify-center rounded-full bg-brand-red text-white font-poppins font-semibold hover:bg-brand-red-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red`}
      >
        +
      </button>
    </div>
  );
};

export default QtyStepper;
