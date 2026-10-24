# Koverx Checkout

Checkout for **Koverx**. Shoppers choose a treatment, enter contact and shipping details, apply a coupon when one is offered, pay, and reach the order confirmation page.

The repository name is `koverxcheckout` because this project is the checkout code for Koverx.

## Stack

- React
- Create React App
- React Router
- Axios
- Tailwind CSS
- styled-components
- React Hot Toast
- Stripe

## Requirements

- Node.js 18 or later
- npm

## Run locally

```bash
git clone https://github.com/shiv-dev-01/koverxcheckout.git
cd koverxcheckout
npm install
npm start
```

The dev server opens at http://localhost:3000.

## Scripts

| Command | What it runs |
| --- | --- |
| `npm run start` | `react-scripts start` |
| `npm run build` | `react-scripts build` |
| `npm run test` | `react-scripts test` |
| `npm run eject` | `react-scripts eject` |

## Project files

- `public`
- `src`
- `.env`
- `.gitignore`
- `package-lock.json`
- `package.json`
- `tailwind.config.js`

## Configuration

API hosts and site settings are in `src\utils\Constant.js`.
Files named `.env` stay on your machine and are not part of this repository. Use `.env.example` when the project includes one.

