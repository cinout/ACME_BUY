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
  -

## User Roles, User Authentication, and Routes Protection

- User can be (1) Customer (2) User (3) Admin. Each is provided with separate log-in and sign-up pages.
- User is authenticated using JWT token (after log in or sign up).
- When logged in, user has access to the private routes. The private routes for different user roles are protected, which means user of role A cannot visit private routes of role B. If so, it leads to an "unauthorized" error page.
- When logged in, users have different view and access to their private routes based on their status (pending, active, deactivated). Trying to access inaccessable routes will being redirected to the correct page.
- [ ] When logged in, do not show the log-in/sign-up buttons of their role. If user manually enter the route, show a message telling them they are already logged in, and offer buttons for redirect. User must first log out to log in or sign-up again.
- [ ] When logged out, all the user authentication information, including localStorage token, cookie, and the Apollo client cache, are removed from browser.
- [ ] Check all above points for customer role.

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
