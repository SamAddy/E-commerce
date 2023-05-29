# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)
![Material-UI](https://img.shields.io/badge/MUI-v5-orange)

This an E-commerce project built with TypeScript, redux, react and SASS and MUI. The data was pulled from this API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). Click [here](https://shop-goodies.netlify.app/) to view it live.

## Features
* Login - customer and admin can login to view their profile.
* Register - users can register to do shopping on this site.
* You may add products to cart while shopping.
* Sort products by price, name and category
* Profile page - Admin has the right to update products, add products, delete product and also add new categories.
* Context API for switching

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
