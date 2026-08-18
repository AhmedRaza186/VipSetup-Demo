const MenuItem = ({ item }) => {
  return (
    <article className="menu-item group flex flex-col gap-4 p-4 rounded-2xl hover:bg-secondary transition-colors duration-300 h-full border border-transparent hover:border-gray-100">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none"></div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-poppins text-xl font-semibold text-text-main leading-tight">{item.name}</h3>
          <span className="font-poppins font-bold text-brand-red whitespace-nowrap">{item.price}</span>
        </div>
        <p className="mt-3 text-text-muted font-nunito flex-grow text-base">{item.description}</p>
        
        <div className="mt-6 pt-4 border-t border-secondary">
          <button 
            className="w-full py-2.5 px-4 border-2 border-text-main text-text-main font-poppins font-medium rounded-full hover:bg-text-main hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-text-main"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default MenuItem;
