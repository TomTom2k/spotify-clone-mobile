import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { Entypo, AntDesign } from '@expo/vector-icons';
const SongItem = ({ item }) => {
	return (
		<Pressable
			style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}
		>
			<Image
				style={{ width: 50, height: 50, marginRight: 10 }}
				source={{ uri: item.track.album.images[0].url }}
			/>
			<View style={{ flex: 1 }}>
				<Text
					numberOfLines={1}
					style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}
				>
					{item.track.name}
				</Text>
				<Text style={{ color: 'gray', marginTop: 4 }}>
					{item.track.artists[0].name}
				</Text>
			</View>

			<View
				style={{
					flexDirection: 'row',
					gap: 7,
					marginHorizontal: 10,
				}}
			>
				<AntDesign name="heart" size={24} color="green" />
				<Entypo name="dots-three-vertical" size={24} color="green" />
			</View>
		</Pressable>
	);
};

export default SongItem;
