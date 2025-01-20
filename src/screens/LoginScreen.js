import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validación del formulario
  const validateLoginForm = () => {
    if (!/\S+@\S+\.\S+/.test(email)) return "Email inválido";
    if (!password) return "La contraseña es requerida";
    return null;
  };

  // Manejo del inicio de sesión
  const handleLogin = async () => {
    const error = validateLoginForm();
    if (error) {
      setError(error);
      return;
    }

    setIsLoading(true); // Mostrar indicador de carga mientras se procesa el inicio de sesión
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Mi Comida Favorita
      </Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={isLoading ? "Cargando..." : "Iniciar Sesión"} // Cambia el texto del botón si está cargando
        onPress={handleLogin}
        containerStyle={styles.button}
        disabled={isLoading} // Desactiva el botón si está cargando
      />
      <Button
        title="Registrarse"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        disabled={isLoading} // Desactiva el botón si está cargando
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
