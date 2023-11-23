import React, { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
	useAuthRequest,
	makeRedirectUri,
	ResponseType,
} from 'expo-auth-session';
import { Entypo, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
	authorizationEndpoint: 'https://accounts.spotify.com/authorize',
	tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const config = {
	responseType: ResponseType.Token,
	clientId: 'e330ee38b91f4d20838b553b5f5697fd',
	scopes: [
		'user-read-email',
		'user-library-read',
		'user-read-recently-played',
		'user-top-read',
		'playlist-read-private',
		'playlist-read-collaborative',
		'playlist-modify-public', // or "playlist-modify-private"
	],
	usePKCE: false,
	redirectUri: makeRedirectUri({
		scheme: 'exp',
		host: 'localhost',
		path: '/--/spotify-auth-callback',
	}),
};

const LoginScreen = () => {
	const navigation = useNavigation();
	const [request, response, promptAsync] = useAuthRequest(config, discovery);

	useEffect(() => {
		const checkTokenValidity = async () => {
			const accessToken = await AsyncStorage.getItem('token');
			const timeExpiresInSeconds = await AsyncStorage.getItem(
				'timeExpiresInSeconds'
			);
			console.log(accessToken);
			console.log(timeExpiresInSeconds);
			console.log(Date.now());
			if (accessToken && timeExpiresInSeconds > Date.now()) {
				if (parseInt(Date.now()) < parseInt(timeExpiresInSeconds)) {
					// here the token is still valid
					navigation.navigate('Main');
				} else {
					AsyncStorage.removeItem('token');
					AsyncStorage.removeItem('timeExpiresInSeconds');
				}
			}
		};
		checkTokenValidity();
	}, [response]);

	const authenticate = async () => {
		try {
			const result = await promptAsync();
			if (result?.params) {
				const timeExpiresInSeconds =
					parseInt(Date.now()) + parseInt(result.params.expires_in);
				const token = result.params.access_token;

				AsyncStorage.setItem('token', token);
				AsyncStorage.setItem(
					'timeExpiresInSeconds',
					timeExpiresInSeconds.toString()
				);
				navigation.navigate('Main');
			}
		} catch (error) {
			console.error('Authentication error:', error);
		}
	};

	return (
		<LinearGradient colors={['#131624', '#040306']} style={{ flex: 1 }}>
			<View style={{ padding: 20 }}>
				<Entypo
					style={{ textAlign: 'center', marginVertical: 40 }}
					name="spotify"
					size={80}
					color="white"
				/>

				<Text
					style={{
						color: 'white',
						fontSize: 32,
						fontWeight: 'bold',
						textAlign: 'center',
						marginBottom: 40,
					}}
				>
					Hàng triệu bài hát. Miễn phí trên Spotify
				</Text>
				<View style={{ padding: 20 }}>
					<Pressable
						style={{
							backgroundColor: '#1Db954',
							padding: 15,
							marginLeft: 'auto',
							marginRight: 'auto',
							width: 300,
							borderRadius: 25,
							alignItems: 'center',
							marginBottom: 10,
						}}
						onPress={authenticate}
					>
						<Text style={{ fontWeight: 'bold', color: 'white' }}>
							Đăng ký miễn phí
						</Text>
					</Pressable>
					<Pressable
						style={{
							backgroundColor: '#040306',
							padding: 15,
							marginLeft: 'auto',
							marginRight: 'auto',
							width: 300,
							borderRadius: 25,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 10,
							position: 'relative',
							borderColor: '#c0c0c0',
							borderWidth: 0.8,
						}}
					>
						<Feather
							style={{ position: 'absolute', left: 15 }}
							name="smartphone"
							size={24}
							color="white"
						/>
						<Text style={{ fontWeight: 'bold', color: 'white' }}>
							Tiếp tục bằng số điện thoại
						</Text>
					</Pressable>
					<Pressable
						style={{
							backgroundColor: '#040306',
							padding: 15,
							marginLeft: 'auto',
							marginRight: 'auto',
							width: 300,
							borderRadius: 25,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 10,
							position: 'relative',
							borderColor: '#c0c0c0',
							borderWidth: 0.8,
						}}
					>
						<FontAwesome
							style={{ position: 'absolute', left: 15 }}
							name="google"
							size={24}
							color="white"
						/>
						<Text style={{ fontWeight: 'bold', color: 'white' }}>
							Tiếp tục bằng Google
						</Text>
					</Pressable>
					<Pressable
						style={{
							backgroundColor: '#040306',
							padding: 15,
							marginLeft: 'auto',
							marginRight: 'auto',
							width: 300,
							borderRadius: 25,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 10,
							position: 'relative',
							borderColor: '#c0c0c0',
							borderWidth: 0.8,
						}}
					>
						<FontAwesome5
							style={{ position: 'absolute', left: 15 }}
							name="facebook"
							size={24}
							color="white"
						/>
						<Text style={{ fontWeight: 'bold', color: 'white' }}>
							Tiếp tục bằng Facebook
						</Text>
					</Pressable>
				</View>
			</View>
		</LinearGradient>
	);
};

export default LoginScreen;
