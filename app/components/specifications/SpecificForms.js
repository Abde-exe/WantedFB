import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/core';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import { addUserPost } from '../../../redux/actions';
import AppText from '../AppText';
import MultiForm from '../forms/MultiForm';
import ImagePicker from '../forms/ImagePicker';
import { AppFormField, LocationSearchBar } from '../forms';
import DateInput from '../DateInput';
import SelectRadio from '../forms/SelectRadio';
import colors from '../../../config/colors';
import { updateUserPost } from '../../../redux/actions/index';
import { useDispatch } from 'react-redux';
const validationSchema = {
  missings: Yup.object().shape({
    images: Yup.array().min(1, 'Sélectionnez au moins 1 image'),
    title: Yup.string()
      .required('Veuillez entrer un nom')
      .min(3, "Le nom doit être d'au moins 3 caractères")
      .label('Nom'),
    age: Yup.number()
      .min(0, 'Entrez une valeur entre 0 et 120 ans')
      .max(120, 'Entrez une valeur entre 0 et 120 ans')
      .label('Age'),
    date: Yup.date().label('Date'),
    location: Yup.object()
      .required('Veuillez entrer une localisation')
      .label('Localisation'),

    description: Yup.string().label('Description'),
    corpulence: Yup.string().label('Corpulence'),
    height: Yup.number()
      .min(100, 'Entrez une valeur entre 100 et 220 ans')
      .max(220, 'Entrez une valeur entre 100 et 220 ans')
      .label('Taille'),
    hair: Yup.string().label('Cheveux'),
    eyes: Yup.string().label('Yeux'),
    outfit: Yup.string().label('Tenue'),
    other: Yup.string().label('Autre'),

    tel: Yup.string().label('Téléphone'),
    email: Yup.string().email('Entrez une adresse email valide').label('Email'),
    facebook: Yup.string().label('Facebook'),
    snapchat: Yup.string().label('Snapchat'),
    twitter: Yup.string().label('Twitter'),
    instagram: Yup.string().label('Instagram'),
  }),
  students: Yup.object().shape({
    name: Yup.string()
      .required('Entrez un nom')
      .min(3, 'Entrez un nom')
      .label('Nom'),

    type: Yup.string().required("Choisissez le type d'annonce").label('Type'),
    domain: Yup.string().required('Indiquez dans quel d').label('Domaine'),
    length: Yup.string().label('Durée'),
    location: Yup.object().label('Lieu'),

    title: Yup.string()
      .required('Entrez un titre')
      .min(3, 'Entrez un titre')
      .label('Titre'),
    description: Yup.string().label('Description'),
    images: Yup.array(),
    tel: Yup.string().label('Téléphone'),
    email: Yup.string().email('Entrez une adresse email valide').label('Email'),
    facebook: Yup.string().label('Facebook'),
    snapchat: Yup.string().label('Snapchat'),
    twitter: Yup.string().label('Twitter'),
    instagram: Yup.string().label('Instagram'),
  }),
  animals: Yup.object().shape({
    name: Yup.string().min(3, 'Entrez un nom').label('Nom'),
    location: Yup.object().label('Localisation'),
    date: Yup.date().label('Date'),
    title: Yup.string().required().min(3, 'Entrez un titre').label('Titre'),
    description: Yup.string().label('Description'),
    race: Yup.string().label('Race'),
    other: Yup.string().label('Autre'),
    sexe: Yup.string().label('Sexe'),
    images: Yup.array(),
    tel: Yup.string().label('Téléphone'),
    email: Yup.string().email('Entrez une adresse email valide').label('Email'),
    facebook: Yup.string().label('Facebook'),
    snapchat: Yup.string().label('Snapchat'),
    twitter: Yup.string().label('Twitter'),
    instagram: Yup.string().label('Instagram'),
  }),
  objects: Yup.object().shape({
    location: Yup.object().label('Localisation'),
    date: Yup.date().label('Date'),
    title: Yup.string().required().min(3, 'Entrez un titre').label('Titre'),
    description: Yup.string().label('Description'),
    state: Yup.string()
      .required("Indiquez si c'est un objet perdu ou trouvé")
      .label('Satut'),
    images: Yup.array(),
    tel: Yup.string().label('Téléphone'),
    email: Yup.string().email('Entrez une adresse email valide').label('Email'),
    facebook: Yup.string().label('Facebook'),
    snapchat: Yup.string().label('Snapchat'),
    twitter: Yup.string().label('Twitter'),
    instagram: Yup.string().label('Instagram'),
  }),
};
const initialValues = {
  missings: {
    images: [],
    title: '',
    description: '',
    age: '',
    date: new Date(),
    location: { name: '' },
    corpulence: '',
    height: '',
    hair: '',
    eyes: '',
    outfit: '',
    other: '',
    email: '',
    tel: '',
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
  },
  students: {
    name: '',
    date: '',
    type: '',
    domain: '',
    location: { name: '' },
    length: '',
    tel: '',
    email: '',
    title: '',
    description: '',
    images: [],
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
  },
  animals: {
    name: '',
    location: { name: '' },
    race: '',
    sexe: '',
    title: '',
    date: new Date(),
    other: '',
    description: '',
    tel: '',
    email: '',
    images: [],
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
  },
  objects: {
    location: { name: '' },
    title: '',
    date: new Date(),
    description: '',
    tel: '',
    email: '',
    images: [],
    state: '',
    facebook: '',
    instagram: '',
    twitter: '',
    snapchat: '',
  },
};

const Missings = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //uploading the images in the storage
  const uploadImages = async (values, postToEdit) => {
    let images = values.images;
    const childPath = `${values.postType}/${
      firebase.auth().currentUser.uid
    }/${uuidv4()}.png`;

    await Promise.all(
      images.map(async (image) => {
        if (!image.includes('https')) {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = firebase.storage().ref().child(childPath);

          await ref.put(blob).then((result) => {
            images.push(result.metadata.name);
          });
          await ref.getDownloadURL(blob).then((result) => {
            images.pop();
            images.push(result);
          });
        }
      })
    ).then(() => {
      images = images.filter((im) => im.includes('https'));
      edit ? editPost(postToEdit, values, images) : savePost(values, images);
    });
  };
  //saving post
  const savePost = (values, images) => {
    //delete all empty strings
    for (const key in values) {
      if (values[key] === '') {
        delete values[key];
      }
    }
    let doc = firebase
      .firestore()
      .collection(values.postType)
      .add({
        ...values,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        state: 'Disparu(e)',
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...values,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          state: 'Disparu(e)',
          userID: firebase.auth().currentUser.uid,
        };
        dispatch(addUserPost(newpost));
      });
  };
  //editing post
  const editPost = (postToEdit, values, images) => {
    values = { ...values, images };
    firebase
      .firestore()
      .collection('missings')
      .doc(postToEdit.id)
      .update(values)
      .then(() => {
        postToEdit = { ...postToEdit, values };
        dispatch(updateUserPost(post));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  let postValues = {};
  //existing values ready to be modfied
  if (post) {
    postValues = {
      images: post.images ? post.images : [],
      title: post.title,
      description: post.description ? post.description : '',
      age: post.age ? post.age : '',
      date: post.date.toDate(),
      location: post.location,
      corpulence: post.corpulence ? post.corpulence : '',
      height: post.height ? post.height : '',
      hair: post.hair ? post.hair : '',
      eyes: post.eyes ? post.eyes : '',
      outfit: post.outfit ? post.outfit : '',
      other: post.other ? post.other : '',
      email: post.email ? post.email : '',
      tel: post.tel ? post.tel : '',
      facebook: post.facebook ? post.facebook : '',
      snapchat: post.snapchat ? post.snapchat : '',
      twitter: post.twitter ? post.twitter : '',
      instagram: post.instagram ? post.instagram : '',
    };
  }
  return (
    <MultiForm
      validationSchema={validationSchema.missings}
      progress={changeProgress}
      initialValues={post ? postValues : initialValues.missings}
      onSubmit={(values, formikActions) => {
        try {
          values = { ...values, postType: 'missings' };
          // //no images
          if (!values.images) edit ? editPost(values, post) : savePost(values);

          edit ? uploadImages(values, post) : uploadImages(values);

          //reset form
          formikActions.resetForm();

          navigation.navigate('SharingView', { post: values });
        } catch (error) {
          console.log(`error`, error);
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Signalement</AppText>
        <ImagePicker name="images" required={true} />

        <AppFormField
          required
          name="title"
          placeholder="Nom, prénom"
          icon="account"
        />
        <AppFormField
          name="age"
          keyboardType="numeric"
          maxLength={3}
          placeholder="Age"
          width={'22%'}
        />
        <LocationSearchBar
          placeholder="Dernière localisation"
          name="location"
          required
        />
        <DateInput
          name="date"
          placeholder="Date de disparition"
          icon="calendar-today"
        />
        <AppFormField
          name="description"
          placeholder="Message"
          multiline
          numberOfLines={3}
        />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Description physique</AppText>
        <AppFormField
          name="corpulence"
          placeholder="Corpulence"
          style2={{ width: '75%' }}
        />
        <AppFormField
          name="height"
          keyboardType="numeric"
          maxLength={3}
          placeholder="Taille(cm)"
          width={'31%'}
        />

        <AppFormField name="hair" placeholder="Cheveux" />
        <AppFormField name="eyes" placeholder="Yeux" />
        <AppFormField
          name="outfit"
          placeholder="Tenue vestimentaire"
          multiline
          numberOfLines={4}
        />
        <AppFormField
          name="other"
          placeholder="Signe particulier, autre..."
          multiline
          numberOfLines={4}
        />
      </View>
      {
        //Form 3
      }
      <View>
        <AppText style2={styles.title}>Contact</AppText>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <AppFormField
            width={'40%'}
            name="tel"
            placeholder="Téléphone"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="facebook"
            placeholder="Facebook"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="twitter"
            placeholder="Twitter"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="instagram"
            placeholder="Instagram"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="snapchat"
            placeholder="Snapchat"
            width={'40%'}
            autoCapitalize="none"
          />
        </View>

        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  );
};

const Students = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //uploading the images in the storage
  //uploading the images in the storage
  const uploadImages = async (values, postToEdit) => {
    let images = values.images;
    const childPath = `${values.postType}/${
      firebase.auth().currentUser.uid
    }/${uuidv4()}.png`;

    await Promise.all(
      images.map(async (image) => {
        if (!image.includes('https')) {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = firebase.storage().ref().child(childPath);

          await ref.put(blob).then((result) => {
            images.push(result.metadata.name);
          });
          await ref.getDownloadURL(blob).then((result) => {
            images.pop();
            images.push(result);
          });
        }
      })
    ).then(() => {
      images = images.filter((im) => im.includes('https'));
      edit ? editPost(postToEdit, values, images) : savePost(values, images);
    });
  };
  //saving post
  const savePost = (values, images) => {
    //delete all empty strings
    for (const key in values) {
      if (values[key] === '') {
        delete values[key];
      }
    }
    let doc = firebase
      .firestore()
      .collection(values.postType)
      .add({
        ...values,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...values,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          userID: firebase.auth().currentUser.uid,
        };
        dispatch(addUserPost(newpost));
      });
  };
  //editing post
  const editPost = (postToEdit, values, images) => {
    values = { ...values, images };

    firebase
      .firestore()
      .collection('students')
      .doc(postToEdit.id)
      .update(values)
      .then(() => {
        postToEdit = { ...postToEdit, values };
        dispatch(updateUserPost(post));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  let postValues = {};
  //existing values ready to be modfied
  if (post) {
    postValues = {
      name: post.name ? post.name : '',
      type: post.type ? post.type : '',
      domain: post.domain,
      location: post.location ? post.location : { name: '' },
      length: post.length ? post.length : '',
      title: post.title,
      description: post.description ? post.description : '',
      images: post.images ? post.images : [],
      email: post.email ? post.email : '',
      tel: post.tel ? post.tel : '',
      facebook: post.facebook ? post.facebook : '',
      snapchat: post.snapchat ? post.snapchat : '',
      twitter: post.twitter ? post.twitter : '',
      instagram: post.instagram ? post.instagram : '',
    };
  }
  return (
    <MultiForm
      validationSchema={validationSchema.students}
      initialValues={post ? postValues : initialValues.students}
      progress={changeProgress}
      onSubmit={(values, formikActions) => {
        try {
          values = { ...values, postType: 'students' };
          //no images
          if (!values.images) {
            edit
              ? editPost(values, post)
              : savePost(
                  values[
                    'https://firebasestorage.googleapis.com/v0/b/wanted-316010.appspot.com/o/assets%2Fpp.png?alt=media&token=f564d417-d3ce-48f8-a211-3589664c0a03'
                  ]
                );
          }
          if (edit) uploadImages(values, post);
          else {
            uploadImages(values);
          }

          //reset form
          formikActions.resetForm();

          navigation.navigate('SharingView', { post: values });
        } catch (error) {
          console.log(`error`, error);
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Annonce</AppText>
        <SelectRadio name="type" typeValues={['Alternance', 'Job', 'Stage']} />

        <AppFormField name="title" placeholder="Titre" required />
        <AppFormField
          name="description"
          placeholder="Description"
          multiline
          numberOfLines={4}
        />

        <AppFormField name="domain" placeholder="Domaine" required />
        <AppFormField name="length" placeholder="Durée" />
        <LocationSearchBar placeholder="Lieu" name="location" />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Détails</AppText>
        <ImagePicker name="images" />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <AppFormField
            width={'40%'}
            name="tel"
            placeholder="Téléphone"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="facebook"
            placeholder="Facebook"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="twitter"
            placeholder="Twitter"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="instagram"
            placeholder="Instagram"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="snapchat"
            placeholder="Snapchat"
            width={'40%'}
            autoCapitalize="none"
          />
        </View>
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  );
};
const Animals = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //uploading the images in the storage
  //uploading the images in the storage
  const uploadImages = async (values, postToEdit) => {
    let images = values.images;
    console.log('images', images);
    const childPath = `${values.postType}/${
      firebase.auth().currentUser.uid
    }/${uuidv4()}.png`;

    await Promise.all(
      images.map(async (image) => {
        if (!image.includes('https')) {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = firebase.storage().ref().child(childPath);

          await ref.put(blob).then((result) => {
            images.push(result.metadata.name);
          });
          await ref.getDownloadURL(blob).then((result) => {
            images.pop();
            images.push(result);
          });
        }
      })
    ).then(() => {
      images = images.filter((im) => im.includes('https'));
      edit ? editPost(postToEdit, values, images) : savePost(values, images);
    });
  };
  //saving post
  const savePost = (values, images) => {
    //delete all empty strings
    for (const key in values) {
      if (values[key] === '') {
        delete values[key];
      }
    }
    let doc = firebase
      .firestore()
      .collection(values.postType)
      .add({
        ...values,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        state: 'Disparu(e)',
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...values,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          state: 'Disparu(e)',
          userID: firebase.auth().currentUser.uid,
        };
        dispatch(addUserPost(newpost));
      });
  };
  //editing post
  const editPost = (postToEdit, values, images) => {
    values = { ...values, images };

    firebase
      .firestore()
      .collection('animals')
      .doc(postToEdit.id)
      .update(values)
      .then(() => {
        postToEdit = { ...postToEdit, values };
        dispatch(updateUserPost(post));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  let postValues = {};
  //existing values ready to be modfied
  if (post) {
    postValues = {
      images: post.images,
      title: post.title,
      description: post.description ? post.description : '',
      name: post.name,
      date: post.date.toDate(),
      location: post.location,
      sexe: post.sexe ? post.sexe : '',
      race: post.race ? post.race : '',
      other: post.other ? post.other : '',
      email: post.email ? post.email : '',
      tel: post.tel ? post.tel : '',
      facebook: post.facebook ? post.facebook : '',
      snapchat: post.snapchat ? post.snapchat : '',
      twitter: post.twitter ? post.twitter : '',
      instagram: post.instagram ? post.instagram : '',
    };
  }
  return (
    <MultiForm
      validationSchema={validationSchema.animals}
      progress={changeProgress}
      initialValues={post ? postValues : initialValues.animals}
      onSubmit={(values, formikActions) => {
        try {
          values = { ...values, postType: 'animals' };
          //no images
          if (!values.images) {
            edit ? editPost(values, post) : savePost(values);
          }
          if (edit) uploadImages(values, post);
          else {
            uploadImages(values);
          }

          //reset form
          formikActions.resetForm();

          navigation.navigate('SharingView', { post: values });
        } catch (error) {
          console.log(`error`, error);
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Signalement</AppText>
        <ImagePicker name="images" required={true} />
        <AppFormField required name="title" placeholder="Titre" />
        <AppFormField
          name="description"
          placeholder="Message ou description"
          multiline
          numberOfLines={3}
        />
        <LocationSearchBar
          placeholder="Dernière localisation"
          name="location"
          required
        />
        <DateInput
          name="date"
          placeholder="Date de disparition"
          icon="calendar-today"
        />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Description</AppText>
        <AppFormField required name="name" placeholder="Nom" />

        <SelectRadio name="sexe" typeValues={['Femelle', 'Mâle']} />
        <AppFormField name="race" placeholder="Race" />

        <AppFormField
          name="other"
          placeholder="Signe particulier, autre..."
          multiline
          numberOfLines={4}
        />
      </View>
      {
        //Form 3
      }
      <View>
        <AppText style2={styles.title}>Contact</AppText>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <AppFormField
            width={'40%'}
            name="tel"
            placeholder="Téléphone"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="facebook"
            placeholder="Facebook"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="twitter"
            placeholder="Twitter"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="instagram"
            placeholder="Instagram"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="snapchat"
            placeholder="Snapchat"
            width={'40%'}
            autoCapitalize="none"
          />
        </View>
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  );
};
const Objects = ({ changeProgress, post, edit }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //uploading the images in the storage
  const uploadImages = async (values, postToEdit) => {
    let images = values.images;
    const childPath = `${values.postType}/${
      firebase.auth().currentUser.uid
    }/${uuidv4()}.png`;

    await Promise.all(
      images.map(async (image) => {
        if (!image.includes('https')) {
          const response = await fetch(image);
          const blob = await response.blob();
          const ref = firebase.storage().ref().child(childPath);

          await ref.put(blob).then((result) => {
            images.push(result.metadata.name);
          });
          await ref.getDownloadURL(blob).then((result) => {
            images.pop();
            images.push(result);
          });
        }
      })
    ).then(() => {
      images = images.filter((im) => im.includes('https'));
      edit ? editPost(postToEdit, values, images) : savePost(values, images);
    });
  };
  //saving post
  const savePost = (values, images) => {
    //delete all empty strings
    for (const key in values) {
      if (values[key] === '') {
        delete values[key];
      }
    }
    let doc = firebase
      .firestore()
      .collection(values.postType)
      .add({
        ...values,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        images: images,
        state: values.state,
        userID: firebase.auth().currentUser.uid,
      })
      .then((result) => {
        const newpost = {
          ...values,
          id: result.id,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          images: images,
          state: values.state,
          userID: firebase.auth().currentUser.uid,
        };
        dispatch(addUserPost(newpost));
      });
  };
  //editing post
  const editPost = (postToEdit, values, images) => {
    values = { ...values, images };

    firebase
      .firestore()
      .collection('objects')
      .doc(postToEdit.id)
      .update(values)
      .then(() => {
        postToEdit = { ...postToEdit, values };
        dispatch(updateUserPost(post));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };
  let postValues = {};
  //existing values ready to be modfied
  if (post) {
    postValues = {
      images: post.images,
      title: post.title,
      description: post.description ? post.description : '',
      date: post.date.toDate(),
      location: post.location,
      state: post.state,
      email: post.email ? post.email : '',
      tel: post.tel ? post.tel : '',
      facebook: post.facebook ? post.facebook : '',
      snapchat: post.snapchat ? post.snapchat : '',
      twitter: post.twitter ? post.twitter : '',
      instagram: post.instagram ? post.instagram : '',
    };
  }
  return (
    <MultiForm
      validationSchema={validationSchema.objects}
      progress={changeProgress}
      initialValues={post ? postValues : initialValues.objects}
      onSubmit={(values, formikActions) => {
        try {
          values = { ...values, postType: 'objects' };
          //no images
          if (!values.images.length) {
            edit ? editPost(values, post) : savePost(values);
          }
          if (edit) uploadImages(values, post);
          else {
            uploadImages(values);
          }

          //reset form
          formikActions.resetForm();

          navigation.navigate('SharingView', { post: values });
        } catch (error) {
          console.log(`error`, error);
        }
      }}
    >
      {
        //Form 1
      }
      <View>
        <AppText style2={styles.title}>Signalement</AppText>
        <ImagePicker name="images" required={true} />
        <SelectRadio name="state" typeValues={['Perdu', 'Trouvé']} />
        <AppFormField required name="title" placeholder="Titre" />
        <AppFormField
          name="description"
          placeholder="Message ou description"
          multiline
          numberOfLines={3}
        />
        <LocationSearchBar
          placeholder="Dernière localisation"
          name="location"
          required
        />
        <DateInput
          name="date"
          placeholder="Date de la perte"
          icon="calendar-today"
        />
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Les champs en rouge sonts requis
        </AppText>
      </View>
      {
        //Form 2
      }
      <View>
        <AppText style2={styles.title}>Contact</AppText>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <AppFormField
            width={'40%'}
            name="tel"
            placeholder="Téléphone"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="facebook"
            placeholder="Facebook"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="twitter"
            placeholder="Twitter"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="instagram"
            placeholder="Instagram"
            width={'40%'}
            autoCapitalize="none"
          />
          <AppFormField
            name="snapchat"
            placeholder="Snapchat"
            width={'40%'}
            autoCapitalize="none"
          />
        </View>
        <AppText
          style2={{ color: colors.danger, fontSize: 12, marginLeft: 16 }}
        >
          Ces informations seront affichées dans l'annonce
        </AppText>
      </View>
    </MultiForm>
  );
};
export { Missings, Students, Animals, Objects };
const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    fontWeight: '600',
    marginVertical: 15,
  },
});
