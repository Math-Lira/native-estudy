import { useNavigation } from '@react-navigation/native';
import { Container, Logo, BackIcon, BackButton } from './styles'
import logoImg from '@assets/logo.png'

type Props = {
    showBackButton?: boolean;
}

export function Header ({showBackButton = false}: Props) {
    const navigation = useNavigation();

    function handlegoBack() {
        navigation.navigate('groups');
    }

    return(
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handlegoBack}>
                    <BackIcon/>
                </BackButton>
            }

            <Logo source={logoImg}/>
        </Container>
    );
}