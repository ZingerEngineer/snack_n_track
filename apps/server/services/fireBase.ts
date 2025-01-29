import { FirebaseApp, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const initFireBaseApp = () => {
  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyDwHivTdNZpM0j6bbm0_zQanXc8uP9u9Z4',
      authDomain: 'snackntrack-3d3df.firebaseapp.com',
      projectId: 'snackntrack-3d3df',
      storageBucket: 'snackntrack-3d3df.firebasestorage.app',
      messagingSenderId: '141661032357',
      appId: '1:141661032357:web:f05bf6ba0050008196e24c'
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    return app
  } catch (error) {
    throw new Error('Error initializing Firebase app')
  }
}

const initFireBaseStorage = (app: FirebaseApp) => {
  try {
    const storage = getStorage(app)
    return storage
  } catch (error) {
    throw new Error('Error initializing Firebase storage')
  }
}

export { initFireBaseApp, initFireBaseStorage }
