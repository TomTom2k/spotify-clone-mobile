import { ModalPortal } from 'react-native-modals';
import PlayerContext from './src/PlayerContext';
import Navigation from './src/StackNavigator';

export default function App() {
	return (
		<PlayerContext>
			<Navigation />
			<ModalPortal />
		</PlayerContext>
	);
}
