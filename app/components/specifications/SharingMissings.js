import React from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Image, Text, View, StyleSheet } from 'react-native';
import DetailsText2 from '../DetailsText2';
import dayjs from 'dayjs';
import colors from '../../../config/colors';

const SharingMissings = ({ post }) => {
  if (post) {
    const {
      images,
      title,
      description,
      age,
      date,
      location,
      corpulence,
      height,
      hair,
      eyes,
      outfit,
      other,
    } = post;
    var date2 = '';
    date.seconds ? (date2 = date.toDate()) : (date2 = date);
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          {date2 && (
            <Text style={styles.title}>
              {`Disparu(e) depuis le ${dayjs(date2).format('D/M')} à `}
              {location.name && (
                <Text style={styles.title}>{location.name.split(',')[0]}</Text>
              )}
            </Text>
          )}
        </View>
        <View
          style={{
            // borderWidth: 2,
            borderColor: 'yellow',
            flexDirection: 'row',
            //height: "50%",
          }}
        >
          {images && (
            <Image
              source={{
                uri: post.images[0],
              }}
              style={{
                marginTop: 8,
                width: '50%',
                aspectRatio: 1,
                resizeMode: 'cover',
              }}
            />
          )}

          <View
            style={{
              //borderWidth: 1,
              borderColor: 'red',
              width: '50%',
              height: '100%',
            }}
          >
            {title ? <Text style={styles.text}>{title}</Text> : null}
            {age ? (
              <DetailsText2 row text={age} subText="Age :" other=" ans" />
            ) : null}
            {corpulence ? (
              <DetailsText2 row text={corpulence} subText="Corpulence :" />
            ) : null}
            {height ? (
              <DetailsText2 row text={height} subText="Taille :" other="cm" />
            ) : null}
            {hair ? <DetailsText2 row text={hair} subText="Cheveux :" /> : null}
            {eyes ? <DetailsText2 row text={eyes} subText="Yeux :" /> : null}
          </View>
        </View>
        {/* Description section */}
        <View
          style={{
            //borderWidth: 1,
            //backgroundColor: "blue",
            paddingTop: 16,
          }}
        >
          {description ? (
            <DetailsText2
              style={styles.subText}
              text={description.substring(0, 240)}
            ></DetailsText2>
          ) : null}

          {outfit ? (
            <DetailsText2 row text={outfit} subText="Tenue Vestimentaire :" />
          ) : null}
          {other ? (
            <DetailsText2 row text={other} subText="Signe Particulier :" />
          ) : null}
        </View>
      </View>
    );
  }
};

export default SharingMissings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //borderWidth: 1,
    padding: 8,
    margin: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(18),
    color: colors.danger,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginLeft: 4,
  },
  subText: {
    fontSize: RFValue(14),
    marginLeft: 4,
    marginTop: 4,
  },
});
