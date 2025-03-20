import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  // 🔹 Registrar usuario en Firebase Authentication y guardar datos en Firestore
  async register(email: string, password: string, userType: string, user: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar información adicional del usuario en Firestore
      await setDoc(doc(this.firestore, `users/${uid}`), {
        user,
        email,
        userType
      });

      return userCredential.user;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // 🔹 Iniciar sesión y obtener el usuario autenticado
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  // 🔹 Obtener datos del usuario desde Firestore
  async getUserData(uid: string) {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data(); // Retorna los datos del usuario
      } else {
        return null; // Si no existen datos adicionales
      }
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  }

  // 🔹 Obtener propiedad por ID desde Firestore
  async getPropertyById(propertyId: string) {
    try {
      const propertyDocRef = doc(this.firestore, `properties/${propertyId}`);
      const propertyDoc = await getDoc(propertyDocRef);
      if (propertyDoc.exists()) {
        return propertyDoc.data(); // Retorna los datos de la propiedad
      } else {
        return null; // Si no se encuentra la propiedad
      }
    } catch (error) {
      console.error('Error obteniendo la propiedad:', error);
      return null;
    }
  }

  // 🔹 Función para crear una cita
  async createCita(ownerId: string, userId: string, fecha: string, hora: string) {
    try {
      // Estructura de datos para la cita
      const citaData = {
        ownerId,
        userId,
        fecha,
        hora,
        status: 'pendiente' // status por defecto
      };

      // Usamos addDoc para generar un ID automático
      const docRef = await addDoc(collection(this.firestore, 'citas'), citaData);

      // Retornamos el ID generado por Firestore (opcional, en caso de que quieras usarlo)
      return docRef.id;
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  }

  // 🔹 Cerrar sesión
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
// Removed the incorrect addDoc and collection function implementations

