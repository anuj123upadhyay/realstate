// import { SplashScreen, Stack } from "expo-router";
// import "./global.css"

// import { useFonts } from "expo-font";
// import { useEffect } from "react";

// export default function RootLayout() {
// const [fontsLoaded] = useFonts({
//   "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
//   "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
//   "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
//   "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
//   "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
//   "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
// });

// useEffect(()=>{
//   const hideSplashScreen= async ()=>{

//     if(fontsLoaded){
//       await SplashScreen.hideAsync();
//     }
//   }

//   hideSplashScreen();
// },[fontsLoaded])


// if(!fontsLoaded) return null;


//   return <Stack screenOptions={{ headerShown: false}} />;
// // }





import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
   
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
      </GlobalProvider>
      
    </GestureHandlerRootView>
  );
}






// import { SplashScreen, Stack } from "expo-router";
// import "./global.css";
// import { useFonts } from "expo-font";
// import { useEffect } from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { View } from "react-native";
// import * as Linking from "expo-linking"; // Import deep linking
// import { useRouter } from "expo-router";
// import GlobalProvider from "@/lib/global-provider";
// import { Href } from "expo-router";

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
//     "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
//     "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
//     "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
//     "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
//     "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
//   });

//   const router = useRouter();

//   useEffect(() => {
//     const hideSplashScreen = async () => {
//       if (fontsLoaded) {
//         await SplashScreen.hideAsync();
//       }
//     };
//     hideSplashScreen();
//   }, [fontsLoaded]);

//   // ✅ Deep linking handling
//   useEffect(() => {
//     const handleDeepLink = (event: { url: string }) => {
//       const { url } = event;
//       console.log("Deep Link Triggered:", url);

//       if (url.includes("auth-callback")) {
//         router.push("/index" as Href<"/index">); // Redirect to dashboard after login
//          // Redirect to dashboard after login
//       }
//     };

//     const subscription = Linking.addEventListener("url", handleDeepLink);

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   if (!fontsLoaded) return null;

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <GlobalProvider>
//         <Stack screenOptions={{ headerShown: false }} />
//       </GlobalProvider>
//     </GestureHandlerRootView>
//   );
// }
