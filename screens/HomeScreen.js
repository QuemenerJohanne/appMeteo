import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { View, Dimensions, Text, AsyncStorage } from "react-native";
import { Image } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ContainerScroll from '../components/ContainerScroll';

const { height, width } = Dimensions.get('window');

const styleSheet = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: height * 0.1
    },
    textStyle: {
        paddingTop: height * 0.1,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
};

const HomeScreen = props => {

    /*  useEffect(() => {
         async function getName() {
             const temp = await AsyncStorage.getItem('name');
             setName(temp);
         }
         getName();
     }, []); */

    useEffect(() => {
        async function _getLocationAsync() {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                setError('Permisson to access location was deneid');
            }
            let location = await Location.getCurrentPositionAsync({});
            dispatch({ type: 'app/getMeteoInformations', payload: location });
        };
        _getLocationAsync();
    }, []);

    useEffect(() => {

        if (informations.main) {
            setNameCity(informations.name);
            setTemp(informations.main.temp);
            setTemp_max(informations.main.temp_max);
            setTemp_min(informations.main.temp_min);
            setHumidity(informations.main.humidity);
        }

    });
    const { dispatch, app: { informations } } = props;

    /*     const [userName, setName] = useState('')
     */
    const [name, setNameCity] = useState('');
    const [temp, setTemp] = useState('');
    const [temp_max, setTemp_max] = useState('');
    const [temp_min, setTemp_min] = useState('');
    const [humidity, setHumidity] = useState('');


    return (
        <ContainerScroll>
            <View>
                <Image
                    source={{
                        uri: 'http://www.donnery.fr/medias/sites/2/2015/02/meteo1.jpg'
                    }}
                    style={{ width: 400, height: 200 }}
                />
            </View>
            <View>
                {
                    informations.length > 0 ? informations.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            subtitleStyle={{ color: 'white' }}
                            bottomDivider
                            chevron={{ color: 'black', fontWeight: 'bold' }}
                            containerStyle={{
                                backgroundColor: '#ccf2ff',
                                justifyContent: 'space-around',
                            }}
                            onPress={() => props.navigation.navigate('Details', {
                                ville: item.name,
                                temp: item.main.temp,
                                temp_max: item.main.temp_max,
                                temp_min: item.main.temp_min,
                                humidity: item.main.humidity
                            })}

                        />

                    )) : <Text>Loading</Text>
                }
            </View>
        </ContainerScroll>)
};

HomeScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        informations: PropTypes.array,
    }).isRequired,
}

export default connect(({ app }) => ({ app }))(HomeScreen);