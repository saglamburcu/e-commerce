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

// Create Product Review
export const fetchCreateProductReview = async (productId, comment, rating) => {
  const res = await fetch("http://localhost:4000/api/product/review", {
    method: "POST",
    body: JSON.stringify({
      productId: productId,
      comment: comment,
      rating: rating
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const data = await res.json();

  console.log(data)
}

// Login
export const fetchLoginUser = async (email, password) => {
  const res = await fetch("http://localhost:4000/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const data = await res.json();

  console.log("login", data)

  return data;
}

// Register
export const fetchRegisterUser = async (name, email, password) => {
  const res = await fetch("http://localhost:4000/api/registration", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const data = await res.json();

  console.log("register", data)

  return data;
}