import React from 'react';
import PropTypes from 'prop-types'
import { ScrollView, SafeAreaView, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

const ContainerScroll = props => {
    const { styleScroll } = props;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styleScroll}
            >
                {props.children}
            </ScrollView>
        </SafeAreaView>
    );
}

ContainerScroll.propTypes = {
    styleScroll: PropTypes.object,
}

ContainerScroll.defaultProps = {
    styleScroll: {}
}

export default ContainerScroll;