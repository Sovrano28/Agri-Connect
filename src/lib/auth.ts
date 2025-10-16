// Simple localStorage-based authentication utilities

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'farmer' | 'landowner' | 'equipment-owner';
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'landowner' | 'equipment-owner';
  avatar: string;
}

// Email validation - must be Gmail or Yahoo
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return domain === 'gmail.com' || domain === 'yahoo.com';
};

// Password validation - must contain letter, number, and symbol
export const validatePassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isLongEnough = password.length >= 8;
  
  return hasLetter && hasNumber && hasSymbol && isLongEnough;
};

// Get password validation errors
export const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one symbol');
  }
  
  return errors;
};

// Register a new user
export const registerUser = (data: RegisterData): { success: boolean; error?: string } => {
  try {
    // Validate email
    if (!validateEmail(data.email)) {
      return { success: false, error: 'Please use a Gmail or Yahoo email address' };
    }
    
    // Validate password
    if (!validatePassword(data.password)) {
      return { success: false, error: 'Password must contain at least one letter, number, and symbol (min 8 characters)' };
    }
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('agri-connect-users') || '[]');
    if (existingUsers.some((u: StoredUser) => u.email === data.email)) {
      return { success: false, error: 'An account with this email already exists' };
    }
    
    // Create new user with African/Black person avatar
    const avatars = [
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400',
      'https://images.unsplash.com/photo-1531384370597-8590413be50a?w=400',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400',
    ];
    const newUser: StoredUser = {
      id: `user${Date.now()}`,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    };
    
    // Store user credentials (in real app, never store passwords in localStorage!)
    const credentials = JSON.parse(localStorage.getItem('agri-connect-credentials') || '{}');
    credentials[data.email] = data.password;
    localStorage.setItem('agri-connect-credentials', JSON.stringify(credentials));
    
    // Store user data
    existingUsers.push(newUser);
    localStorage.setItem('agri-connect-users', JSON.stringify(existingUsers));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

// Login user
export const loginUser = (email: string, password: string): { success: boolean; user?: StoredUser; error?: string } => {
  try {
    // Check credentials
    const credentials = JSON.parse(localStorage.getItem('agri-connect-credentials') || '{}');
    if (credentials[email] !== password) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Get user data
    const users = JSON.parse(localStorage.getItem('agri-connect-users') || '[]');
    const user = users.find((u: StoredUser) => u.email === email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    // Store current user session
    localStorage.setItem('agri-connect-user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('agri-connect-user');
};

// Get current user
export const getCurrentUser = (): StoredUser | null => {
  try {
    const storedUser = localStorage.getItem('agri-connect-user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};
