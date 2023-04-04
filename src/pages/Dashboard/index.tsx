import React, {useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import  { NativeStackNavigationProp} from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/auth.routes'

import { api } from '../../services/api'

function Dashboard(){

    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const {user, signOut} = useContext(AuthContext)
    const [number, setNumber] = useState('')

    async function openOrder() {
        if(number === ''){
            alert('Digite alguma mesa')
            return;
        }

        const response = await api.post('/order',{
            table: Number(number)
        })

       navigation.navigate('Order', { number: number, order_id : response.data.id })

    //    console.log(response.data)

       setNumber('');
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder='Numero da mesa'
                placeholderTextColor='#f0f0f0'
                style={styles.input}
                keyboardType= 'numeric'
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor:'#1d1d2e'

    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }

})

export default Dashboard;