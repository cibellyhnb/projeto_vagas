import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserProps } from '../types/User';

interface AuthContextProps {
  user: UserProps | null;
  createUser: (userData: UserProps) => Promise<boolean>;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  const createUser = async (userData: UserProps): Promise<boolean> => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users: UserProps[] = storedUsers ? JSON.parse(storedUsers) : [];

    // Verificar se o email já está cadastrado
    const userExists = users.some((u) => u.email === userData.email);
    if (userExists) {
      console.log("E-mail já cadastrado!");
      return false; // Retorna 'false' se o e-mail já está em uso
    }

    // Adiciona o novo usuário à lista e salva no AsyncStorage
    users.push(userData);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    setUser(userData);
    return true; // Retorna 'true' após cadastro bem-sucedido
  };

  const login = async (email: string, senha: string) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users: UserProps[] = storedUsers ? JSON.parse(storedUsers) : [];

    // Verificar credenciais
    const userData = users.find((u) => u.email === email && u.senha === senha);
    if (userData) {
      setUser(userData);
      return true; // Login bem-sucedido
    }
    return false; // Credenciais inválidas
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user'); // Opcional: limpar sessão
  };

  const updateUser = async (updatedUserData: UserProps) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users: UserProps[] = storedUsers ? JSON.parse(storedUsers) : [];
  
    // Atualiza o usuário no array de usuários
    const index = users.findIndex((u) => u.email === updatedUserData.email);
    if (index !== -1) {
      users[index] = updatedUserData;
      await AsyncStorage.setItem('users', JSON.stringify(users)); // Salva as alterações
      setUser(updatedUserData); // Atualiza o estado do usuário
      await AsyncStorage.setItem('user', JSON.stringify(updatedUserData)); // Salva no AsyncStorage
    }
  };  

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
