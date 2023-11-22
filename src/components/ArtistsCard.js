import { View, Text, Image } from 'react-native';
import React from 'react';

const ArtistsCard = ({ item }) => {
	return (
		<View style={{ margin: 10 }}>
			<Image
				style={{ width: 130, height: 130, borderRadius: 5 }}
				source={{ uri: item?.images[0].url }}
			/>
			<Text
				numberOfLines={1}
				style={{
					fontSize: 13,
					fontWeight: 'bold',
					color: 'white',
					marginTop: 10,
					width: 130,
				}}
			>
				{item?.name}
			</Text>
		</View>
	);
};

export default ArtistsCard;
