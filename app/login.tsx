import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  // Validação do formulário
  const validationSchema = yup.object().shape({
    email: yup.string().email("E-mail não válido.").required("Você precisa inserir um e-mail!"),
    password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres.").required("Você precisa inserir uma senha!"),
  });

  const handleLogin = async (values) => {
    const success = await login(values.email, values.password);
    if (success) {
      router.push("/vagas");
    } else {
      alert("Informações inválidas. Por favor, tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Faça seu login!</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.form}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#A8A8A8"
              style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Senha"
              placeholderTextColor="#A8A8A8"
              secureTextEntry
              style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: isValid ? "#a62c2a" : "#f8dee7" }]}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FB",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color: "#333",
  },
  inputError: {
    borderColor: "#FF6F61",
  },
  errorText: {
    fontSize: 12,
    color: "#FF6F61",
    marginBottom: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});