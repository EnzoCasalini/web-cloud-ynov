import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const uploadToFirebase = async (uri, type, onProgress) => {
  let imageName = '';
  if (type === 'profile') {
    imageName = `profileImages/${Date.now()}`;
  } else {
    imageName = `postImages/${Date.now()}`;
  }
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

export const getDefaultImageUrl = async (type) => {
  let imageName = '';
  if (type === 'profile') {
    imageName = 'profileImages/Default user profile picture.jpg';
  } else {
    imageName = `postImages/Default thumbnail image.png`;
  }
  const storageRef = ref(getStorage(), imageName);

  try {
    const url = await getDownloadURL(storageRef);
    console.log("URL de l'image :", url);
    return url;
  } catch (error) {
    console.error("Erreur lors de l'obtention de l'URL de téléchargement :", error);
    return null;
  }
};