export const PRODUCTS = [
  { 
    id: 1, 
    name: 'Organic Avocados', 
    price: 299, 
    originalPrice: 399,
    category: 'Fruits',
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format',
    badge: 'Organic',
    description: 'Fresh, creamy avocados perfect for salads and toast. Rich in healthy fats and nutrients.',
    details: {
      origin: 'Mexico',
      weight: '500g (4-5 pieces)',
      shelf_life: '3-5 days',
      storage: 'Room temperature until ripe, then refrigerate',
      nutrients: ['Healthy Fats', 'Fiber', 'Potassium', 'Vitamin K', 'Vitamin E']
    },
    reviews_data: [
      { name: 'Priya S.', rating: 5, comment: 'Amazing quality! Very fresh and creamy.', date: '2 days ago' },
      { name: 'Rahul M.', rating: 4, comment: 'Good avocados, delivered on time.', date: '1 week ago' },
      { name: 'Sneha K.', rating: 5, comment: 'Perfect ripeness, will order again!', date: '2 weeks ago' }
    ]
  },
  { 
    id: 2, 
    name: 'Premium Salmon Fillet', 
    price: 899, 
    originalPrice: 1199,
    category: 'Seafood',
    rating: 4.9,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&auto=format',
      'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&auto=format',
    badge: 'Premium',
    description: 'Wild-caught Atlantic salmon, rich in omega-3 fatty acids and premium quality.',
    details: {
      origin: 'Atlantic Ocean',
      weight: '1kg fillet',
      shelf_life: '2-3 days refrigerated',
      storage: 'Keep refrigerated at 0-4°C',
      nutrients: ['Omega-3', 'Protein', 'Vitamin D', 'B Vitamins', 'Selenium']
    },
    reviews_data: [
      { name: 'Chef Kumar', rating: 5, comment: 'Excellent quality salmon, perfect for sashimi.', date: '1 day ago' },
      { name: 'Maria L.', rating: 5, comment: 'Fresh and delicious, highly recommended!', date: '3 days ago' }
    ]
  },
  { 
    id: 3, 
    name: 'Artisan Sourdough Bread', 
    price: 199, 
    originalPrice: 249,
    category: 'Bakery',
    rating: 4.7,
    reviews: 203,
    images: [
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&auto=format',
    badge: 'Fresh',
    description: 'Handcrafted sourdough with perfect crust and tangy flavor.',
    details: {
      origin: 'Local Bakery',
      weight: '800g loaf',
      shelf_life: '3-4 days',
      storage: 'Store in cool, dry place',
      nutrients: ['Complex Carbs', 'Fiber', 'B Vitamins', 'Iron', 'Folate']
    },
    reviews_data: [
      { name: 'Food Lover', rating: 5, comment: 'Best sourdough in the city!', date: '1 day ago' },
      { name: 'Baker Jane', rating: 4, comment: 'Great texture and flavor.', date: '2 days ago' }
    ]
  },
  { 
    id: 4, 
    name: 'Banana', 
    price: 449, 
    originalPrice: 599,
    category: 'Fruits',
    rating: 4.6,
    reviews: 67,
    images: [
      'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&auto=format',
      'https://images.unsplash.com/photo-1609501676725-7186f734b2e0?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&auto=format',
    badge: 'Exotic',
    description: 'Sweet and refreshing tropical superfruit with unique appearance.',
    details: {
      origin: 'Vietnam',
      weight: '2 pieces (400g)',
      shelf_life: '5-7 days',
      storage: 'Refrigerate when ripe',
      nutrients: ['Vitamin C', 'Iron', 'Magnesium', 'Antioxidants', 'Fiber']
    },
    reviews_data: [
      { name: 'Tropical Fan', rating: 5, comment: 'Love the unique taste and texture!', date: '2 days ago' },
      { name: 'Health Nut', rating: 4, comment: 'Great superfruit, very fresh.', date: '1 week ago' }
    ]
  },
  { 
    id: 5, 
    name: 'Free-Range Chicken Breast', 
    price: 599, 
    originalPrice: 799,
    category: 'Meat',
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format',
    badge: 'Premium',
    description: 'Tender, lean chicken breast from free-range farms, perfect for healthy meals.',
    details: {
      origin: 'Local Farm',
      weight: '1kg (4-5 pieces)',
      shelf_life: '3-5 days refrigerated',
      storage: 'Keep refrigerated at 0-4°C',
      nutrients: ['High Protein', 'Low Fat', 'B Vitamins', 'Selenium', 'Phosphorus']
    },
    reviews_data: [
      { name: 'Health Cook', rating: 5, comment: 'Very tender and flavorful chicken!', date: '1 day ago' },
      { name: 'Fitness Fan', rating: 5, comment: 'Perfect for my meal prep!', date: '3 days ago' }
    ]
  },
  { 
    id: 6, 
    name: 'Organic Quinoa Bowl', 
    price: 349, 
    originalPrice: 449,
    category: 'Grains',
    rating: 4.5,
    reviews: 91,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format',
      'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format',
    badge: 'Organic',
    description: 'Protein-rich superfood grain, gluten-free and nutritious.',
    details: {
      origin: 'Peru',
      weight: '1kg package',
      shelf_life: '2 years',
      storage: 'Store in cool, dry place',
      nutrients: ['Complete Protein', 'Fiber', 'Iron', 'Magnesium', 'Folate']
    },
    reviews_data: [
      { name: 'Health Coach', rating: 5, comment: 'Great quality quinoa, very versatile!', date: '2 days ago' },
      { name: 'Fitness Fan', rating: 4, comment: 'Perfect for meal prep.', date: '1 week ago' }
    ]
  },
  { 
    id: 7, 
    name: 'Romanesco broccoli', 
    price: 399, 
    originalPrice: 499,
    category: 'Vegetables',
    rating: 4.7,
    reviews: 84,
    images: [
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&auto=format',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&auto=format',
    badge: 'Fresh',
    description: 'Striking, lime-green fractal florets with a delicate, nutty, and slightly sweet flavor, perfect for gourmet roasting or light stir-fries.',
    details: {
      origin: 'Local Farm',
      weight: '250g',
      shelf_life: '5-7 days refrigerated',
      storage: 'Keep refrigerated in paper bag',
      nutrients: ['Antioxidants', 'B Vitamins', 'Copper', 'Selenium', 'Zinc']
    },
    reviews_data: [
      { name: 'Chef Tanaka', rating: 5, comment: 'Excellent quality mushrooms!', date: '1 day ago' },
      { name: 'Home Cook', rating: 4, comment: 'Great flavor, very fresh.', date: '3 days ago' }
    ]
  },
  { 
    id: 8, 
    name: 'Artisan Cheese Selection', 
    price: 799, 
    originalPrice: 999,
    category: 'Dairy',
    rating: 4.7,
    reviews: 178,
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format',
      'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&auto=format'
    ],
    img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&auto=format',
    badge: 'Artisan',
    description: 'Curated selection of aged European cheeses for connoisseurs.',
    details: {
      origin: 'Europe',
      weight: '500g selection',
      shelf_life: '2-3 weeks refrigerated',
      storage: 'Keep refrigerated, wrap properly',
      nutrients: ['Calcium', 'Protein', 'Vitamin B12', 'Phosphorus', 'Zinc']
    },
    reviews_data: [
      { name: 'Cheese Lover', rating: 5, comment: 'Amazing variety and quality!', date: '1 day ago' },
      { name: 'Wine Pairer', rating: 4, comment: 'Perfect for wine nights.', date: '2 days ago' }
    ]
  }
]

export const CATEGORIES = [
  { name: 'Fruits', icon: '🍎', color: 'from-red-400 to-pink-500' },
  { name: 'Vegetables', icon: '🥬', color: 'from-green-400 to-emerald-500' },
  { name: 'Dairy', icon: '🥛', color: 'from-blue-400 to-cyan-500' },
  { name: 'Meat', icon: '🥩', color: 'from-red-500 to-rose-600' },
  { name: 'Seafood', icon: '🐟', color: 'from-blue-500 to-indigo-600' },
  { name: 'Bakery', icon: '🍞', color: 'from-yellow-400 to-orange-500' },
  { name: 'Grains', icon: '🌾', color: 'from-amber-400 to-yellow-600' },
  { name: 'Beverages', icon: '🥤', color: 'from-purple-400 to-violet-500' }
]

export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === 'All') return PRODUCTS
  return PRODUCTS.filter(product => product.category === category)
}

export const searchProducts = (query) => {
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )
}