import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Text from '../components/utilidades/text';
import CardNoti from '../components/notificaciones/cardNoti';

export default function AppNotificaciones() {
    return (
        <View style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#ffffff" />
            <View style={styles.col}>
                <View style={styles.contenedorTitulo}>
                    <Text texto='Notificaciónes' font='PoppinsMedium' fontSize={25} />
                    <Image
                        source={require('../imagenes/iconCampana.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                </View>
                <Text texto='Tienes n notificaciónes nuevas' font='PoppinsRegular' fontSize={14} color='#6A6A6A' />
            </View>
            <ScrollView style={styles.scrollCards}>
                {<CardNoti />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingTop: 20,
        padding: 0,
    },
    col: {
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 20,
        backgroundColor: '#F9FAFB',
    },
    contenedorTitulo: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        marginLeft: 10,
        width: 25,
        height: 28,
    },
    scrollCards: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F9FAFB',
        paddingTop: 10,
    }
});
