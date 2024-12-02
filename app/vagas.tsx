import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function VagasScreen() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [vagas, setVagas] = useState<any[]>([]);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');

  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    if (!user) {
      router.replace('/');
    } else {
      fetchVagas();
    }
  }, [user]);

  const fetchVagas = async () => {
    try {
      const response = await fetch('http://localhost:3000'); // quando conseguir integrar com a api, coloca o link da api aqui
      const data = await response.json();
      setVagas(data.vagas);
    } catch (error) {
      console.log("Erro ao buscar vagas:", error);
    }
  };

  const handleCreateVaga = async () => {
    try {
      const response = await fetch('http://localhost:3000/vagas', { // aqui também
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao, titulo, telefone, empresa }),
      });

      const data = await response.json();

      if (data.error) {
        console.log("Erro ao criar vaga:", data.error);
        return;
      }

      fetchVagas();
      setDescricao('');
      setTitulo('');
      setTelefone('');
      setEmpresa('');
    } catch (error) {
      console.log("Erro na requisição para criar vaga:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser({ nome, email, senha }); // Atualiza no AuthContext
      alert('Informações atualizadas com sucesso!');
    } catch (error) {
      console.log('Erro ao atualizar informações:', error);
      alert('Erro ao atualizar informações.');
    }
  };
  

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {user?.nome}!</Text>

      {/* Inputs e botões para editar informações do usuário */}
      <Text style={styles.sectionTitle}>Editar Informações de Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#A8A8A8"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#A8A8A8"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A8A8A8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: nome && email && senha ? "#a62c2a" : "#f8dee7" }]}
        onPress={handleUpdateUser}
        disabled={!nome || !email || !senha}
      >
        <Text style={styles.buttonText}>Atualizar Dados</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Faça o registro para uma vaga:</Text>

      {/* Inputs para criar uma nova vaga */}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#A8A8A8"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#A8A8A8"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#A8A8A8"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Empresa"
        placeholderTextColor="#A8A8A8"
        value={empresa}
        onChangeText={setEmpresa}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: descricao && titulo && telefone && empresa ? "#a62c2a" : "#f8dee7" }]}
        onPress={handleCreateVaga}
        disabled={!descricao || !titulo || !telefone || !empresa}
      >
        <Text style={styles.buttonText}>Criar Vaga</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 24,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color: '#000',
    width: '80%',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#a62c2a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 50,
    width: '80%',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
