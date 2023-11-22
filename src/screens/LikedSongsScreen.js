import {
	View,
	Text,
	ScrollView,
	Pressable,
	TextInput,
	FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';

import {
	Ionicons,
	AntDesign,
	MaterialCommunityIcons,
	Entypo,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SongItem from '../components/SongItem';

const LikedSongsScreen = () => {
	const navigation = useNavigation();
	const [input, setInput] = useState('');
	const [savedTracks, setSaveTracks] = useState([]);
	useEffect(() => {
		getSavedTracks();
	}, []);

	const getSavedTracks = async () => {
		const accessToken = await AsyncStorage.getItem('token');
		try {
			const res = await fetch(
				'https://api.spotify.com/v1/me/tracks?offset=0&limit=50',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await res.json();
			setSaveTracks(data.items);
		} catch (error) {
			console.error('Get tracks error: ', error);
		}
	};
	const playTrack = async () => {};

	return (
		<LinearGradient colors={['#614385', '#516395']} style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1, marginTop: 50 }}>
				<Pressable
					style={{ marginHorizontal: 10 }}
					onPress={() => navigation.goBack()}
				>
					<Ionicons name="arrow-back" size={24} color="white" />
				</Pressable>

				<Pressable
					style={{
						marginHorizontal: 10,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Pressable
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 10,
							flex: 1,
							backgroundColor: '#42275a',
							padding: 9,
							borderRadius: 3,
							height: 40,
						}}
					>
						<AntDesign name="search1" size={24} color="white" />
						<TextInput
							value={input}
							onChangeText={(text) => setInput(text)}
							placeholder="Tìm bài hát yêu thích"
							placeholderTextColor={'white'}
						/>
					</Pressable>

					<Pressable
						style={{
							marginHorizontal: 10,
							backgroundColor: '#42275a',
							padding: 10,
							borderRadius: 3,
							height: 40,
						}}
					>
						<Text style={{ color: 'white' }}>Sort</Text>
					</Pressable>
				</Pressable>

				<View style={{ marginTop: 50, marginHorizontal: 10 }}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 'bold',
							color: 'white',
						}}
					>
						Liked Songs
					</Text>
					<Text
						style={{ color: 'white', fontSize: 13, marginTop: 5 }}
					>
						{savedTracks.length} songs
					</Text>
				</View>

				<Pressable
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center',
						marginHorizontal: 10,
					}}
				>
					<Pressable
						style={{
							width: 30,
							height: 30,
							backgroundColor: '#1D8954',
							borderRadius: 35,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<AntDesign name="arrowdown" size={20} color="white" />
					</Pressable>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<MaterialCommunityIcons
							name="cross-bolnisi"
							size={24}
							color="green"
						/>
						<Pressable
							style={{
								width: 60,
								height: 60,
								backgroundColor: '#1D8954',
								borderRadius: 35,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Entypo
								name="controller-play"
								size={24}
								color="white"
							/>
						</Pressable>
					</View>
				</Pressable>

				<FlatList
					data={savedTracks}
					renderItem={({ item, index }) => (
						<SongItem item={item} key={index} />
					)}
				/>
			</ScrollView>
		</LinearGradient>
	);
};

export default LikedSongsScreen;
