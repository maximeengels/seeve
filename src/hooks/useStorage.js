import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = ({file, uid, artistName}) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  let storageRef = null;
  let collectionRef = null;

  useEffect(() => {
    
    if(file.type == "audio/mpeg"){
      storageRef = projectStorage.ref('/songs/' + file.name);
      collectionRef = projectFirestore.collection('songs');

      storageRef.put(file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        const string = file.name;
        const songName = string.slice(0, -4);
        const songUrl = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ artistName, artistUid: uid, songName, songUrl, createdAt });

        collectionRef = projectFirestore.collection('users');
        await collectionRef.doc(uid).collection('songs').add({ songName, songUrl, createdAt });
        setUrl(songUrl);
      })
    } else {
      storageRef = projectStorage.ref('/images/' + file.name);
      collectionRef = projectFirestore.collection('users');

      storageRef.put(file).on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        const imgUrl = await storageRef.getDownloadURL();
        await collectionRef.doc(uid).set({ imgUrl }, {merge: true});
        // await collectionRef.doc(uid).set({ imgUrl });
        setUrl(imgUrl);
      })
    }
  }, [file]);

  return { progress, url, error }

}

export default useStorage;