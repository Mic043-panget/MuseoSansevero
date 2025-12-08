# Implementation Plan

- [x] 1. Configure backend CORS and environment settings





  - Create `laravel-backend/config/cors.php` configuration file with allowed origins, methods, and headers


  - Update `laravel-backend/.env` to include `FRONTEND_URL=http://localhost:5173` and `SANCTUM_STATEFUL_DOMAINS=localhost:5173`
  - Register CORS middleware in `laravel-backend/bootstrap/app.php` or middleware configuration

  - _Requirements: 1.4, 1.5, 5.2, 5.3_



- [ ] 2. Set up frontend API client and environment configuration
  - Create `react-frontend/.env` file with `VITE_API_URL=http://localhost:8000/api`

  - Create `react-frontend/src/api/client.js` with Axios instance configured with base URL, headers, and timeout


  - Implement request interceptor to attach authentication token from localStorage


  - Implement response interceptor to handle 401 errors globally



  - _Requirements: 1.1, 1.2, 2.4, 2.6, 5.1, 5.5_

- [x] 3. Create frontend authentication service






  - Create `react-frontend/src/services/authService.js` with login, register, logout methods
  - Implement token storage methods (getToken, setToken, clearToken)
  - Implement isAuthenticated check
  - _Requirements: 2.1, 2.2, 2.3_




- [ ] 4. Create backend Car model, migration, and seeder
  - Create migration for `cars` table with columns: name, price, image, specs, year, brand
  - Create `Car` model in `laravel-backend/app/Models/Car.php`
  - Create seeder to populate cars table with sample data from frontend BASE_CARS array
  - Run migration and seeder


  - _Requirements: 3.2, 3.4_

- [ ] 5. Create backend Car API controller and routes
  - Create `laravel-backend/app/Http/Controllers/Api/V1/CarController.php`
  - Implement `index()` method to return paginated car list with JSON response
  - Implement `show($id)` method to return single car details
  - Implement `search(Request $request)` method for searching cars by name, brand, or year
  - Add routes in `laravel-backend/routes/api.php` for GET `/cars`, GET `/cars/{id}`, GET `/cars/search`
  - _Requirements: 3.1, 3.2, 3.4_

- [ ] 6. Create frontend car service and integrate with components
  - Create `react-frontend/src/services/carService.js` with getCars, getCarById, searchCars methods
  - Update `react-frontend/src/App.jsx` to fetch cars from API instead of using hardcoded BASE_CARS
  - Add loading state and error handling for car data fetching



  - Update car listing to display API data
  - _Requirements: 3.1, 3.3, 3.4, 3.5_

- [ ] 7. Create backend Order models, migrations, and relationships
  - Create migration for `orders` table with columns: user_id, customer_name, customer_email, customer_phone, total_amount, status
  - Create migration for `order_items` table with columns: order_id, car_id, quantity, price
  - Create `Order` model with relationship to OrderItem and User
  - Create `OrderItem` model with relationships to Order and Car
  - Run migrations
  - _Requirements: 4.2, 4.3_



- [ ] 8. Create backend Order API controller with validation
  - Create `laravel-backend/app/Http/Controllers/Api/V1/OrderController.php`
  - Implement `store(Request $request)` method with validation rules for customer info and order items
  - Implement database transaction to create order and order items atomically
  - Implement `index()` method to return authenticated user's orders



  - Implement `show($id)` method with authorization check
  - Add routes in `laravel-backend/routes/api.php` for POST `/orders`, GET `/orders`, GET `/orders/{id}` with auth middleware
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 9. Create frontend order service and integrate with order form
  - Create `react-frontend/src/services/orderService.js` with createOrder, getOrders, getOrderById methods
  - Update `react-frontend/src/pages/user/OrderPage.jsx` to submit orders to API
  - Handle validation errors from backend and display field-specific error messages
  - Display success message with order ID on successful submission
  - Handle network errors with user-friendly messages
  - _Requirements: 4.1, 4.5, 4.6_

- [ ] 10. Update Vite proxy configuration for development
  - Update `react-frontend/vite.config.js` to add proxy configuration for `/api` requests to Laravel backend
  - Configure proxy to handle cookies and CORS in development environment
  - _Requirements: 1.1, 5.3, 5.4_
