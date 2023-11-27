import {
	ScrollView,
	StyleSheet,
	Image,
	View,
	Text,
	Pressable,
	FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import ArtistsCard from '../components/ArtistsCard';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
	const navigation = useNavigation();
	const [userProfile, setUserProfile] = useState();
	const [recentlyPlayed, setRecentlyPlayed] = useState([]);
	const [topArtists, setTopArtists] = useState([]);

	useEffect(() => {
		getProfile();
		getRecentlyPlayedSongs();
		getTopItems();
	}, []);
	const getProfile = async () => {
		const accessToken = await AsyncStorage.getItem('token');
		try {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const data = await res.json();
			setUserProfile(data);
		} catch (error) {
			console.error('Get user profile error: ', error);
		}
	};
	const getRecentlyPlayedSongs = async () => {
		const accessToken = await AsyncStorage.getItem('token');
		try {
			const res = await fetch(
				'https://api.spotify.com/v1/me/player/recently-played?limit=4',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await res.json();
			setRecentlyPlayed(data.items);
		} catch (error) {
			console.error('Get recent song error: ', error);
		}
	};
	const getTopItems = async () => {
		try {
			const accessToken = await AsyncStorage.getItem('token');
			if (!accessToken) {
				throw 'Error: Access token not found';
			}
			const type = 'artists';
			const res = await fetch(
				`https://api.spotify.com/v1/me/top/${type}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await res.json();
			setTopArtists(data.items);
		} catch (error) {
			console.error('Error get top: ', error);
		}
	};
	const renderItem = ({ item }) => {
		return (
			<Pressable
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginHorizontal: 10,
					marginVertical: 8,
					backgroundColor: '#282828',
					borderRadius: 4,
					elevation: 3,
				}}
			>
				<Image
					style={{ width: 55, height: 55 }}
					source={{ uri: item.track.album.images[0].url }}
				/>
				<View
					style={{
						flex: 1,
						marginHorizontal: 8,
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontSize: 13,
							fontWeight: 'bold',
							color: 'white',
						}}
					>
						{item?.track.name}
					</Text>
				</View>
			</Pressable>
		);
	};
	return (
		<LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
			<ScrollView
				style={{
					marginTop: 50,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						padding: 10,
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<Image
							style={{
								width: 40,
								height: 40,
								borderRadius: 20,
								resizeMode: 'cover',
							}}
							source={{ uri: userProfile?.images[0]?.url }}
						/>
						<Text
							style={{
								color: 'white',
								fontSize: 20,
								fontWeight: 'bold',
								marginLeft: 10,
							}}
						>
							{userProfile?.display_name}
						</Text>
					</View>

					<MaterialCommunityIcons
						name="lightning-bolt-outline"
						size={24}
						color="white"
					/>
				</View>

				<View
					style={{
						marginHorizontal: 12,
						marginVertical: 5,
						flexDirection: 'row',
						gap: 10,
					}}
				>
					<Pressable
						style={{
							backgroundColor: '#282828',
							padding: 10,
							borderRadius: 30,
						}}
					>
						<Text style={{ fontSize: 15, color: 'white' }}>
							Nhạc
						</Text>
					</Pressable>
					<Pressable
						style={{
							backgroundColor: '#282828',
							padding: 10,
							borderRadius: 30,
						}}
					>
						<Text style={{ fontSize: 15, color: 'white' }}>
							Podcasts
						</Text>
					</Pressable>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignContent: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Pressable
						onPress={() => navigation.navigate('Liked')}
						style={{
							flexDirection: 'row',
							marginHorizontal: 10,
							alignItems: 'center',
							gap: 10,
							flex: 1,
							marginVertical: 8,
							backgroundColor: '#202020',
							borderRadius: 4,
							elevation: 3,
							width: '50%',
						}}
					>
						<LinearGradient colors={['#33006f', '#ffffff']}>
							<Pressable
								style={{
									width: 55,
									height: 55,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<AntDesign
									name="heart"
									size={24}
									color="white"
								/>
							</Pressable>
						</LinearGradient>

						<Text
							style={{
								color: 'white',
								fontSize: 13,
								fontWeight: 'bold',
							}}
						>
							Bài hát yêu thích
						</Text>
					</Pressable>

					<View
						style={{
							flexDirection: 'row',
							marginHorizontal: 10,
							alignItems: 'center',
							gap: 10,
							flex: 1,
							marginVertical: 8,
							backgroundColor: '#202020',
							borderRadius: 4,
							elevation: 3,
							width: '50%',
						}}
					>
						<Image
							style={{ width: 55, height: 55 }}
							source={{
								uri: 'https://th.bing.com/th/id/OIP.-rtbHlhEgvjvA2y5tHjouwHaFj?rs=1&pid=ImgDetMain',
							}}
						/>
						<View>
							<Text
								style={{
									color: 'white',
									fontSize: 13,
									fontWeight: 'bold',
								}}
							>
								Hiphop Tamhiza
							</Text>
						</View>
					</View>
				</View>

				<FlatList
					data={recentlyPlayed}
					renderItem={renderItem}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
				/>

				<View>
					<Text
						style={{
							color: 'white',
							fontSize: 19,
							fontWeight: 'bold',
							marginHorizontal: 10,
							marginTop: 10,
						}}
					>
						Nghệ sĩ dành cho bạn
					</Text>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						{topArtists?.map((item, index) => (
							<ArtistsCard item={item} key={index} />
						))}
					</ScrollView>
				</View>

				<View>
					<Text
						style={{
							color: 'white',
							fontSize: 19,
							fontWeight: 'bold',
							marginHorizontal: 10,
							marginTop: 10,
						}}
					>
						Chương trình vừa phát
					</Text>
					<FlatList
						data={recentlyPlayed}
						horizontal
						showsHorizontalScrollIndicator
						renderItem={({ item, index }) => (
							<RecentlyPlayedCard item={item} key={index} />
						)}
					/>
				</View>
			</ScrollView>
		</LinearGradient>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
