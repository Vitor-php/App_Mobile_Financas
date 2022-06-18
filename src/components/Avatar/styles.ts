import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 50,
        borderWidth: 3,
        marginTop: 45,
        left: 210,
        marginRight: 22,
        borderColor: 'white',
        position: 'absolute',
    },       
    borderAvatar: {
        backgroundColor: '#fff',
        width: 150,
        height: 58,
        borderRadius: 50,
        marginTop: 45,
        left: 210,
        marginRight: -45,
    },
    viewModal: {
        width: 150,
        height: 140,
        backgroundColor: '#fff',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 20,
        top: 300,
        left: 115,
        margin: 20,
        shadowColor: '#1a1a1a',
        shadowOpacity: 0.4,
        shadowRadius: 10
    },
    modalText: {
        fontSize: 20,
        textAlign: 'center',
        top: -2
    },
    modalSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        top: 8.5
    },
    closeModalIcon: {
        left: 62,
        top: -8
    }
});