const admin = require("firebase-admin");
// const serviceAccount = require("../mechine-task-firebase-adminsdk-ypy5l-52486d0e9a.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "mechine-task",
    "private_key_id": process.env.FirebaseKey,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCo2vsUcx7DF/ta\nt68HEy1khpXxeLAhua4jMakQYCopRFPg7K57pXPghr88h42anwLUxemx7bgf++bI\n1JCU97DkBNOQiVTGlMUL+n6HJiyt+Mmjn9mvIW3a8aKgdnv8z/AiMEmyxbGBtBVY\n59u+bpycXFG10KKVaz5ClySrnsj1D6jI5ba+MMRQmJcGeo2xgczQ2OkIyjoGRIAn\ns2KJVbhomU5qjMP1CEyuArx5bWzCZMInOPpXGly0h5dVKHhpC5Z+pCRvuH1E3OhC\n8jBN+TP4ZrN4KNxVwT0ykk5mW3zf9TJ0mPaz9jREoPImQO+HtQSVieA+41sD7y5e\njYaHF9RTAgMBAAECggEAAfI3eNqws4wAGKUprzbli+vUPvIuJ93THmWMTsMgvut8\noPJEsyYhcmxGdJMkkH8/nynzYrT2h8lA06PcQkWjJw+FiHwryGE1hV+HUqC983FA\nkiyha7n3Ujs5NSb1n7OPBDbNNIjtP9Lsh5e8hysvFZ4Jmlm+Ayc3ODHZpoadOFRt\nI9yQ3BZYiDIETEdgeX5t08jSkMGc4I/HNEtIqlnheiHqLg2/Qvwu/8XdbudYd5Eg\nQuXRkiXOlWiIlPgenuCYHxpVlp+aLIWQ8Mq7gBqeaOp1zctAmBXKs9UyQOdOk0gP\n/D3nWF5hkVxNVQub2X0/uBlPmD9ZpSKzSc/lxlVRsQKBgQDTRTfCWnhs0qtgDnQd\n74iV5XHmECAo44tM5JDxFPkrjQWwms+mVBxRvwVBRsvpY1mzUxBpEnxQrnEBbWW/\n06mTjKh+WVcJt00pL3DCZWzSOHocKjMY5vmAZ03txII8snjeFjAHMN8Vj+ZP2ElS\nubPRTEHssAk03DRchHT37ubR6wKBgQDMmuKZzDIPsqaxYFJWV9OGq+ej/65lzhyU\n3XRLddneA2VWpm+TrneO+WIRp402TtBDwEt/CbKXruhbYcBZHEH+lQuzzEDYP49K\naHwME88sVskAFR96VQgQS0+2OV9rClJLIooW/jWBFCXLkwGTioHlslB8/OsXYJwx\nl06BMuyFOQKBgHETuh1fGNd+BlW6RrIDE8LO9KBjfyMDbvpv15gBVr/VkfcNVRi8\nKhAiwmhGwTsgftE5Iy5pw3nXdAqEiBIc8sVTYpeFr802e6kQiDSz3oPB0LGkcIbi\nkSYFpLMfG2nrSD/t9jTTFoPO6kFQDSam2DSssRhCvBq7xZbDGmvdRVOTAoGAHTf1\nKj912rYJhgUaXQg3xeCguNPXhORVQpEJfYk77q+PdjtYbb+ZhUppzdmemeXRagt4\n/JBW98BboEkqXc9iQUfpnuiJThhtjxOyu0rM6CkQlTlvAFpKR4Fpxb0VukSEEgTB\nsZzl6SQGbbb1n6tE95dqVR8NN45tX8uaw2qRSkkCgYBMtAp22teKNZI0mTxpLZvi\n91ftDte3UOyMKi7AnO9iusPvCgSS3EHJgaSfV0nOysukoIGQduMNcajawk+DfWoN\n+tykaX1O0z+H6wBMrLS4/X2MSvOIOZ1plP/aMs7aP7WErZSDDBm1w/vjlU00WXFn\nVgUBUq9pztXyBhGmPZE+6A==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ypy5l@mechine-task.iam.gserviceaccount.com",
    "client_id": "115893605317535687916",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ypy5l%40mechine-task.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  ),
})


const db=admin.firestore()

module.exports=db
// // Import the functions you need from the SDKs you need
// const { initializeApp } = ("firebase/app");
// const { getAnalytics } = ("firebase/analytics");
// const { firestore } = ("firebase/firestore");

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC6bFgjJFZTgsCz110P716YxsVwRP6jnpU",
//   authDomain: "lifology-761b9.firebaseapp.com",
//   projectId: "lifology-761b9",
//   storageBucket: "lifology-761b9.appspot.com",
//   messagingSenderId: "683074915014",
//   appId: "1:683074915014:web:b1d7bc4667cfb17ea3a5c7",
//   measurementId: "G-9V3ZZMNQ4E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
