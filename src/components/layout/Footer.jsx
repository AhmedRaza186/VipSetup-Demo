import { site, whatsappUrl } from '../../data/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-red py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="w-full lg:w-1/3 flex flex-col items-start">
            <a href="#home" className="inline-block mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-white rounded-xl bg-white p-4 shadow-md transition-transform hover:-translate-y-1">
              <img 
                src="/images/brand/logo.png" 
                alt="VIP Setup Logo" 
                className="h-12 sm:h-14 w-auto" 
              />
            </a>
            <p className="text-white/80 font-nunito max-w-xs leading-relaxed">
              Serving genuine flavor and memorable experiences. Come hungry, leave saying HMMM.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="w-full sm:w-1/2 lg:w-1/6 flex flex-col">
            <h4 className="text-sm font-poppins font-bold tracking-widest text-white uppercase mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              <a href="#home" className="text-white/80 hover:text-brand-yellow font-poppins font-medium transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-sm">Home</a>
              <a href="#menu" className="text-white/80 hover:text-brand-yellow font-poppins font-medium transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-sm">Menu</a>
              <a href="#about" className="text-white/80 hover:text-brand-yellow font-poppins font-medium transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-sm">About</a>
              <a href="#location" className="text-white/80 hover:text-brand-yellow font-poppins font-medium transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-sm">Location</a>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="w-full sm:w-1/2 lg:w-1/4 flex flex-col">
            <h4 className="text-sm font-poppins font-bold tracking-widest text-white uppercase mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-4 text-white/80 font-nunito">
              <p>For reservations and orders:</p>
              <a 
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-yellow font-poppins font-semibold transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-sm"
              >
                {site.phoneDisplay}
              </a>
              <address className="mt-2 not-italic">
                {site.streetAddress && <>{site.streetAddress}<br /></>}
                {site.city}
              </address>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/80 font-nunito">
            &copy; {currentYear} VIP Setup. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#admin"
              className="text-sm text-white/60 hover:text-white font-nunito transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            >
              Owner login
            </a>
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <div className="w-1 h-1 rounded-full bg-brand-yellow"></div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
