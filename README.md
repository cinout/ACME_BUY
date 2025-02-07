# Project: []

## 🙊 Description

This is a template for Vite + ReactJS + TypeScript + TailwindCSS + PostCSS

## 🏃‍➡️ How to Run

- Use `npm install` to install required packages.
- Use `npm run dev` to start the website.

## 🥞 Tech Stack

- **Bundler**: Vite
- **CSS**: TailwindCSS, PostCSS
- **JS Framework**: ReactJS, Redux
- **Type Check**: TypeSript
- **API Fetch**: Axios
- **Charts**: apexcharts react-apexcharts
- **Real-time Chat**: Socket.io
- **Animation**: motion
- **Icons**: react-icons, react-spinners, headlessui
- **Notification**: react-hot-toast
- **Efficient Rendering Large Dataset**: react-window
- **Form Validation**: react-hook-form
- **Other Packages**: jwt-decode, date-fns (replace moment), faker, react-tooltip, country-state-city (dropdown options)

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

## 🦄 Attention to Details

- Doesn't allow dialog to close during form submitting
- Disable the Update button if the form fields has not changed. (isDirty does not detect file change, need to set shouldDirty:true when image field is updated)

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

## 📋 Coming Next

- [ ] Use https://react-hook-form.com/get-started for form validation
- [ ] when logput, removes the token from local storage and resets the cache of the Apollo client because some queries might have fetched data to cache, which only logged-in users should have access to. reset the cache using the resetStore method of an Apollo client object
- [ ] what to do with login/signup pages when user already logged in? probbaly remove the access to them until user logs out. And also, during logged in state, the signup/login routes should redirect you to log out page.

- [ ] how to handle manually put-in routes that are not serviced by our site?
- [ ] jsonwebtoken for server side (jwt-decode for client side)
- [ ] compare apexcharts with Chart.js, D3.js
- [ ] Content Security Policy (CSP) error with sign up page
- [ ] Is other better way to handle forms?
- [ ] check if every page is responsove
- [ ] When to add imgs in src/asset, and when in public/?
- [ ] Sellor Request and Live Chat sections should show notification icon
- [ ] A nice default reminder when user puts in wrong route
- [ ] Email Validation on creating account
- [ ] Maybe add phone in application form as well????
- [ ] Need a settings page for users/sellers to edit their profile
- [ ] login/register page should provide a goback button
- [ ] Do I need to use React Query ?
- [ ] Think about what the seller can see when they are deactivated
- [ ] How to elegantly handle the interface when accessToken expired?
- [ ] consider using auth0 for authentication
- [ ] Do i need a "refresh token" to enhance security? see https://www.cyberchief.ai/2023/05/secure-jwt-token-storage.html
- [ ] Don't show sign in/ sign up options (in UI) when user is already logged in. If user goes to the login/signup page by manually typing in the URL, redirect them to the dashboard.
- [ ] WHere to put admin sign up???
