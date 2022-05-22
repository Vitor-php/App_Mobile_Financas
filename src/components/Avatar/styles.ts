import { StyleSheet } from 'react-native';
import { cos } from 'react-native-reanimated';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: 52,
        height: 52,
        borderRadius: 8,
        lineHeight: 10,
        marginRight: 22,
        alignItems: 'flex-end',
        marginTop: 35
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 8
        
    }
});