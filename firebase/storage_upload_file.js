import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const uploadToFirebase = async (uri, onProgress) => {
  const imageName = `profileImages/${Date.now()}`;
  const imageRef = ref(getStorage(), imageName);

  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();


  let downloadUrl = '';
  await uploadBytes(imageRef, blob)
    .then(async (snapshot) => {
      downloadUrl = await getDownloadURL(snapshot.ref);
    })
    .catch((error) => {
      console.error('Upload failed', error);
      throw new Error('Upload failed: ' + error.message);
    });

  return downloadUrl;
}
