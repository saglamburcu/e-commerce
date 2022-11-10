// Get All Products
// { name: val }
export const fetchAllProduct = async (query, pageValue) => {
  const url = new URL('http://localhost:4000/api/products');

  for (const [key, val] of Object.entries(query)) {
    url.searchParams.set(key, val);
  }

  url.searchParams.set('page', pageValue);

  const res = await fetch(url, { credentials: 'include' });
  const data = await res.json();

  return data;
}

// Get All Categories
export const fetchAllCategories = async () => {
  const res = await fetch(`http://localhost:4000/api/categories`, { credentials: 'include' });
  const data = await res.json();

  return data;
}

// Get Product Detail
export const fetchProductDetails = async (id) => {
  const res = await fetch(`http://localhost:4000/api/product/${id}`, { credentials: 'include' });
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
    },
    credentials: 'include'
  });

  const data = await res.json();

  return data;
}

// Get All Reviews Of The Product
export const fetchAllReviews = async (productId) => {
  const res = await fetch(`http://localhost:4000/api/reviews?id=${productId}`, { credentials: 'include' });
  const data = await res.json();

  return data.reviews;
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
    },
    credentials: 'include'
  });

  const data = await res.json();

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
    },
    credentials: 'include'
  });

  const data = await res.json();

  return data;
}

// Logout
export const fetchLogout = async () => {
  const res = await fetch("http://localhost:4000/api/logout", { credentials: 'include' });
  const data = res.json();

  return data;
}

// Forgot Password
export const fetchForgotPassword = async (email) => {
  const res = await fetch("http://localhost:4000/api/password/forgot", {
    method: "POST",
    body: JSON.stringify({
      email
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    credentials: 'include'
  })

  const data = await res.json();
  return data;
}

// Reset Password
export const fetchResetPassword = async (token, password, confirmPassword) => {
  const res = await fetch(`http://localhost:4000/api/password/reset/${token}`, {
    method: 'PUT',
    body: JSON.stringify({
      token,
      password,
      confirmPassword
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  });

  const data = res.json();
  console.log(data)
  return data;
}

// Get User Details
export const fetchUserDetails = async () => {
  const res = await fetch("http://localhost:4000/api/me", { credentials: 'include' });
  const data = await res.json();

  return data.user;
}

// Update User Info
export const fetchUpdateUserInfo = async (data) => {
  const res = await fetch("http://localhost:4000/api/me/update/info", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  });

  const resData = await res.json();

  console.log(resData);
}

// Update Password
export const fetchUpdatePassword = async (oldPassword, newPassword, confirmPassword) => {
  const res = await fetch("http://localhost:4000/api/me/updatepassword", {
    method: 'PUT',
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  })

  const data = res.json();

  return data;
}

// Create Order
export const fetchCreateOrder = async (data) => {
  const res = await fetch("http://localhost:4000/api/order/new", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    credentials: 'include'
  });

  const resData = await res.json();

  return resData;
}


// Get All Orders
export const fetchAllOrders = async () => {
  const res = await fetch("http://localhost:4000/api/orders/me", { credentials: 'include' });
  const data = res.json();

  return data;
}

// Get Single Order
export const fetchSingleOrder = async (orderId) => {
  const res = await fetch(`http://localhost:4000/api/order/${orderId}`, { credentials: 'include' });
  const data = res.json();

  return data;
}

// Get All Products --- Admin
export const fetchAllProductsAdmin = async () => {
  const res = await fetch("http://localhost:4000/api/products/admin", { credentials: 'include' });
  const data = res.json();

  return data;
}

// Delete Product --- Admin
export const fetchDeleteProduct = async (productId) => {
  const res = await fetch(`http://localhost:4000/api/product/${productId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  const data = await res.json();

  return data;
}

// Update Product --- Admin
export const fetchUpdateProduct = async (productId, name, description, price, images, category, stock) => {
  const res = await fetch(`http://localhost:4000/api/product/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      description,
      price,
      images,
      category,
      stock
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  });

  const resData = await res.json();

  return resData;
}

// Create Product --- Admin
export const fetchCreateNewProduct = async (name, description, price, images, category, stock) => {
  const res = await fetch("http://localhost:4000/api/product/new", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      price,
      images,
      category,
      stock
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    credentials: 'include'
  });

  const resData = await res.json();

  return resData;
}

// Get All Orders --- Admin
export const fetchGetAllOrders = async () => {
  const res = await fetch("http://localhost:4000/api/admin/orders", { credentials: 'include' });

  const data = await res.json();

  return data;
}

// Delete Order --- Admin
export const fetchDeleteOrder = async (orderId) => {
  const res = await fetch(`http://localhost:4000/api/admin/order/${orderId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

// Update Order Status --- Admin
export const fetchUpdateOrderStatus = async (orderId, status) => {
  const res = await fetch(`http://localhost:4000/api/admin/order/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({
      status
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  });

  const data = await res.json();

  return data;
}

// Get Users --- Admin
export const fetchAllUsers = async () => {
  const res = await fetch("http://localhost:4000/api/admin/users", { credentials: 'include' });

  const data = await res.json();

  return data;
}

// Get Single User --- Admin
export const fetchGetSingleUser = async (userId) => {
  const res = await fetch(`http://localhost:4000/api/admin/user/${userId}`, { credentials: 'include' });

  const data = await res.json();

  return data;
}

// Delete User --- Admin
export const fetchDeleteUser = async (userId) => {
  const res = await fetch(`http://localhost:4000/api/admin/deleteuser/${userId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

// Update User Role --- Admin
export const fetchUpdateUserRole = async (userId, data) => {
  const res = await fetch(`http://localhost:4000/api/admin/updaterole/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    credentials: 'include'
  });

  const resData = await res.json();

  return resData;
}

// Delete Product Review --- Admin
export const fetchDeleteProductReview = async (productId, reviewId) => {
  const res = await fetch(`http://localhost:4000/api/delete/review?productId=${productId}&id=${reviewId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

