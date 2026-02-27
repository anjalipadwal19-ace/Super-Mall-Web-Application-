# Super-Mall-Web-Application-

Project Overview
SuperMall is a web-based shopping management system developed using HTML, CSS, JavaScript, and Firebase.
The system provides separate dashboards for Admin and User roles.
The admin can manage shops, products, and monitor sales analytics, while Users can browse shops, view products, compare items, add products to cart, and generate bills with downloadable invoices.
The application provides secure authentication, real-time database management, and an interactive shopping experience.
________________________________________
Files in the Project
• login.html – Login and registration interface
• login.css – Styling for login page
• login.js – Handles authentication and role-based login
• user.html – User shopping dashboard
• user.css – User interface styling
• user.js – Shop browsing, cart, billing and invoice generation
• admin.html – Admin dashboard interface
• admin.css – Admin panel styling
• admin.js – Shop, product and analytics management
• firebase.js – Firebase configuration and database connection
________________________________________
How to Run the Application
1.	Download or clone the project folder.
2.	Open the project using VS Code or any editor.
3.	Create a Firebase project from Firebase Console.
4.	Enable:
o	Authentication (Email & Password)
o	Cloud Firestore Database
5.	Update Firebase configuration inside firebase.js file.
6.	Run the project using Live Server or browser.
7.	Open login.html to start the application.
________________________________________
Application Modules
Admin Module
• Add new shops
• Manage shop details
• Add products to shops
• Delete shops
• View analytics dashboard
• Monitor total orders and revenue
User Module
• Login and secure authentication
• View available shops
• Filter shops by category
• View shop-wise offers
• View products of selected shop
• Product comparison feature
• Add products to cart
• Remove items from cart
• Generate bill and checkout
• Download PDF invoice
________________________________________
Application Features
• Firebase Authentication system
• Role-based login (Admin / User)
• Real-time Firestore database integration
• Shop and product management
• Product comparison system
• Shopping cart functionality
• Order storage in database
• PDF invoice generation using jsPDF
• Analytics dashboard using Chart.js
• Responsive modern UI design
• Secure session handling
________________________________________
Explanation of Code
HTML
HTML files create login page, admin dashboard, user dashboard, product display sections, and billing interface.
CSS
CSS provides responsive layout, gradient themes, card-based design, animations, and modern user interface styling.
JavaScript
JavaScript manages:
• Authentication and session handling
• Role-based navigation
• Shop and product loading
• Cart management
• Product comparison
• Billing and checkout
• Invoice generation
Firebase
Firebase is used for:
• User authentication
• Firestore database storage
• Shops and products management
• Orders storage
• Real-time data access
________________________________________
Database Structure (Firestore)
users
→ userId
  role: admin / user
shops
→ shopId
  name
  category
  floor
  offer
shops → products
→ productId
  name
  price
  features
  offer
orders
→ orderId
  userId
  items
  amount
  date
________________________________________
Testing
The system was tested for:
• User registration and login
• Admin and user role validation
• Shop creation and deletion
• Product addition
• Cart operations
• Order placement
• Invoice generation
• Analytics calculation
• Session authentication
________________________________________
Conclusion
The SuperMall Web Application demonstrates implementation of a complete shopping management system using modern web technologies and cloud database services.
The project helped in understanding:
• Firebase Authentication
• Cloud Firestore Database
• Role-based access control
• Client-side and database interaction
• Real-world e-commerce workflow
