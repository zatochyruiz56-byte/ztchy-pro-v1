// --- CONFIGURACIÓN FIREBASE ---
const firebaseConfig = {
    apiKey: "TU_API_KEY", // Obtenla de tu consola Firebase
    authDomain: "ztchy-pro-9eaf8.firebaseapp.com",
    projectId: "ztchy-pro-9eaf8",
    storageBucket: "ztchy-pro-9eaf8.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- FUNCIÓN DE REGISTRO CON SALDO INICIAL ---
async function registerUser() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;

    try {
        // 1. Crear el usuario en Firebase Auth
        const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
        const user = userCredential.user;

        // 2. Crear el documento en Firestore con 10 créditos
        await db.collection("usuarios").doc(user.uid).set({
            email: user.email,
            saldo: 10,
            fecha_registro: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("¡Cuenta creada con 10 créditos de regalo!");
        location.reload(); // Recargar para ir al login
    } catch (error) {
        alert("Error al registrar: " + error.message);
    }
}
