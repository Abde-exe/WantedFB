import React, { useState } from "react"
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MaterialIcons } from "@expo/vector-icons"
import { useFormikContext } from "formik"

import dayjs from "dayjs"
import "dayjs/locale/fr"
dayjs.locale("fr")

import AppText from "./AppText"
import colors from "../../config/colors"

const DateInput = ({ placeholder, name }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext()

  const ios = Platform.OS == "ios" ? true : false
  const [date, setDate] = useState(values["date"])
  const [show, setShow] = useState(ios)
  const formattedDate = dayjs(date).format("D MMMM YYYY")

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(ios)
    setDate(currentDate)
    setFieldValue(name, currentDate)
  }

  return (
    <View
      style={{
        backgroundColor: colors.light,
        padding: 15,
        justifyContent: "flex-start",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
      }}
    >
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={colors.black}
            />
            <AppText
              style2={{ marginLeft: 8, color: "#979797", marginBottom: 8 }}
            >
              {placeholder}
            </AppText>
          </View>
          {ios ? null : <AppText>{formattedDate}</AppText>}
          {show && (
            <DateTimePicker
              onTouchStart={() => setFieldTouched(name)}
              maximumDate={new Date()}
              onChange={onChange}
              value={date}
              is24Hour={true}
              display="default"
              locale={"fr-FR"}
              textColor={colors.black}
              style={{
                width: "100%",
                height: 55,
                borderRadius: 10,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default DateInput

const styles = StyleSheet.create({})
