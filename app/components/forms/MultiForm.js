import React, { useState } from 'react';
import { Formik } from 'formik';
import AppButton from '../AppButton';
import { Alert, Modal, Text, View } from 'react-native';
import SubmitButton from './SubmitButton';
import AppModal2 from '../AppModal2';
function MultiForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  progress,
}) {
  const childrenArray = React.Children.toArray(children);
  const oneStep = 1 / childrenArray.length; //part of one step progress in the form
  const [step, setstep] = useState(0);
  const currentChild = childrenArray[step];

  const errorModal = (errors) => {
    console.log(`errors`, errors);
    if (Object.keys(errors).length !== 0) {
      var err = '';
      for (var key in errors) {
        err = err + '•' + errors[key] + '\n\n';
      }
      Alert.alert('Erreur dans le formulaire', err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors }) => (
        <>
          {currentChild}
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-evenly',
              marginBottom: 40,
              paddingVertical: 10,
            }}
          >
            {step === childrenArray.length - 1 ? (
              <SubmitButton
                title="Valider"
                onPress={() => {
                  errorModal(errors);
                  onSubmit();
                  //progress(oneStep)
                }}
              />
            ) : null}
            {step < childrenArray.length - 1 ? (
              <AppButton
                title="Suivant"
                onPress={() => {
                  setstep((s) => s + 1);
                  progress(oneStep);
                }}
              />
            ) : null}
            {step > 0 ? (
              <AppButton
                color="white"
                text="primary"
                onPress={() => {
                  setstep((s) => s - 1);
                  progress(-oneStep);
                }}
                title="Retour"
              />
            ) : null}
          </View>
        </>
      )}
    </Formik>
  );
}

export default MultiForm;
