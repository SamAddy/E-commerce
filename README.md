# E-commerce Website

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)
![Material-UI](https://img.shields.io/badge/MUI-v5-orange)

This is an E-commerce project built with TypeScript, redux, react and SASS and MUI library. This project is all about unleashing the power of APIs and providing an immersive shopping experience. The data was pulled from [Platzi Fake API ](https://fakeapi.platzi.com/). See the site in action [here](https://shop-goodies.netlify.app/).

## Features

* <b>Login</b> - Both customers and administrators can log in to view their respective profiles.
* <b>Register</b> - Users can register on the website to start shopping.
* <b>Product Cart</b> - Add products to your cart while shopping.
* <b>Product Sorting</b> Sort products by price, name, and category for easy browsing.
* <b>Product Search</b> - Search for specific products using keywords or other relevant information.
* <b>Admin Capabilities</b> - Admin has special privileges such as updating products, adding new products, deleting products, and managing categories.
* <b>Pagination</b> - Implement pagination to display products in smaller, manageable chunks.
* <b>Context API</b> Utilize the Context API to provide a customizable mode feature, enabling users to switch between light mode and dark mode.

## Test Accounts

<b>Admin</b>
* Email: admin@mail.com 
* Password: admin123

<b>Customer</b>
* Emails: maria@mail.com 
* Password: 12345

## Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   │   favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── _redirects
│   └── index.html
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ThemeSwitcher.tsx
|   ├── pages
|   │   ├── CategoryProducts.tsx
|   │   ├── HomePage.tsx
|   │   ├── LandingPage.tsx
|   │   ├── LoginPage.tsx
|   │   ├── NotFoundPage.tsx
|   │   ├── ProductPage.tsx
|   │   ├── ProfilePage.tsx
|   │   └── RegisterPage.tsx
│   ├── hooks
│   │   ├── useActionDispatch.ts
│   │   ├── useDebounce.ts
│   │   └── useSelectorHook.ts
│   ├── index.tsx
│   ├── redux
│   │   ├── reducers
|   |   |   ├── cartegoriesReducer.ts
│   │   │   ├── cartReducer.ts
│   │   │   ├── productsReducer.ts
│   │   │   └── usersReducer.ts
│   │   └──  store.ts  
│   ├── styles
|   │   ├───component
|   │   │   ├── CustomBtn.tsx
|   │   │   └── SearchWrapper.tsx
|   │   │
|   │   ├───page
|   │   │   ├── _footer.scss
|   │   │   ├── _header.scss   
|   │   │   ├── _hompage.scss
|   │   │   ├── _landingpage.scss
|   │   │   ├── _loginpage.scss
|   │   │   ├── _notfound.scss
|   │   │   └───_productpage.scss
|   │   └───variables
|   │       ├── _colors.scss
|   │       ├── _fonts.scss
|   │       └── _spaces.scss
|   ├───test
|   │   ├───data
|   │   │    ├── cart.ts
|   │   │    ├── cartegories.ts
|   │   │    ├── products.ts
|   │   │    └── users.ts
|   │   │
|   │   ├───mock
|   │   │    ├── productServer.ts
|   │   │    └── userServer.ts
|   │   │
|   │   ├───reducers
|   │   │    ├── cartReducer.test.ts
|   │   │    ├── productsReducer.test.ts
|   │   │    └── usersReducer.test.ts
|   │   │
|   │   └───shared
|   │         └── store.ts
|   │
|   ├───theme
|   │       ThemeContext.tsx
│   └── types
│      ├── Cart.ts
│       ├── Category.ts
│       ├── CreateProduct.ts
│       ├── Error.ts
│       ├── Product.ts
│       ├── ProductUpdate.ts
│       └── User.ts
└── tsconfig.json
```

## Instruction to start the project
Clone the repository to your local machine using the command 

```
    https://github.com/SamAddy/fs15_frontend-project.git
```

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
