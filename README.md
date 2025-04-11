# Project: []

## 🙊 Description

...

## 🏃‍➡️ How to Run

- Use `npm install` to install required packages.
- Use `npm run dev` to start the website.

## 🥞 Tech Stack

- **Bundler**: Vite
- **CSS**: TailwindCSS, PostCSS
- **JS Framework**: ReactJS, Redux
- **Type Check**: TypeSript
- **API Fetch**: Axios, graphql (Apollo)
- **Charts**: apexcharts react-apexcharts
- **Real-time Chat**: Socket.io
- **Animation**: motion
- **Icons**: react-icons, react-spinners, headlessui
- **Notification**: react-hot-toast
- **Efficient Rendering Large Dataset**: react-window
- **Form Validation**: react-hook-form
- **Other Packages**: jwt-decode, date-fns (replace moment), faker, react-tooltip, country-state-city (dropdown options)

## 🏋️‍♀️ Challenges Faced

- ...
- Pagination
- Routing and route protection
- hover show information (solution: resort to react-tooltip)
- dropdown UI in chat section ()
- react-hook-form validation with customized file-type input (solution: see GenreDialog.tsx)
- display error separately for each image in multiple file input (solution: show file names in the error message)
- authentication security, store in cookie or localStorage
- in the forms, image can be either string (read from server) or File ()
- log out/ sign in, conflict between user status and navigate (redirects)
- RHF's defaultValue in profile section is only initialized once, but need to be updated. Use reset({variable:watch(variable)}) to manually update it.
- Search function

## 🦄 Unique Features

- show discounted price when set discount
- carefully trim long strings
- nice hover effect when hover onto images and select delete
- modular, all reusable features are separately stored
- elegantly handle single and multiple file upload
- lazy loading pages
- Route protection based on user role
- Loading page, unauthorized page
- different user views(UI) based on user's status (active/deactivated/pending)
- User's view is based on their status
- All forms are validated with react-hook-form

## 🦄 Attention to Details

- Doesn't allow dialog to close during form submitting
- Disable the Update button if the form fields has not changed. (isDirty does not detect file change, need to set shouldDirty:true when image field is updated)
- When logged in and if user manually enter the login or signup route of their role, show a message telling them they are already logged in, and offer button for redirect.
- Show loading page when preparing the dashboard.
- Calculate the discounted price for customer.
- Show icon for number of pending users in Admin/Users tab
- detect whether image is loading, and if so, show loader (check .onCOmplete attribute, and write custom hook)
- Every page is responsive
- All reusable components are modularized, including icons, ....
- Handle invalid values in URL in pagination
- check stock when add products to shopping cart
- shopping cart page:
  - If stock is reduced and user required quantity exceeds the current stock, a warning is shown under both the product and the checkout button, to prevent further action.
  - The stock is checked another time when click on Checkout button in case the stock is changed during the process
- payment/order/checkout page:
  - order is initiated from clicking on the "Go to checkout" button on the cart page.
  - All form fields are validated, especially, the card inputs are cleaned and properly validated.
  - Links in checkout page will open in a new tab, to avoid interrupting the current checkout session.
  - Check stock levels again when (1) enter the pending order; (2) user click the pay now button. If stock is now lower than required quantity, show warning to ask user to adjust quantity.
  - check price change before payment
  - Use a protected route: Ensure only authenticated users can access it. Redirect unauthenticated users to login page
  - verify that orderId belongs to userId on the server. If not, redirect to unauthorized page
  - if the order is not pending (meaning it has been processed already), redirect to user's order history page
  - Remove items from the cart after payment is completed.
  - Reduce the stock of order items after payment is completed.
  -
- orderSuccess page:
  - same security checks as above
- Collection page's filters are open by default on large screen, closed by default on small screen
- After order is Paid, record the snapshot of the product's price & discount, and show this price afterwards in order history
- When product is deleted/removed by seller, the server soft-delete it, so that product is still visiable to customers who ordered it before. However, the soft-deleted product won't appear in seller's product list, and on the product's page, a warning is shown to indicate the product has been removed.
- seller cannot buy or wishlist their own products
- A nice unfound page when user hits an url that is not specified in our routes.
- If wrong shop/product id is provided in url, an unfound message is shown in the page.
- If wrong order id is provided in the url, show unauthorized page.
- When create new genre, its name is checked with exisiting ones to avoid duplication

## User Roles, User Authentication, and Routes Protection

- User can be (1) Customer (2) User (3) Admin. Each is provided with separate log-in and sign-up pages.
- User is authenticated using JWT token (after log in or sign up).
- When logged in, user has access to the private routes. The private routes for different user roles are protected, which means user of role A cannot visit private routes of role B. If so, it leads to an "unauthorized" error page.
- When logged in, users have different view and access to their private routes based on their status (pending, active, deactivated). Trying to access inaccessable routes will being redirected to the correct page.
- [ ] When logged in, do not show the log-in/sign-up buttons of their role. If user manually enter the route, show a message telling them they are already logged in, and offer buttons for redirect. User must first log out to log in or sign-up again.
- [ ] When logged out, all the user authentication information, including localStorage token, cookie, and the Apollo client cache, are removed from browser.
- [ ] Check all above points for customer role.

## URL params

- query
  - On initial load, the search query will read value from url. If not available, then use empty string
  - Users can type search value in the search bar without triggering url change.
  - When users hit ENTER key or click on the search icon, url will gets updated, and other params (filters, page, sorting) will be removed.
  - When query value in url gets updated (either caused by user input or clicking on navigation bar items), the value in search bar also gets updated
- page
  - when any filter value (see src/views/main/CollectionPage/index.tsx) is updated, page is reset to 1
- filters (genre, format, year, grading, region)
  - click on their option in navigation bar will clear other params in the url, and only the current filter value is present
  - click on their option in collection page's Filters section will add the filter to the current url
- sorting
  - default value is "featured"

## 📋 Coming Next

- [ ] how to handle manually put-in routes that are not serviced by our site?
- [ ] deactivated sellers products should not show in website
- [ ] Show buyer comments on shop's page
- [ ] each product can have up to 3 genres
- [ ] Email Verfication after signup
- [ ] Currently, when user is not logged in and refresh page, three API erros showing.
- [ ] A nice default reminder when user puts in wrong route
- [ ] compare apexcharts with Chart.js, D3.js
- [ ] Content Security Policy (CSP) error with sign up page
- [ ] check if every page is responsove
- [ ] When to add imgs in src/asset, and when in public/?
- [ ] Sellor Request and Live Chat sections should show notification icon
- [ ] Email Validation on creating account
- [ ] Maybe add phone in application form as well????
- [ ] Need a settings page for users/users to edit their profile
- [ ] login/register page should provide a goback button
- [ ] Do I need to use React Query ?
- [ ] Think about what the user can see when they are deactivated
- [ ] How to elegantly handle the interface when accessToken expired?
- [ ] consider using auth0 for authentication
- [ ] Do i need a "refresh token" to enhance security? see https://www.cyberchief.ai/2023/05/secure-jwt-token-storage.html
- [ ] WHere to put admin sign up???
- [ ] where for the user to upload their images?
- [ ] all the pages where a lot of items are displayed, we should provide search and filter functions
- [ ] move FormInputProps and Entity to their gql file
- [ ] Payment info for user, customer
- [ ] How to create Admin? and remeber that admin needs image by default
- [ ] User and customer needs button to remove themselves from the website
- [ ] Support track list info adding
- [ ] update signupMethod for Google/Facebook login
- [ ] support video upload
- [ ] customer/seller can rate each other if they arrived at an order
- [ ] seller is limited to changing price/discount once a week
- [ ] Password change in Udemy Section 75
- [ ] many-to-many:
  - (1) genre vs product? [Maybe]
  - (2) user vs wishlist? [Maybe]
  - (3) product vs order? [NO, because order takes a snapshot of the product]
- [ ] Home page's DisplayRows can use different layout (left/right) based on odd/even index
- [ ] proper pagination for all sections using pages
- [ ] change password / forget password / email verification
