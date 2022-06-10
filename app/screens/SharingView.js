import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Share, Platform } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

import colors from '../../config/colors';
import AppButton from '../components/AppButton';
import DetailsText2 from '../components/DetailsText2';
import IconButton from '../components/IconButton';
import SharingMissings from '../components/specifications/SharingMissings';
import SharingAnimals from '../components/specifications/SharingAnimals';
import SharingStudents from '../components/specifications/SharingStudents';
import SharingObjects from '../components/specifications/SharingObjects';
import { Alert } from 'react-native-web';

//listen for links

const SharingView = ({ route }) => {
  const viewRef = useRef();
  const [post, setpost] = useState(route.params.post);
  const [id, setid] = useState(route.params.id);
  const [capture, setcapture] = useState();
  const [libraryPermission, setlibraryPermission] = useState();

  const captureViewToImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });
      setcapture(uri);
      return uri;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    const image = await captureViewToImage();
    const permissionStatus = await MediaLibrary.requestPermissionsAsync();
    setlibraryPermission(permissionStatus.status === 'granted');

    if (permissionStatus === undefined) {
      return alert('Demande de permission');
    } else {
      MediaLibrary.saveToLibraryAsync(image).then(() => {
        alert(
          "L'avis de recherche a été téléchargée dans la galerie avec succès"
        );
      });
    }
  };

  const onShare2 = async () => {
    const { id, title, description, images } = post;

    try {
      const payload = {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://wantedapp.page.link',
          link: `https://wanted-316010.web.app/posts/${id}`,
          androidInfo: {
            androidPackageName: 'com.wantedapp',
          },

          iosInfo: {
            iosBundleId: 'com.wantedapp',
            iosAppStoreId: '1606514736',
          },
          socialMetaTagInfo: {
            socialTitle: title,
            socialDescription: description,
            socialImageLink: images[0],
          },
        },
      };
      const url =
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyD-ed3d_ZwYatoMBJr_FjlJXYzw1DFmnw0';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
     
      const result = await Share.share({
        message: json.shortLink,
        url: json.shortLink,
        title: title,
      });
     
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activity Type
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error', error);

      //ToastAndroid.show('Error', ToastAndroid.LONG);
    }
  };
  const handleShare = async () => {
    const image = await captureViewToImage();
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(getUrlFromFirebase(post.id));
  };

  const onShare = async () => {
    const image = await captureViewToImage();
    const link = await getUrlFromFirebase(post.id);
    const options = {
      url: image,
      message: link,
    };
    try {
      if (post.id) {
        const result = await Share.share(options);

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        paddingBottom: 50,
        backgroundColor: colors.light,
      }}
    >
      <View style={styles.container} ref={viewRef}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {post.postType === 'missings' ? (
            <SharingMissings post={post} />
          ) : post.postType === 'students' ? (
            <SharingStudents post={post} />
          ) : post.postType === 'animals' ? (
            <SharingAnimals post={post} />
          ) : (
            <SharingObjects post={post} />
          )}
        </View>
        <View
          style={{
            //  borderWidth: 2,
            // backgroundColor:"orange",
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {post.email ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'email'}
                size={20}
                color={colors.medium}
                style2={styles.icon}
              />
              <DetailsText2 text={post.email} />
            </View>
          ) : null}
          {post.tel ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'phone'}
                size={20}
                color={colors.medium}
                style2={styles.icon}
              />
              <DetailsText2 text={post.tel} />
            </View>
          ) : null}
          {post.twitter ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'twitter'}
                size={20}
                color={colors.medium}
                style2={styles.icon}
              />
              <DetailsText2 text={post.twitter} />
            </View>
          ) : null}
          {post.instagram ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'instagram'}
                size={20}
                style2={styles.icon}
                color={colors.medium}
              />
              <DetailsText2 text={post.instagram} />
            </View>
          ) : null}
          {post.facebook ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'facebook'}
                size={20}
                color={colors.medium}
                style2={styles.icon}
              />
              <DetailsText2 text={post.facebook} />
            </View>
          ) : null}
          {post.snapchat ? (
            <View style={styles.iconContainer}>
              <IconButton
                name={'snapchat'}
                size={20}
                color={colors.medium}
                style2={styles.icon}
              />
              <DetailsText2 text={post.snapchat} />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/icon.png')}
              style={{ height: 30, width: 30 }}
            />
            <Text
              style={{
                color: colors.secondary,
                fontSize: 12,
              }}
            >
              Créé avec l'appli Wanted
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          zIndex: 100,
          alignSelf: 'center',
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <AppButton
          title="Télécharger"
          onPress={handleSave}
          width={'50%'}
          color="white"
          text="primary"
        />
        <AppButton
          title="Partager"
          onPress={Platform.OS === 'ios' ? onShare2 : onShare2}
          width={'45%'}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 8,
    minHeight: '50%',
    height: '90%',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    color: colors.danger,
    paddingHorizontal: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  subText: {
    fontSize: 18,
    marginLeft: 4,
    marginTop: 4,
  },
  icon: { marginRight: -10, marginTop: 7 },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SharingView;
