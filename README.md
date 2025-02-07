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
- react-hook-form validation with customized file-type input (solution: see CategoryDialog.tsx)
- display error separately for each image in multiple file input (solution: show file names in the error message)
- authentication security, store in cookie or localStorage
- in the forms, image can be either string (read from server) or File ()

## 🦄 Unique Features

- show discounted price when set discount
- carefully trim long strings
- nice hover effect when hover onto images and select delete
- modular, all reusable features are separately stored
- elegantly handle single and multiple file upload
- lazy loading pages
- Route protection based on user role
- Loading page, unauthorized page
- different seller views(UI) based on seller's status (active/deactivated/pending)
- Seller's view is based on their status
- All forms are validated with react-hook-form

## 🦄 Attention to Details

- Doesn't allow dialog to close during form submitting
- Disable the Update button if the form fields has not changed. (isDirty does not detect file change, need to set shouldDirty:true when image field is updated)

## User Roles, User Authentication, and Routes Protection

- User can be (1) Customer (2) Seller (3) Admin. Each is provided with separate log-in and sign-up pages.
- User is authenticated using JWT token (after log in or sign up).
- When logged in, user has access to the private routes. The private routes for different user roles are protected, which means user of role A cannot visit private routes of role B. If so, it leads to an "unauthorized" error page.
- When logged in, sellers have different view and access to their private routes based on their status (pending, active, deactivated). Trying to access inaccessable routes will being redirected to the correct page.
- [ ] When logged in, user has no access to all the log-in/sign-up pages of their role (either through user interface or manually entering the routes). If user manually enter the route, redirect them to the log-out page. Use must first log out to access those log-in/sign-up pages of their role.
- [ ] When logged out, all the user authentication information, including localStorage token, cookie, and the Apollo client cache, are removed from browser.
  - Reset the cache using the resetStore method of an Apollo client object
- [ ] Check all above points for customer role.

## 📋 Coming Next

- [ ] how to handle manually put-in routes that are not serviced by our site?
- [ ] A nice default reminder when user puts in wrong route
- [ ] compare apexcharts with Chart.js, D3.js
- [ ] Content Security Policy (CSP) error with sign up page
- [ ] check if every page is responsove
- [ ] When to add imgs in src/asset, and when in public/?
- [ ] Sellor Request and Live Chat sections should show notification icon
- [ ] Email Validation on creating account
- [ ] Maybe add phone in application form as well????
- [ ] Need a settings page for users/sellers to edit their profile
- [ ] login/register page should provide a goback button
- [ ] Do I need to use React Query ?
- [ ] Think about what the seller can see when they are deactivated
- [ ] How to elegantly handle the interface when accessToken expired?
- [ ] consider using auth0 for authentication
- [ ] Do i need a "refresh token" to enhance security? see https://www.cyberchief.ai/2023/05/secure-jwt-token-storage.html
- [ ] WHere to put admin sign up???
