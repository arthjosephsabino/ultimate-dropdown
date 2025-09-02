# Ultimate Dropdown

A modern **React + Next.js** app that allows users to select a country and its corresponding state from linked dropdowns. The app features dynamic, searchable dropdowns, a polished UI built with **TailwindCSS**, and **Google Maps integration**.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Chosen Approach](#chosen-approach)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Components](#components)
- [State Management](#state-management)
- [API Services](#api-services)
- [Validation](#validation)
- [Styling & UI](#styling--ui)
- [Google Maps Feature](#google-maps-feature)
- [Installation](#installation)

---

## Architecture Overview

This project follows a **component-based architecture** using **Next.js App Router** with server-side data fetching where appropriate. Key architectural decisions:

- **Server-Side Data Fetching:** Countries are fetched on page load (server-side) for fast initial load. States are fetched client-side after a country is selected.
- **Reusable Components:** `Dropdown`, `Button`, and `Header` components are fully reusable, decoupled from specific API logic.
- **State Management:** Local React state via `useState` is used for dropdown selections, loading state, and submission handling.
- **Validation:** API responses are validated using `Zod` schemas for type safety and runtime validation.
- **Styling:** TailwindCSS is used for rapid styling and responsive design. Gradient animations enhance the header.

---

## Chosen Approach

- **Linked Dropdowns:** Selecting a country triggers a client-side API call to fetch states. This ensures minimal initial payload and improves UX.
- **Loading & Dirty States:** Loading indicators prevent interaction while data is being fetched. `isDirty` tracks unsaved changes to disable/enable the submit button.
- **Reusable UI Components:** Components like `Dropdown` and `Button` abstract repetitive logic, ensuring maintainability.
- **Validation:** `Zod` schemas prevent invalid API responses from breaking the app and provide clear runtime errors.

---

## Project Structure

```bash
/app
└─ page.tsx                 # Home page

/components
├─ /common
│  ├─ Button.tsx            # Reusable button
│  └─ Dropdown.tsx          # Reusable dropdown
└─ /countriesDropdown
   └─ CountriesDropdownContainer.tsx   # Container for country + state dropdowns

/services
├─ countryService.ts        # Fetch countries
└─ countryStateService.ts   # Fetch states by country ID

/types
├─ country.ts               # Country schema & type
├─ countryState.ts          # CountryState schema & type
└─ option.ts                # Generic select option type

```

---

## Technologies

- **Next.js 15 (App Router)**
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Zod** for schema validation
- **Lucide Icons** for UI icons
- **Vite / npm** (for development & builds)
- **ESLint** code formatting / checking

---

## Components

### `Dropdown`

- Reusable, searchable dropdown
- Props:
  - `options`: Array of `{ id: number, value: string }`
  - `value`: Selected option ID
  - `onChange`: Callback when selection changes
  - `placeholder`: Optional placeholder text
- Handles click-outside close and filtering.

### `Button`

- Reusable button with `primary` and `secondary` variants
- Supports disabled state and native HTML button attributes
- Forwarded ref support

### `Header`

- Gradient-shining header with animated text
- TailwindCSS-based for fast styling

### `CountriesDropdownContainer`

- Combines country and state dropdowns
- Manages state selection, loading, dirty flag, and submit logic
- Updates `submittedLocation` on submission

---

## State Management

- **Local State:** Each dropdown selection, loading, and submitted location tracked with `useState`.
- **Derived State:** `isDirty` determines if the submit button should be enabled.
- **Side Effects:** `useEffect` is used to handle click-outside events to close dropdowns.

---

## API Services

- `getCountries()`: Fetches all countries from API at page load.
- `getCountryStatesByCountryId(countryId)`: Fetches states for selected country and validates the response via Zod.

All API calls include headers with API keys and content type, and handle errors gracefully.

---

## Validation

- `Zod` schemas enforce runtime type safety for API responses:
  - `CountrySchema`
  - `CountryStateSchema`
- Prevents invalid data from causing runtime crashes and logs detailed error messages for debugging.

---

## Styling & UI

- TailwindCSS for responsive design and utility-first styling
- Gradient animation for header (`animate-shine`)
- Consistent design across buttons and dropdowns
- Loading indicators during state fetching

---

## Google Maps Feature

- After submission, the selected country/state is displayed on a static Google Map

- Map features:

      - Marker at the selected location

      - No zoom, pan, street view, fullscreen, or map type controls

      - Fully static map for a clean display

- Coordinates are fetched via the Google Geocoding API

---

## Installation

Before running this project, please ensure the following prerequisites are met:

1. **Node.js**

   - Install the **LTS Node version >= 22**, preferably `v22.14.0`.
   - You can download it from [Node.js Official Website](https://nodejs.org/en/download).

2. **IDE**

   - **VSCode** is the preferred IDE for this project.
   - The project includes a code formatter to enforce consistent code style.

3. **VSCode Extensions**
   - **Prettier** (by Prettier) – for automatic code formatting.
   - **ESLint** (by Microsoft) – for linting and enforcing coding standards.
   - _(Optional)_ **ES7 React/Redux/GraphQL/React-Native snippets** (by rodrigovallades) – useful for faster React/Redux development.

> ⚡ Tip: Installing these extensions ensures your code follows the project's formatting and linting rules automatically.

### Steps:

1. Clone the repository:

```bash
git clone https://github.com/arthjosephsabino/ultimate-dropdown.git
cd ultimate-dropdown
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create `.env.local` with API keys/credentials

```bash
NOTE: if you have made it this far, please contact your admin / manager regarding API URL and API keys


NEXT_PUBLIC_API_BASE_URL=<your-api-base-url>
NEXT_PUBLIC_API_KEY=<your-api-key>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
```

4. Run development server

```bash
npm run dev
# or
yarn dev
```
