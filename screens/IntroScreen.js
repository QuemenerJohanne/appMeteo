import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { View, Dimensions, AsyncStorage } from "react-native";
import { Header, Image, Avatar } from 'react-native-elements';
import { Block, Button, Card, Icon, Input, NavBar, Text } from 'galio-framework';


const { height, width } = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262626'
    },
    textStyle: {
        paddingTop: height * 0.1,
        color: '#33ccff',
        fontSize: 25,
        fontWeight: 'bold'
    },
};


const IntroScreen = props => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('App');
        }, 5000);
    }, []);

    const { app: { name } } = props;
    return (
        <View style={styleSheet.container}>
            <Image
                source={{ uri: 'https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar9.png' }}
                style={{ width: 200, height: 200 }}
            />
            <Text style={styleSheet.textStyle}>{`Hello ${name}`}</Text>
        </View>);
};

IntroScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

export default connect(({ app }) => ({ app }))(IntroScreen);