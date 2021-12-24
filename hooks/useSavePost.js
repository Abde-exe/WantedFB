import { v4 as uuidv4 } from "uuid"
import firebase from "firebase"
import { useNavigation } from "@react-navigation/core"
import { addUserPost } from "../redux/actions"
export default useSavePost = () => {
  const navigation = useNavigation()

  //uploading the images in the storage
  const uploadImages = async (post) => {
    const imagesBlob = []
    if (post.images.length > 0) {
      const images = post.images
      const childPath = `${post.postType}/${firebase.auth().currentUser.uid}`

      await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image)
          const blob = await response.blob()
          const ref = firebase.storage().ref(childPath).child(`${uuidv4()}.png`)

          await ref.put(blob).then((result) => {
            imagesBlob.push(result.metadata.name)
          })
          await ref.getDownloadURL(blob).then((result) => {
            imagesBlob.pop()
            imagesBlob.push(result)
          })
        })
      ).then(() => savePost(post, imagesBlob))
    } else {
      savePost(post, [])
    }
  }
  const uploadImages2 = async (post) => {
    const imagesBlob = []
    if (post.images.length > 0) {
      const images = post.images
      const childPath = `students/${firebase.auth().currentUser.uid}`

      await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image)
          const blob = await response.blob()
          const ref = firebase.storage().ref(childPath).child(`${uuidv4()}.png`)

          await ref.put(blob).then((result) => {
            imagesBlob.push(result.metadata.name)
          })
          await ref.getDownloadURL(blob).then((result) => {
            imagesBlob.pop()
            imagesBlob.push(result)
          })
        })
      ).then(() => savePost2(post, imagesBlob))
    } else {
      savePost2(post, [])
    }
  }
  //saving post
  const savePost = (post, images) => {
    let doc = firebase
      .firestore()
      .collection(post.postType)
      .add({
        ...post,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        userID: firebase.auth().currentUser.uid,
      })
      .then(function () {
        addUserPost(doc)
      })
  }
  const savePost2 = (post, images) => {
    //Object.keys(post).forEach((k) => post[k] == "" && delete post[k])
    let doc = firebase
      .firestore()
      .collection("students")
      .add({
        postType: "students",
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        name: post.name,
        age: post.age,
        location: post.location,

        type: post.type,
        domain: post.domain,
        length: post.length,
        place: post.place,

        title: post.title,
        description: post.description,
        images: images,
        //tel: post.tel,
        //email: post.email,
        userID: firebase.auth().currentUser.uid,
      })
      .then(function () {
        //navigation.navigate("SharingView", )
        addUserPost(doc)

        //navigation.navigate("DoneAnimation", post)
      })
  }

  return { uploadImages, uploadImages2, savePost, savePost2 }
}
