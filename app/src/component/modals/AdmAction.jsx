import React, {useContext} from 'react';
import { useRoute } from '@react-navigation/native';
import Context from '../../context/Context';
import {Modal, StyleSheet, TouchableOpacity, View, Text, ScrollView} from 'react-native';

import AdoptionRequests from '../../services/adoption'
import MissingRequests from '../../services/missingAnimals'
import RescueRequests from '../../services/rescue'
import ComplainRequests from '../../services/complain'

const AdmAction = ({ show, action, selected, state }) => {
    const { loader, token } = useContext(Context);
    const route = useRoute();

    const condition = !!selected.name ? !selected.new : selected.new 

    const resquests = {
        adoption: AdoptionRequests,
        missing: MissingRequests,
        rescue: RescueRequests,
        complain: ComplainRequests,
    }

    const handleRemove = async () => {
        const param = route.name.toLowerCase().replace('t', '');
        const request = resquests[param];
        const newList = state.list.filter(i => i.id !== selected.id);
        const type = !!selected.name ? (
            !selected.new ? 'approved' : 'pendente'
        ) : (
            !!selected.new ? 'approved' : 'pendente'
        );

        await request.delete(selected.id, token)

        if (param === 'rescue' || param === 'complain') {
            state.action(prev => ({pendente: [...prev.pendente, {...selected, new: false}], approved: newList}));
            action(false)
            return
        }
        
        state.action(prev => ({...prev, [type]: newList}));
        action(false)
    }

    const handleAdd = async () => {
        const param = route.name.toLowerCase().replace('t', '');
        const request = resquests[param];
        const newList = state.list.filter(i => i.id !== selected.id);
        const type = !!selected.name ? (
            !selected.new ? 'approved' : 'pendente'
        ) : (
            !!selected.new ? 'approved' : 'pendente'
        );

        await request.update(selected.id, token)
 
        state.action(prev => ({pendente: newList, approved: [...prev.approved, {...selected, new: (param === 'rescue' || param === 'complain') ? true : false}]}));
        action(false)
    }

    

    return !loader && (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
        >
            <TouchableOpacity onPress={() => action(false)} style={styles.mask} />
                <View style={styles.container}>
                    <View style={styles.content}>
                        {condition ? (
                            <>
                                <ScrollView style={{width: '100%',flex: 1, padding: 20}} scrollEventThrottle={null}>
                                    <View style={styles.contentContainer}>
                                        <Text style={styles.text}>{selected.description}</Text>
                                    </View>
                                </ScrollView>
                                <TouchableOpacity style={[styles.btn, {width: '100%'}]} onPress={handleRemove}>
                                    <Text style={styles.btn.text}>{!!selected.name ? 'Remover' : 'Arquivar'}</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <ScrollView style={{width: '100%',flex: 1, padding: 20}} scrollEventThrottle={null}>
                                    <View style={styles.contentContainer}>
                                        <Text style={styles.text}>{selected.description}</Text>
                                    </View>
                                </ScrollView>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'green', width: !!selected.name ? "50%" : "100%" }]} onPress={handleAdd}>
                                        <Text style={styles.btn.text}>{!!selected.name ? 'Aceitar' : 'Reativar'}</Text>
                                    </TouchableOpacity>
                                    {!!selected.name && (
                                        <TouchableOpacity style={[styles.btn, {width: "50%"}]} onPress={handleRemove}>
                                            <Text style={styles.btn.text}>Recusar</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </>
                        )}
                    </View>
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        overflow: 'hidden',
        width: '85%',
        height: '40%',
        margin: 20,
        backgroundColor: 'gray',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    mask: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },

    contentContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600'
    },
    btn: {
        position: 'relative',
        top: 0,
        backgroundColor: '#D2042D',
        
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        text: {
            fontSize: 22,
            fontWeight: '800',
            textAlign: 'center'
        }
    }
});

export default AdmAction;