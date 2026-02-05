// CONFIGURACIÓN FIREBASE (Usa tus datos reales aquí)
const firebaseConfig = {
    apiKey: "TU_API_KEY_DE_FIREBASE",
    authDomain: "ztchy-pro-9eaf8.firebaseapp.com",
    projectId: "ztchy-pro-9eaf8",
    storageBucket: "ztchy-pro-9eaf8.appspot.com",
    messagingSenderId: "TU_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función de Login
function login() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            loadDashboard(userCredential.user);
        })
        .catch((error) => alert("Error: " + error.message));
}

// Cargar Panel y Saldo
function loadDashboard(user) {
    document.getElementById('auth-wall').style.display = 'none';
    document.getElementById('main-panel').style.display = 'block';
    document.getElementById('user-info').innerText = "Usuario: " + user.email;

    db.collection("usuarios").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            document.getElementById('balance').innerText = doc.data().saldo;
        } else {
            // Si el usuario es nuevo, le creamos sus 10 créditos
            db.collection("usuarios").doc(user.uid).set({
                email: user.email,
                saldo: 10
            });
            document.getElementById('balance').innerText = "10";
        }
    });
}

function logout() {
    auth.signOut().then(() => location.reload());
}
