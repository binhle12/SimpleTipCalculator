/**
 * Created by binhlt on 06/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, Picker, AsyncStorage} from 'react-native';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sceneTransition: "FloatFromRight"
        };
    }

    render() {
        return (
            <View style={{marginTop:50,padding:10}}>
                <View>
                    <Text style={{fontSize:25}}>Scene Transitions</Text>
                    <Picker
                        selectedValue={this.state.sceneTransition}
                        onValueChange={(scene) => this.setSelectSceneTransition(scene)}>
                        <Picker.Item label="FloatFromRight" value="FloatFromRight"/>
                        <Picker.Item label="FloatFromLeft" value="FloatFromLeft"/>
                        <Picker.Item label="FloatFromBottom" value="FloatFromBottom"/>
                        <Picker.Item label="FloatFromBottomAndroid" value="FloatFromBottomAndroid"/>
                        <Picker.Item label="SwipeFromLeft" value="SwipeFromLeft"/>
                        <Picker.Item label="HorizontalSwipeJump" value="HorizontalSwipeJump"/>
                        <Picker.Item label="HorizontalSwipeJumpFromRight" value="HorizontalSwipeJumpFromRight"/>
                    </Picker>
                </View>
            </View>
        );
    }

    setSelectSceneTransition(scene) {
        try {
            this.setSceneTransition(scene);
            this.setState({scene: scene});
        } catch (error) {
            console.log("Oop!! Something went wrong !!!" + error);
        }
    }

    async setSceneTransition(scene) {
        try {
            console.log("scene: " + scene);
            await AsyncStorage.setItem('SCENE_SELECTED', scene);
            this.setState({scene: scene});
        } catch (error) {
            console.log("Hmm, something went wrong when set data..." + error);
        }
    }

    async getSceneTransition() {
        try {
            let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
            this.setState({sceneTransition: sceneTransitionValue});
        } catch (error) {
            console.log("Hmm, something went wrong when get data..." + error);
        }
    }

    componentDidMount() {
        this.getSceneTransition();
    }
}

module.exports = Setting;