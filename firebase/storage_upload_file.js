import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytes(imageRef, blob);

  return await getDownloadURL(uploadTask.ref);
}
