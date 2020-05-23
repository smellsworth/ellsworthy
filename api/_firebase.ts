import admin from "firebase-admin"
import dotenv from "dotenv"
dotenv.config({ path: '.env' })

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY,

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
