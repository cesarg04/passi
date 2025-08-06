import LightIcon from "@/assets/icons/logout.svg";
import { AuthStorage } from "@/shared/services/auth/authStorage";
import useAuthStore from "@/shared/store/auth/AuthStore";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const LogoutButton = () => {

  const { logout } = useAuthStore();
  const router = useRouter();

  const  onLogout = async() => {
    logout();
    await AuthStorage.deleteAccessToken();
    router.replace("/login");
  }


  return (
    <IconButton
        style={styles.buttonStyles}
      icon={() => (<LightIcon color={'white'} /> )}
      onPress={onLogout}
    />
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
    buttonStyles: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
    }
})