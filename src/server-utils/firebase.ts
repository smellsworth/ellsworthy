import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: process.env.FIREBASE_URL,
  databaseAuthVariableOverride: {
    uid: "WEBSITE_BACKEND",
  },
})

function readValue<T>(path: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const db = admin.database()
    const ref = db.ref(path)

    ref.once(
      "value",
      (snapshot) => {
        resolve(snapshot.val())
      },
      reject
    )
  })
}

function setValue(path: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = admin.database()
    const ref = db.ref(path)

    ref.set(value, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function pushValue(path: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const db = admin.database()
    const ref = db.ref(path)

    ref.push(value, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export { readValue, setValue, pushValue }
