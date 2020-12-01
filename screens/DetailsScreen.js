import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { View, Text, Dimensions, AsyncStorage } from "react-native";
import { Block, Button, Card, Icon, Input, NavBar } from 'galio-framework';


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
    errorstyle: {
        color: 'red',
        fontSize: 25,
        fontWeight: 'bold',
    },
};

const DetailsScreen = props => {

    const { navigation } = props;
    const tempMoy = navigation.getParam('temp');
    const tempMax = navigation.getParam('temp_max');
    const tempMin = navigation.getParam('temp_min');
    const humid = navigation.getParam('humidity');

    return (<View>
        <View style={styleSheet.container}>
            <Text style={styleSheet.textStyle}>
                {`${tempMoy}°C`}
            </Text>
            <Text style={styleSheet.textStyle}>
                {`${tempMax}°C max`}
            </Text>
            <Text style={styleSheet.textStyle}>
                {`${tempMin}°C min`}
            </Text>
            <Text style={styleSheet.textStyle}>
                {`Humidity: ${humid}%`}
            </Text>
            {/*  {error !== '' && <Text style={StyleSheet.errorstyle}>{error}</Text>} */}
        </View>
    </View>)
};

DetailsScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        informations: PropTypes.array,
    }).isRequired,
}

export default connect(({ app }) => ({ app }))(DetailsScreen);