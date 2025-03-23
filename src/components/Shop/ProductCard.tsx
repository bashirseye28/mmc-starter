"use client";

const ProductCard = ({ product }: { product: { name: string; price: string; image: string } }) => {
  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to order: ${product.name} - ${product.price}.`;
    const whatsappURL = `https://wa.me/447XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-bold text-primary">{product.name}</h3>
      <p className="text-lg font-semibold text-darkText">{product.price}</p>
      <button
        onClick={handleWhatsAppOrder}
        className="mt-4 px-6 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-[#b7791f] transition"
      >
        Order on WhatsApp
      </button>
    </div>
  );
};

export default ProductCard;