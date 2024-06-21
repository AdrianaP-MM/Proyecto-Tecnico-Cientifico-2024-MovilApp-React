// ButtonAction.js

import { View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function ButtonAction({ textoBoton, modo, Miicono }) {
  return (
    <View>
      <Button icon={Miicono} mode={modo} onPress={() => console.log('Pressed')}>
        {textoBoton}
      </Button>
    </View>
  );
}
