# GoGrain

GoGrain is a platform that connects farmers directly with consumers, eliminating middlemen and ensuring fair pricing. The platform consists of three portals:

1. **Admin Portal** - For managing farmers and overseeing the platform.
2. **Farmer Portal** - For farmers to manage their sales, orders, logistics, and payments.
3. **Customer Website** - For consumers to browse, purchase, and track their orders.

---

## 🚀 Features

### 🌟 Admin Portal
- Secure login for platform administrators.
- Add, edit, delete farmers.
- View and manage all farmers.
- High-level analytics for platform performance.

### 🌱 Farmer Portal
- Secure login for farmers.
- Manage products (add/update stock & price).
- View and fulfill customer orders.
- Handle logistics and delivery.
- Track earnings and payments.
- Access customer support.

### 🛒 Customer Website
- Browse and search for fresh produce.
- Add products to cart and checkout.
- Manage orders and track deliveries.
- Wishlist feature for saving favorite products.
- Secure payment integration.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / PostgreSQL
- **Authentication:** JWT-based authentication
- **Hosting:** Vercel / AWS

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB/PostgreSQL setup (if using a database)

### Installation
```sh
# Clone the repository
git clone https://github.com/satwikkini-01/WeWinners-Web27.git
cd gograin

# Install dependencies for all portals
cd admin && npm install
cd ../farmer && npm install
cd ../customer && npm install
```

### Running the Project
```sh
# Start Admin Portal
cd admin && npm run dev

# Start Farmer Portal
cd ../farmer && npm run dev

# Start Customer Website
cd ../customer && npm run dev
```

---

## 🔗 API Integrations
- **Payment Gateway:** TBD (e.g., Razorpay, Stripe, Paytm)
- **Logistics API:** TBD (e.g., Delhivery, Shiprocket)

---

## 🎯 Future Enhancements
- AI-based pricing recommendations for farmers.
- Integration with government agricultural schemes.

---

## 📜 License
This project is licensed under the MIT License.

---

## 🤝 Contributors
- **Satwik Kini** - [GitHub Profile](https://github.com/satwikkini-01)
- **Chetan C Hiremath** - [GitHub Profile](https://github.com/chetanchiremath)
- **Rishikesh C S** - [GitHub Profile](https://github.com/rishikesh221B)
- **V Vishwas Joshi** - [GitHub Profile](https://github.com/VVishwasJoshi)
---

Happy Farming! 🌾🚜
