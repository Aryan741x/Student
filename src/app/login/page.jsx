'use client';
import { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  TextField, 
  Button, 
  Alert, 
  InputAdornment 
} from '@mui/material';
import { Icon } from '@iconify/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../firebase';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      router.push('/student');
    } catch (error) {
      console.error("Login failed:", error);
      setError('Invalid email or password');
    }
  };

  const renderForm = (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleLogin}
    >
      {error && <Alert severity="error">{error}</Alert>}
      
      <TextField
        label="Email address"
        name="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}
      />
      
      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Icon icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 3 }}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: '10px' }}
      >
        Login
      </Button>
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Box
          gap={1.5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ marginBottom: 5 }}
        >
          <Typography variant="h5">Login</Typography>
        </Box>

        {renderForm}

        <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
          >
            OR
          </Typography>
        </Divider>

        <Box gap={1} display="flex" justifyContent="center">
          <IconButton color="inherit">
            <Icon icon="logos:google-icon" />
          </IconButton>
          <IconButton color="inherit">
            <Icon icon="eva:github-fill" />
          </IconButton>
          <IconButton color="inherit">
            <Icon icon="ri:twitter-x-fill" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
