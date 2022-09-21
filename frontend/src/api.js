// Get All Products
export const fetchAllProduct = async () => {
  const res = await fetch("http://localhost:4000/api/products");
  const data = await res.json();

  return data.products;
}

// Get Product Detail
export const fetchProductDetails = async (id) => {
  const res = await fetch(`http://localhost:4000/api/product/${id}`);
  const data = await res.json();

  return data.product;
}