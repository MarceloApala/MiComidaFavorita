import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, auth, db } from "../config/firebase";

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `profiles/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "usuarios", auth.currentUser.uid), {
      photoURL: url,
    });

    alert("Foto de perfil actualizada");
  }
};
