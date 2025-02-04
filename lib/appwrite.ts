import { Account, Avatars, Client, Databases, ID, OAuthProvider, Query } from "react-native-appwrite"
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";
import { router,Link } from "expo-router";
// import type { Route } from 'expo-router';

export const config = {
    platform:'com.anujkumarupadhyay.realstate',
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleryCollectionId:process.env.EXPO_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID,
    propertyCollectionId:process.env.EXPO_PUBLIC_APPWRITE_PROPERTY_COLLECTION_ID,
    reviewCollectionId:process.env.EXPO_PUBLIC_APPWRITE_REVIEW_COLLECTION_ID,
    agentCollectionId:process.env.EXPO_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
}

export const client = new Client();
client
.setEndpoint(config.endpoint!)
.setProject(config.projectId!)
.setPlatform(config.platform!)



export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// export async function login() {
//     try {
//       const redirectUri = Linking.createURL("auth-callback");
  
//       const response = await account.createOAuth2Session(
//         OAuthProvider.Google,
//         redirectUri,
//         redirectUri
//       );
//       if (!response) throw new Error("Create OAuth2 token failed");
  
//       const browserResult = await openAuthSessionAsync(
//         response.toString(),
//         redirectUri
//       );
//       if (browserResult.type !== "success")
//         throw new Error("Create OAuth2 token failed");
  
//       const url = new URL(browserResult.url);
//       const secret = url.searchParams.get("secret")?.toString();
//       const userId = url.searchParams.get("userId")?.toString();
//       if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
//       const session = await account.createSession(userId, secret);
//       if (!session) throw new Error("Failed to create session");
  
//       return true;
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   }



export async function emailLogin(email: string, password: string) {
  try {
      try {
          await account.deleteSession('current');
      } catch {}

      const session = await account.createEmailPasswordSession(email, password);
      
      if (session.$id) {
          // Use correct path format for expo-router
          router.replace('/(root)/(tabs)/explore');
          return session;
      }
      throw new Error('Login failed');
  } catch (error) {
      console.error('Login error:', error);
      throw error;
  }
}

export async function emailSignup(email: string, password: string, name: string) {
  try {
      const user = await account.create(
          ID.unique(),
          email,
          password,
          name
      );

      if (user.$id) {
          await emailLogin(email, password);
          return user;
      }
      throw new Error('Signup failed');
  } catch (error) {
      console.error('Signup error:', error);
      throw error;
  }
}


export async function login() {
  try {
    const redirectUri = Linking.createURL("auth-callback");

    // Create OAuth2 session for Google
    const response = await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUri,
      redirectUri
    );

    if (!response) {
      console.error("OAuth2 session creation failed");
      return false;
    }

    // Open the OAuth session and handle the response
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      console.error("OAuth2 authorization failed with type: ", browserResult.type);
      return false;
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) {
      console.error("OAuth2 token response is missing required parameters (secret or userId)");
      return false;
    }

    // Create the session with userId and secret
    const session = await account.createSession(userId, secret);

    if (!session) {
      console.error("Failed to create session with userId and secret");
      return false;
    }

    // Successfully logged in
    console.log("User logged in successfully");
    return true;

  } catch (error) {
    console.error("An error occurred during login:", error);
    return false;
  }
}

  
  export async function logout() {
    try {
      const result = await account.deleteSession("current");
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  export async function getCurrentUser() {
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  export async function getLatestProperties() {
    try {
      const result = await databases.listDocuments(
        config.databaseId!,
        config.propertyCollectionId!,
        [Query.orderAsc("$createdAt"), Query.limit(5)]
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  export async function getProperties({
    filter,
    query,
    limit,
  }: {
    filter: string;
    query: string;
    limit?: number;
  }) {
    try {
      const buildQuery = [Query.orderDesc("$createdAt")];
  
      if (filter && filter !== "All")
        buildQuery.push(Query.equal("type", filter));
  
      if (query)
        buildQuery.push(
          Query.or([
            Query.search("name", query),
            Query.search("address", query),
            Query.search("type", query),
          ])
        );
  
      if (limit) buildQuery.push(Query.limit(limit));
  
      const result = await databases.listDocuments(
        config.databaseId!,
        config.propertyCollectionId!,
        buildQuery
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // write function to get property by id
  export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.propertyCollectionId!,
        id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }