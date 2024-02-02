
// Fetch data from the API
let products = "";

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => response.json())
  .then((data) => {
    // Initial rendering
    console.log(data);

    products = data.categories;

    // Assuming that 'Men' is the default category to display initially
    showProducts("Men");
  });

// Function to toggle product cards based on category
function showProducts(category) {
  let data = products;

  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = ""; // Clear previous products

  // Check if the data is an array
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return;
  }

  // Find the category with the specified name
  const categoryData = data.find((cat) => cat.category_name === category);

  if (!categoryData) {
    console.error(`Category "${category}" not found in the data`);
    return;
  }

  // Render product cards
  categoryData.category_products.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Function to create a product card element
function createProductCard(product) {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  // Product Image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  productCard.appendChild(img);

  // Badge
  if (product.badge_text) {
    const badge = document.createElement("div");
    badge.classList.add("badge");
    badge.innerText = product.badge_text;
    productCard.appendChild(badge);
  }

  // Product Title
  const title = document.createElement("h3");
  title.innerText = product.title;
  productCard.appendChild(title);

  // Vendor
  const vendor = document.createElement("p");
  vendor.innerText = `Vendor: ${product.vendor}`;
  productCard.appendChild(vendor);

  // Price
  const price = document.createElement("p");
  price.innerText = `Price: ${product.price}`;
  productCard.appendChild(price);

  // Compare at Price
  if (product.compare_at_price) {
    const compareAtPrice = document.createElement("p");
    
    compareAtPrice.innerText = `Compare at Price: ${product.compare_at_price}`;
    productCard.appendChild(compareAtPrice);

    const discountCompareAtPrice = calculateDiscount(
      product.compare_at_price,
      product.price
    );
    const discountCompareAtPriceElement = document.createElement("p");
    discountCompareAtPriceElement.style.color = 'red'
    discountCompareAtPriceElement.innerText = `${discountCompareAtPrice}% OFF`;
    productCard.appendChild(discountCompareAtPriceElement);
  }

  // Add to Cart button
  const addToCartButton = document.createElement("button");
  addToCartButton.style.backgroundColor = 'black';
  addToCartButton.style.color = 'white';
  addToCartButton.style.borderRadius = '5px';
  addToCartButton.style.cursor = 'pointer';
  addToCartButton.innerText = "Add to Cart";
  addToCartButton.addEventListener("click", () => {
    
    console.log(`Product "${product.title}" added to cart`);
  });
  productCard.appendChild(addToCartButton);

  return productCard;
}

function calculateDiscount(originalPrice, discountedPrice) {
  const discount =
    ((originalPrice - discountedPrice) / originalPrice) * 100;
  return discount.toFixed(2); // Round to two decimal places
}
