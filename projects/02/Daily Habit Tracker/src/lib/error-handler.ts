interface FirebaseError {
  code: string;
  message: string;
}

export function handleFirebaseError(error: FirebaseError): string {
  // Auth errors
  if (error.code.startsWith('auth/')) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Please enter a valid email address';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'Authentication error. Please try again';
    }
  }

  // Firestore errors
  if (error.code.startsWith('firestore/')) {
    switch (error.code) {
      case 'firestore/permission-denied':
        return 'You don\'t have permission to perform this action';
      case 'firestore/not-found':
        return 'The requested resource was not found';
      case 'firestore/already-exists':
        return 'This resource already exists';
      case 'firestore/resource-exhausted':
        return 'You\'ve reached the maximum limit for this operation';
      case 'firestore/failed-precondition':
        return 'Operation cannot be performed in the current state';
      case 'firestore/unavailable':
        return 'Service is temporarily unavailable. Please try again later';
      default:
        return 'Database error. Please try again';
    }
  }

  // Network errors
  if (error.code === 'network-error') {
    return 'Network error. Please check your connection';
  }

  // Rate limiting
  if (error.code === 'rate-limit-exceeded') {
    return 'Too many requests. Please try again later';
  }

  // Premium feature errors
  if (error.code === 'premium-required') {
    return 'This feature requires a premium subscription';
  }

  // Fallback error message
  return 'An unexpected error occurred. Please try again';
}

export function isNetworkError(error: FirebaseError | Error): boolean {
  return (
    'code' in error && (
      error.code === 'network-error' || 
      error.code === 'auth/network-request-failed' || 
      error.code === 'firestore/unavailable'
    )
  );
}

export function isPremiumError(error: FirebaseError | Error): boolean {
  return (
    'code' in error && (
      error.code === 'premium-required' ||
      (error.code === 'firestore/permission-denied' && error.message.includes('premium'))
    )
  );
}

export function isRateLimitError(error: FirebaseError | Error): boolean {
  return (
    'code' in error && (
      error.code === 'rate-limit-exceeded' || 
      error.code === 'auth/too-many-requests'
    )
  );
}

export class PremiumRequiredError extends Error {
  code: string;
  
  constructor(message: string = 'This feature requires a premium subscription') {
    super(message);
    this.name = 'PremiumRequiredError';
    this.code = 'premium-required';
  }
}