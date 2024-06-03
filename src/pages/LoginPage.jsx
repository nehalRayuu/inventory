import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../components/Store/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = ({ username, password }) => {
        if (username === 'user' && password === 'password') {
            dispatch(login());
            navigate('/');
        } else {
            toast({
                title: 'Login failed',
                description: 'Invalid username or password',
                status: 'error',
                duration: 3000, 
                isClosable: true,
            });
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
            <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
                <Input 
                    placeholder="Username" 
                    {...register('username', { required: 'Username is required' })} 
                    isInvalid={errors.username}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <Input 
                    placeholder="Password" 
                    type="password" 
                    {...register('password', { required: 'Password is required' })} 
                    isInvalid={errors.password}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <Button type="submit" colorScheme="teal">Login</Button>
            </VStack>
            <Box>
                user : user
                password : password
            </Box>
        </Box>
        
    );
};

export default LoginPage;
