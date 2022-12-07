/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [nasa, setNasa] = useState(null);

  const api = () => {
    fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' +
        date.getFullYear() +
        '-' +
        date.getMonth() +
        '-' +
        date.getDate(),
    )
      .then(response => response.json())
      .then(json => setNasa(json.url))
      .catch(error => console.log(error));
  };

  return (
    <View>
      <Text style={styles.date}> {date.toLocaleDateString('pt-br')}</Text>
      {!nasa ? (
        <View>
          <Button
            title="Alterar Data"
            onPress={() => setOpen(true)}
            style={styles.btn}
          />
          <Button title="Buscar" onPress={() => api()} style={styles.btn} />
          <DatePicker
            modal
            open={open}
            date={date}
            onDateChange={setDate}
            mode="date"
            locale="pt-br"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      ) : (
        <View>
          <Button onPress={() => setNasa(null)} title="Outro" />

          <Image source={{uri: nasa}} style={styles.img} resizeMode="contain" />
        </View>
      )}
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  btn: {marginVertical: 8},
  date: {
    fontSize: 24,
    color: 'orange',
  },
});
