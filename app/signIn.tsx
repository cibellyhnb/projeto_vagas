import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

export default function SignIn() {
  const { createUser } = useAuth();
  const router = useRouter();

  // Validação do formulário com Yup
  const cadastroValidationSchema = yup.object().shape({
    nome: yup.string().required("Você precisa inserir um nome!"),
    email: yup.string().email("E-mail não válido.").required("Você precisa inserir um email!"),
    senha: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres.").required("Você precisa inserir uma senha!"),
  });

  const cadastrar = async (nome, email, senha) => {
    const success = await createUser({ nome, email, senha });
    if (success) {
      router.push("/login");
    } else {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua conta!</Text>
      <Formik
        initialValues={{ nome: "", email: "", senha: "" }}
        validateOnMount={true}
        onSubmit={(values) => cadastrar(values.nome, values.email, values.senha)}
        validationSchema={cadastroValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.form}>
            <TextInput
              onChangeText={handleChange("nome")}
              onBlur={handleBlur("nome")}
              value={values.nome}
              placeholder="Nome completo"
              placeholderTextColor="#A8A8A8"
              style={[styles.input, errors.nome && touched.nome ? styles.inputError : null]}
            />
            {errors.nome && touched.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="E-mail"
              placeholderTextColor="#A8A8A8"
              style={[styles.input, errors.email && touched.email ? styles.inputError : null]}
            />
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              onChangeText={handleChange("senha")}
              onBlur={handleBlur("senha")}
              value={values.senha}
              placeholder="Senha"
              secureTextEntry
              placeholderTextColor="#A8A8A8"
              style={[styles.input, errors.senha && touched.senha ? styles.inputError : null]}
            />
            {errors.senha && touched.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: isValid ? "#a62c2a" : "#f8dee7" }]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
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