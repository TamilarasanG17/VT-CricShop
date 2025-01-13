const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-40 w-full object-cover rounded-md mb-4" 
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
