const MenuCategoryNav = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto py-4 mb-8 border-b border-secondary" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Hide scrollbar for Chrome/Safari with custom CSS or inline styles, here we use generic no-scrollbar approach */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex space-x-8 min-w-max px-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`font-poppins text-lg lg:text-xl font-medium pb-4 border-b-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
              activeCategory === cat.id 
                ? 'border-brand-red text-brand-red' 
                : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryNav;
