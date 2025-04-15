# GitHub Copilot Instructions

This is a Daily Habit Tracker application built with Next.js, TypeScript, TailwindCSS, and Firebase. When generating code, please follow these guidelines:

## Architecture

- Use the App Router pattern with Next.js 14
- Keep components in appropriate directories under `src/components/`
- Maintain separation of concerns between UI components and business logic
- Use TypeScript for type safety

## State Management

- Use React Context for global state (auth, theme)
- Implement proper loading and error states
- Handle Firebase real-time updates efficiently
- Maintain proper type definitions in `src/types/`

## Authentication & Security

- Always verify user authentication before data operations
- Follow Firebase security best practices
- Use proper error handling for auth operations
- Implement rate limiting where appropriate

## Styling

- Use TailwindCSS for all styling
- Follow dark mode pattern with `dark:` variants
- Support multiple color schemes through CSS variables
- Maintain responsive design principles

## Premium Features

- Check user.isPremium before enabling premium features
- Limit free tier to 3 habits maximum
- Implement proper upgrade flow
- Handle premium-only UI elements gracefully

## Firebase Integration

- Use proper Firebase hooks and patterns
- Implement efficient real-time listeners
- Follow Firestore security rules
- Handle offline capabilities properly

## Error Handling

- Implement proper error boundaries
- Show user-friendly error messages
- Log errors appropriately
- Handle network issues gracefully