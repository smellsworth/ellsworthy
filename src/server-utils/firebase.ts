import admin from "firebase-admin"
import serviceAccount from "../../.private/firebase_cert"

const FIREBASE_URL = "https://blog-test-5b3c1.firebaseio.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: FIREBASE_URL,
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
