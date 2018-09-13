import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Animated,
    Vibration
} from 'react-native';

import PropTypes from 'prop-types'; 

const DURATION = 200;

export default class AnimationButtonPress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animatePress: new Animated.Value(1)
        }
    }

    onVibrate(vibrate) {
        vibrate ? Vibration.vibrate(DURATION) : vibrate;
    }

    animatePressIn() {
        Animated.timing(this.state.animatePress, {
            toValue: 0.8,
            duration: 200
        }).start();
    }

    animatePressOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start();
    }

    render() {

        const { image, width, height, actionPress, vibrate } = this.props;

        return (
            <View>
                <TouchableWithoutFeedback
                    onPressIn={_ => { this.animatePressIn(); this.onVibrate(vibrate) }}
                    onPressOut={_ => this.animatePressOut() }
                    onPress={_ => actionPress() }
                    activeOpacity={0.7}>
                    <Animated.View style={{
                        transform: [{
                            scale: this.state.animatePress
                        }]
                    }}>
                        <Image
                            style={{ width: width, height: height }}
                            source={image} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

AnimationButtonPress.propTypes = {
    image: PropTypes.node.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    actionPress: PropTypes.func,
    vibrate: PropTypes.bool
};