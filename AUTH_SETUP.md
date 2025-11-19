# 🔐 Authentication Setup

This application uses token-based authentication to protect access without requiring a database.

## Setup Instructions

1. **Copy the environment template:**
   ```bash
   copy .env.example .env
   ```

2. **Edit the `.env` file and set your secure token:**
   ```
   VITE_ACCESS_TOKEN=your-custom-secure-token-here
   ```

3. **Share the token with your team securely** (via encrypted message, password manager, etc.)

## Security Notes

- ✅ The `.env` file is in `.gitignore` and won't be committed to git
- ✅ Keep your token secret and don't share it publicly
- ✅ Change the token regularly for better security
- ✅ Each team member needs the same token to access the application
- ✅ Authentication state persists in browser localStorage with timestamp

## How It Works

- Users enter the access token on the login page
- Token is validated against `VITE_ACCESS_TOKEN` from environment variables
- Upon successful validation, authentication state is stored in localStorage
- All routes are protected and redirect to login if not authenticated
- Logout clears the authentication state

## Changing the Token

To change the access token:
1. Update `VITE_ACCESS_TOKEN` in your `.env` file
2. Restart the development server
3. Share the new token with your team
4. All users will need to re-authenticate with the new token
