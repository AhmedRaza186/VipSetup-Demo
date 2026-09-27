const VARIANTS = {
  primary:
    'border border-transparent text-white bg-brand-red hover:bg-brand-red-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-brand-red',
  outline:
    'border-2 border-text-main text-text-main hover:bg-text-main hover:text-white hover:-translate-y-0.5 focus-visible:ring-text-main',
};

const Button = ({ href, variant = 'primary', external = false, className = '', children, ...props }) => (
  <a
    href={href}
    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    className={`inline-flex items-center justify-center whitespace-nowrap font-poppins font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${VARIANTS[variant]} ${className}`}
    {...props}
  >
    {children}
  </a>
);

export default Button;
