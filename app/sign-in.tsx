// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { login } from "@/lib/appwrite";
// import { Redirect } from "expo-router";
// import { useGlobalContext } from "@/lib/global-provider";
// import icons from "@/constants/icons";
// import images from "@/constants/images";

// const Auth = () => {
//   const { refetch, loading, isLogged } = useGlobalContext();

//   if (!loading && isLogged) return <Redirect href="/" />;

//   const handleLogin = async () => {
//     const result = await login();
//     if (result) {
//       refetch();
//     } else {
//       Alert.alert("Error", "Failed to login");
//     }
//   };

//   return (
//     <SafeAreaView className="bg-white h-full">
//       <ScrollView
//         contentContainerStyle={{
//           height: "100%",
//         }}
//       >
//         <Image
//           source={images.onboarding}
//           className="w-full h-4/6"
//           resizeMode="contain"
//         />

//         <View className="px-10">
//           <Text className="text-base text-center uppercase font-rubik text-black-200">
//             Welcome To Real Scout
//           </Text>

//           <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
//             Let's Get You Closer To {"\n"}
//             <Text className="text-primary-300">Your Ideal Home</Text>
//           </Text>

//           <Text className="text-lg font-rubik text-black-200 text-center mt-12">
//             Login to Real Scout with Google
//           </Text>

//           <TouchableOpacity
//             onPress={handleLogin}
//             className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
//           >
//             <View className="flex flex-row items-center justify-center">
//               <Image
//                 source={icons.google}
//                 className="w-5 h-5"
//                 resizeMode="contain"
//               />
//               <Text className="text-lg font-rubik-medium text-black-300 ml-2">
//                 Continue with Google
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Auth;










// // app/sign-in.tsx
// import React, { useState } from 'react';
// import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
// import { login, emailLogin, emailSignup } from '../lib/appwrite';
// import { useRouter } from 'expo-router';

// const Auth = () => {
//     const router = useRouter();
//     const [isLogin, setIsLogin] = useState(true);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleEmailAuth = async () => {
//         try {
//             setLoading(true);
//             if (isLogin) {
//                 await emailLogin(email, password);
//             } else {
//                 await emailSignup(email, password, name);
//             }
//             router.replace('/');
//         } catch (error: any) {
//             Alert.alert('Error', error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoogleAuth = async () => {
//         try {
//             const success = await login(); // Google OAuth
//             if (success) {
//                 router.replace('/');
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message);
//         }
//     };

//     return (
//         <SafeAreaView className="flex-1 bg-white">
//             <ScrollView className="px-4 py-8">
//                 <View className="flex-row mb-8 rounded-lg overflow-hidden">
//                     <TouchableOpacity 
//                         onPress={() => setIsLogin(true)}
//                         className={`flex-1 py-3 ${isLogin ? 'bg-blue-500' : 'bg-gray-200'}`}
//                     >
//                         <Text className={`text-center font-medium ${isLogin ? 'text-white' : 'text-gray-600'}`}>
//                             Login
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity 
//                         onPress={() => setIsLogin(false)}
//                         className={`flex-1 py-3 ${!isLogin ? 'bg-blue-500' : 'bg-gray-200'}`}
//                     >
//                         <Text className={`text-center font-medium ${!isLogin ? 'text-white' : 'text-gray-600'}`}>
//                             Sign Up
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View className="space-y-4">
//                     {!isLogin && (
//                         <TextInput
//                             className="bg-gray-50 p-4 rounded-lg border border-gray-200"
//                             placeholder="Full Name"
//                             value={name}
//                             onChangeText={setName}
//                         />
//                     )}
//                     <TextInput
//                         className="bg-gray-50 p-4 rounded-lg border border-gray-200"
//                         placeholder="Email"
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         value={email}
//                         onChangeText={setEmail}
//                     />
//                     <TextInput
//                         className="bg-gray-50 p-4 rounded-lg border border-gray-200"
//                         placeholder="Password"
//                         secureTextEntry
//                         value={password}
//                         onChangeText={setPassword}
//                     />

//                     <TouchableOpacity
//                         onPress={handleEmailAuth}
//                         disabled={loading}
//                         className={`p-4 rounded-lg ${loading ? 'bg-blue-300' : 'bg-blue-500'}`}
//                     >
//                         <Text className="text-white text-center font-medium">
//                             {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
//                         </Text>
//                     </TouchableOpacity>

//                     <View className="flex-row items-center">
//                         <View className="flex-1 h-px bg-gray-200" />
//                         <Text className="mx-4 text-gray-500">or</Text>
//                         <View className="flex-1 h-px bg-gray-200" />
//                     </View>

//                     <TouchableOpacity
//                         onPress={handleGoogleAuth}
//                         className="flex-row items-center justify-center p-4 rounded-lg border border-gray-200"
//                     >
//                         {/* Add Google Icon here */}
//                         <Text className="text-gray-700 font-medium ml-2">
//                             Continue with Google
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default Auth;




















// app/sign-in.tsx
import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Alert,
    Image,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { login, emailLogin, emailSignup } from '../lib/appwrite';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useGlobalContext } from '@/lib/global-provider';

const { width } = Dimensions.get('window');

const Auth = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { refetch , isLogged} = useGlobalContext();
    const validateForm = () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Error', 'Please fill all fields');
            return false;
        }
        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return false;
        }
        return true;
    };
    useEffect(() => {
        if (isLogged) {
            router.replace('/(root)/(tabs)/explore');
        }
    }, [isLogged]);
    const handleEmailAuth = async () => {
        if (!validateForm()) return;
        
        try {
            setLoading(true);
            if (isLogin) {
                const session = await emailLogin(email, password);
                if (session) {
                    await refetch();
                    router.replace('/(root)/(tabs)/explore');
                }
            } else {
                const user = await emailSignup(email, password, name);
                if (user) {
                    await refetch();
                    router.replace('/(root)/(tabs)/explore');
                }
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white justify-center items-center">
                <ActivityIndicator size="large" color="#0061FF" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView 
                    className="flex-1"
                    contentContainerStyle={{ 
                        paddingHorizontal: width * 0.06,
                        paddingVertical: width * 0.08 
                    }}
                >
                    <Animatable.View 
                        animation="fadeIn"
                        className="items-center mb-8"
                    >
                        <Image 
                            source={require('../assets/images/icon.png')}
                            className="w-32 h-32"
                            resizeMode="contain"
                        />
                        <Text className="text-2xl font-bold text-gray-800 mt-4">
                            Welcome to RealEstate
                        </Text>
                        <Text className="text-gray-500 text-center mt-2">
                            {isLogin ? 'Sign in to continue' : 'Create an account to continue'}
                        </Text>
                    </Animatable.View>

                    <Animatable.View 
                        animation="fadeInUp"
                        delay={300}
                        className="space-y-6"
                    >
                        {!isLogin && (
                            <View className="space-y-2">
                                <Text className="text-gray-700 font-medium ml-1">Full Name</Text>
                                <View className="flex-row items-center bg-gray-50 rounded-xl p-3 border border-gray-200">
                                    <MaterialIcons name="person" size={20} color="#6B7280" />
                                    <TextInput
                                        className="flex-1 ml-2 text-base"
                                        placeholder="John Doe"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>
                        )}

                        <View className="space-y-2">
                            <Text className="text-gray-700 font-medium ml-1">Email</Text>
                            <View className="flex-row items-center bg-gray-50 rounded-xl p-3 border border-gray-200">
                                <MaterialIcons name="email" size={20} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-2 text-base"
                                    placeholder="example@email.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        <View className="space-y-2">
                            <Text className="text-gray-700 font-medium ml-1">Password</Text>
                            <View className="flex-row items-center bg-gray-50 rounded-xl p-3 border border-gray-200">
                                <MaterialIcons name="lock" size={20} color="#6B7280" />
                                <TextInput
                                    className="flex-1 ml-2 text-base"
                                    placeholder="••••••••"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialIcons 
                                        name={showPassword ? "visibility" : "visibility-off"} 
                                        size={20} 
                                        color="#6B7280" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleEmailAuth}
                            disabled={loading}
                            className={`p-4 rounded-xl ${loading ? 'bg-blue-300' : 'bg-blue-500'} mt-4`}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white text-center font-bold text-lg">
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsLogin(!isLogin)}
                            className="mt-4"
                        >
                            <Text className="text-blue-500 text-center">
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center my-6">
                            <View className="flex-1 h-px bg-gray-200" />
                            <Text className="mx-4 text-gray-500 font-medium">or continue with</Text>
                            <View className="flex-1 h-px bg-gray-200" />
                        </View>

                        <TouchableOpacity
                            onPress={login}
                            className="flex-row items-center justify-center p-4 rounded-xl border border-gray-200"
                        >
                          
                            <Text className="text-gray-700 font-medium ml-3">
                                Continue with Google
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Auth;