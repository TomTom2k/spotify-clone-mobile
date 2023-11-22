import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

const RecentlyPlayedCard = ({ item }) => {
	return (
		<Pressable style={{ margin: 10 }}>
			<Image
				style={{ height: 130, width: 130, borderRadius: 5 }}
				source={{ uri: item.track.album.images[0].url }}
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
				{item?.track?.name}
			</Text>
		</Pressable>
	);
};

export default RecentlyPlayedCard;
