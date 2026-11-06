# SARAS One — Login pages & loaders

Extracted from the SARAS One Console.

- src/pages/Login.tsx — login screen
- src/pages/Mfa.tsx — MFA / OTP screen
- src/pages/ForgotPassword.tsx — forgot / reset password flow
- src/Loaders.tsx — `Loader` (SARAS spinner) and `AppBootLoader` (full-screen boot loader)
- src/theme.css — tokens, resets, keyframes (`.saras-loader .car` drives the spinner)
- assets/ — logos, login background

Login pages import shared primitives (Field, Icon, S, toasts…) from `../ui`; copy `ui.tsx` from the full project if you need them standalone.
