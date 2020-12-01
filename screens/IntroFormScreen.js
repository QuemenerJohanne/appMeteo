import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Image } from 'react-native-elements';
import { Dimensions, AsyncStorage } from "react-native";
import { Block, Button, Card, Input, NavBar, Text } from 'galio-framework';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ContainerScroll from '../components/ContainerScroll';

const { height, width } = Dimensions.get('window');

const styleSheet = {

    scrollStyle: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#262626',
        justifyContent: 'center',
    },
};

const IntroFormScreen = props => {

    async function handleSubmit() {
        if (name !== '') {
            await AsyncStorage.setItem('name', name);
            dispatch({ type: 'app/setName', payload: { name } });
            navigation.navigate('Welcome');
        }
    }

    const [name, setName] = useState('');
    const { dispatch, navigation } = props;

    return (
        <ContainerScroll styleScroll={styleSheet.scrollStyle}>
            <Block style={{ flex: 3, marginTop: height * 0.1 }}>
                <FontAwesome5 style={styleSheet.icon} name={'cloud-sun-rain'} light size={200} color='#ccf2ff' />
            </Block>
            <Block style={{ flex: 1 }}>
                <Input style={styleSheet.input}
                    placeholder="enter your name" onChangeText={(text) => setName(text)} value={name} />
            </Block>
            <Block style={{ flex: 1, }}>
                <Button style={styleSheet.button}
                    onPress={handleSubmit} color='#33ccff' radius={15} size='small'>
                    valider</Button>
            </Block>
        </ContainerScroll>
    );
}

IntroFormScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired
}

export default connect()(IntroFormScreen);