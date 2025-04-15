import { db } from '@/config/firebase';
import { enableNetwork, disableNetwork, waitForPendingWrites } from 'firebase/firestore';

class FirebaseConnectionManager {
  private static instance: FirebaseConnectionManager;
  private retryTimeout: NodeJS.Timeout | null = null;
  private maxRetries = 3;
  private retryCount = 0;
  private retryDelay = 1000;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeConnectionHandlers();
    }
  }

  static getInstance(): FirebaseConnectionManager {
    if (!FirebaseConnectionManager.instance) {
      FirebaseConnectionManager.instance = new FirebaseConnectionManager();
    }
    return FirebaseConnectionManager.instance;
  }

  private initializeConnectionHandlers() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  private handleOnline = async () => {
    try {
      await enableNetwork(db);
      this.retryCount = 0;
      console.log('Firebase connection restored');
    } catch (error) {
      console.error('Error enabling network:', error);
      this.retryConnection();
    }
  };

  private handleOffline = async () => {
    try {
      await waitForPendingWrites(db);
      await disableNetwork(db);
      console.log('Firebase connection disabled');
    } catch (error) {
      console.error('Error disabling network:', error);
    }
  };

  private retryConnection = () => {
    if (this.retryCount >= this.maxRetries) {
      console.error('Max retry attempts reached');
      return;
    }

    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }

    this.retryTimeout = setTimeout(() => {
      this.retryCount++;
      this.handleOnline();
    }, this.retryDelay * Math.pow(2, this.retryCount));
  };

  cleanup() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    }
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }
}

export const firebaseConnection = FirebaseConnectionManager.getInstance();
