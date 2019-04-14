import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Dimensions} from 'react-native';

export const cMint = "#98FB98";
const width = Dimensions.get('window').width
export default class HomeTile extends Component {
	render() {
		let {onPress, tileName, desiredFontSize} = this.props;
		return (
			<View style={styles.tile}>
				<TouchableHighlight style={{}} 
					onPress={onPress}
					underlayColor={cMint}>
					<View style={{width: "100%", alignItems: "center"}}>
						<Text style={[styles.tileText, {fontSize: parseInt(desiredFontSize)}]}
							adjustsFontSizeToFit numberOfLines={2}>{tileName}</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	tile: {
		flexDirection: "column", 
        alignItems: 'center',
        backgroundColor: "white",
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 10,
		marginRight: 10,
        justifyContent: "center",
        position: "relative",
        width: Platform.OS === 'ios' ? '100%' : wrapperWidth,
        borderWidth: 2, 
        borderColor: "#E6E6E6", 
		borderRadius: 8,
		width: 150,
		height: 100,
	},
	tileText: {
		textAlignVertical: "center",
		fontSize: 20,
		textAlign: "center",
		backgroundColor:'rgba(0,0,0,0)'
	}
});