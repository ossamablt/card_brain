# NextAuth.js Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth Provider
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Setting up OAuth Providers

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add `http://localhost:3000/api/auth/callback/google` to the authorized redirect URIs
6. Copy the Client ID and Client Secret to your `.env.local` file

### GitHub OAuth Setup

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: Memory Master
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

## Generate NextAuth Secret

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use an online generator and add it to your `.env.local` file.

## Installation

Install NextAuth.js:

```bash
npm install next-auth
```

## Features

- **Multiple Authentication Providers**: Google, GitHub, and Email/Password
- **Session Management**: Automatic session handling with JWT strategy
- **Protected Routes**: Easy integration with your existing components
- **Social Login**: One-click sign-in with Google and GitHub
- **Custom Onboarding**: Age, nickname, and preferences collection
- **Error Handling**: Proper error messages for failed authentication

## Usage

The authentication is now integrated into your Memory Master game:

1. Users can sign in with email/password or social providers
2. After authentication, they're prompted for onboarding questions
3. User preferences are stored and used throughout the game
4. Sessions persist across browser tabs and windows

## Security Notes

- In production, replace the credentials provider with a proper database
- Use environment variables for all secrets
- Consider adding rate limiting for authentication endpoints
- Implement proper password hashing for the credentials provider 