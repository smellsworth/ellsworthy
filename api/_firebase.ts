import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL,
    databaseAuthVariableOverride: {
      uid: "WEBSITE_BACKEND",
    },
  })
} catch (e) {
  console.log({
    FIREBASE_URL: process.env.FIREBASE_URL,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  })

  throw e
}

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
