import { imageSet } from '../../lib/images';
import { addToCart, setQty, useCart, useSoldOut } from '../../lib/store';
import { hmmmBurst } from '../../lib/burst';
import QtyStepper from './QtyStepper';

const MenuItem = ({ item }) => {
  const { cart } = useCart();
  const soldOut = useSoldOut().includes(item.id);
  const qty = cart[item.id] ?? 0;

  return (
    <article className={`menu-item group flex flex-col gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors duration-300 h-full border border-transparent hover:border-gray-100 ${soldOut ? 'opacity-60' : ''}`}>
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 relative">
        <img
          {...imageSet(item.image)}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          width="2048"
          height="2048"
          alt={item.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${soldOut ? 'grayscale' : 'group-hover:scale-105'}`}
        />
        {soldOut && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-text-main text-white text-xs font-poppins font-semibold uppercase tracking-widest">
            Sold out
          </span>
        )}
        <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none"></div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-poppins text-xl font-semibold text-text-main leading-tight">{item.name}</h3>
          <span className="font-poppins font-bold text-brand-red whitespace-nowrap">{item.price}</span>
        </div>
        <p className="mt-3 text-text-muted font-nunito flex-grow text-base">{item.description}</p>

        <div className="mt-6 pt-4 border-t border-secondary min-h-[4.25rem] flex items-center">
          {soldOut ? (
            <p className="w-full text-center py-2.5 font-poppins font-medium text-text-muted">
              Back soon
            </p>
          ) : qty > 0 ? (
            <div className="w-full flex items-center justify-between">
              <span className="font-poppins font-medium text-text-main">In your order</span>
              <QtyStepper qty={qty} onChange={(n) => setQty(item.id, n)} name={item.name} />
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                hmmmBurst(e.currentTarget);
                addToCart(item.id);
              }}
              className="w-full py-2.5 px-4 border-2 border-text-main text-text-main font-poppins font-medium rounded-full hover:bg-text-main hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main"
            >
              Add to order
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default MenuItem;
