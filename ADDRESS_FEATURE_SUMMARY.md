# Address Management Feature - Implementation Summary

## ✅ What's Been Implemented

### React App (FrontEnd/src/)

**1. New Page: My Addresses (`/my-addresses`)**
- Full CRUD operations for addresses
- Add, edit, delete addresses
- Set default address
- Address fields: Label (Home/Work/Other), Street, City, State, Postal Code, Country, Delivery Instructions
- Beautiful UI with icons and cards
- Stores addresses in localStorage with key `freshmart_addresses`

**2. Updated Files:**
- `App.jsx` - Added route for `/my-addresses`
- `Navbar.jsx` - Added "Addresses" link when user is logged in
- `Checkout.jsx` - Added address selection before customer info form
  - Shows all saved addresses
  - Radio button selection
  - Auto-selects default address
  - Link to add new address

### Features:
- ✅ Multiple addresses per user
- ✅ Set default address
- ✅ Address labels (Home, Work, Other)
- ✅ Delivery instructions
- ✅ Edit/Delete addresses
- ✅ Beautiful card-based UI
- ✅ Dark mode support
- ✅ Responsive design

## 📋 To Add to demo.html

Since demo.html is a single-file application, here's what needs to be added:

### 1. Add MyAddressesPage Component (after RegisterPage, before Footer)

```javascript
// My Addresses Page Component
const MyAddressesPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India',
        is_default: false,
        delivery_instructions: ''
    });

    useEffect(() => {
        const savedAddresses = JSON.parse(localStorage.getItem('freshmart_addresses')) || [];
        setAddresses(savedAddresses);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedAddresses;
        
        if (editingIndex !== null) {
            updatedAddresses = addresses.map((addr, index) => 
                index === editingIndex ? { ...formData, id: addr.id } : addr
            );
        } else {
            const newAddress = { ...formData, id: Date.now() };
            updatedAddresses = [...addresses, newAddress];
        }

        if (formData.is_default) {
            updatedAddresses = updatedAddresses.map((addr, index) => ({
                ...addr,
                is_default: editingIndex !== null ? index === editingIndex : addr.id === updatedAddresses[updatedAddresses.length - 1].id
            }));
        }

        setAddresses(updatedAddresses);
        localStorage.setItem('freshmart_addresses', JSON.stringify(updatedAddresses));
        
        setFormData({
            label: 'Home',
            street: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'India',
            is_default: false,
            delivery_instructions: ''
        });
        setShowAddForm(false);
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setFormData(addresses[index]);
        setShowAddForm(true);
    };

    const handleDelete = (index) => {
        if (confirm('Are you sure you want to delete this address?')) {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
            localStorage.setItem('freshmart_addresses', JSON.stringify(updatedAddresses));
        }
    };

    const handleSetDefault = (index) => {
        const updatedAddresses = addresses.map((addr, i) => ({
            ...addr,
            is_default: i === index
        }));
        setAddresses(updatedAddresses);
        localStorage.setItem('freshmart_addresses', JSON.stringify(updatedAddresses));
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                            📍 My Addresses
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your delivery addresses
                        </p>
                    </div>
                    {!showAddForm && (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="btn-primary px-6 py-3"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add New Address
                        </button>
                    )}
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Form fields - same as React version */}
                            {/* ... (copy from MyAddresses.jsx) ... */}
                        </form>
                    </div>
                )}

                {/* Address List */}
                {addresses.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-map-marked-alt text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No addresses yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Add your first delivery address to get started
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {addresses.map((address, index) => (
                            <div
                                key={address.id}
                                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border-2 transition-all ${
                                    address.is_default
                                        ? 'border-primary shadow-primary/20'
                                        : 'border-white/20 hover:border-primary/50'
                                }`}
                            >
                                {/* Address card content - same as React version */}
                                {/* ... (copy from MyAddresses.jsx) ... */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
```

### 2. Update Navbar Component

Add "Addresses" link when user is logged in:

```javascript
{user && (
    <button 
        onClick={() => setCurrentPage('addresses')}
        className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
    >
        <i className="fas fa-map-marker-alt mr-1"></i>
        Addresses
    </button>
)}
```

### 3. Update CheckoutPage Component

Add address selection before customer info:

```javascript
{/* Delivery Address Selection */}
<div className="card">
    <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold dark:text-white flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-primary"></i>
            Delivery Address
        </h3>
        <button
            onClick={() => setCurrentPage('addresses')}
            className="text-sm text-primary hover:text-primary/80 font-semibold"
        >
            <i className="fas fa-plus mr-1"></i>
            Add New Address
        </button>
    </div>

    {savedAddresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
            <i className="fas fa-map-marked-alt text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                No saved addresses found
            </p>
            <button
                onClick={() => setCurrentPage('addresses')}
                className="btn-primary text-sm px-6 py-2"
            >
                Add Delivery Address
            </button>
        </div>
    ) : (
        <div className="space-y-3">
            {savedAddresses.map((address) => (
                <div
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAddressId === address.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-slate-600 hover:border-primary/50'
                    }`}
                >
                    {/* Address display - same as React version */}
                </div>
            ))}
        </div>
    )}
</div>
```

### 4. Update App Component Return Statement

Add the addresses page route:

```javascript
{currentPage === 'addresses' && <MyAddressesPage />}
```

## 🎯 How It Works

1. **User Registration** → User can browse and shop
2. **Add to Cart** → Requires login
3. **Go to Checkout** → Can select from saved addresses or add new one
4. **My Addresses Page** → Manage all addresses (add/edit/delete/set default)
5. **Place Order** → Uses selected address for delivery

## 📦 Data Structure

```javascript
// localStorage key: 'freshmart_addresses'
[
  {
    id: 1675234567890,
    label: "Home",
    street: "123 Main Street, Apt 4B",
    city: "Mumbai",
    state: "Maharashtra",
    postal_code: "400001",
    country: "India",
    is_default: true,
    delivery_instructions: "Ring the doorbell twice"
  }
]
```

## 🚀 Next Steps (Backend Integration)

When you're ready to connect to the backend:

1. Create `/api/addresses` endpoints (GET, POST, PUT, DELETE)
2. Link addresses to user_id
3. Replace localStorage with API calls
4. Add address validation
5. Implement address verification service (optional)

## ✨ Benefits

- Better user experience
- Faster checkout
- Multiple delivery locations
- Professional e-commerce flow
- Ready for backend integration
