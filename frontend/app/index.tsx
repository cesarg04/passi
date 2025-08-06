import { useAuthServices } from "@/shared/services/auth/authServices";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { getUser } = useAuthServices();

  useEffect(() => {
    (async () => {
      try {
        await getUser.mutateAsync();
        router.replace("/home");
      } catch (error: any) {
        console.error("Error fetching user:", error);
        router.replace("/login");
      }
    })();
  }, []);

  return (
     <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ActivityIndicator size={100} />
    </View>
  ); 
}
