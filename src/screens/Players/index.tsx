import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { ButtonIcon } from "@components/ButtonIcon/inde";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { Alert, FlatList, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";





type RouteParams = {
    group: string;
}

export function Players() {
    const [ isLoading, setisLoading ] = useState(true)
    const [ team, setTeam ] = useState('Time A');
    const [ players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [ newPlayerName, setnewPlayerName ] = useState('')

    const navigation = useNavigation()
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar')
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur()

            setnewPlayerName('')
            fetchPlayersBytTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message)
            }else{
                Alert.alert('Nova Pessoa', 'Não foi possîvel adicionar.')
            }
        }
    }

    async function fetchPlayersBytTeam() {
        try {
            setisLoading(true)
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam);
            setisLoading(false)
        } catch (error) {
            Alert.alert('Pessoa', 'Não foi possivel carregar as pessoas do time selecionado.')
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersBytTeam()
        } catch (error) {
            Alert.alert('Remover', 'Não foi possivel remover essa pessoa')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')
        } catch (error) {
            Alert.alert('Remover grupo', 'Não foi possivel remover o grupo')
        }
    }

    async function handleGroupeRemove() {
        Alert.alert('Remover', 
            'Deseja remover o Grupo ?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => groupRemove()
                }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersBytTeam();
    }, [team])

    return(
        <Container>
            <Header
            showBackButton
            />
            <Highlight
            title={group}
            subtitle="adicione a galera e separe os times"
            />
            <Form>
                <Input
                inputRef={newPlayerNameInputRef}
                placeholder="Nome da pessoa"
                autoCorrect={false}
                onChangeText={setnewPlayerName}
                value={newPlayerName}
                onSubmitEditing={handleAddPlayer}
                returnKeyType="done"
                />

                <ButtonIcon
                type="PRIMARY"
                icon="add"
                onPress={handleAddPlayer}
                />

            </Form>

            <HeaderList>
            <FlatList
                data={['Time A', 'Time B']}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Filter
                    isActive={item === team}
                    title={item}
                    onPress={() => setTeam(item)}
                    />
                )}
                horizontal={true}
            />
            <NumbersOfPlayers>
                Jogadores: {players.length}
            </NumbersOfPlayers>
            </HeaderList>

            {
            isLoading ? <Loading/> :
                
            <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
                <PlayerCard
                name={item.name}
                OnRemove={() => handleRemovePlayer(item.name)}
                />
            )}
            ListEmptyComponent={() => (
            <ListEmpty 
            message='Não a pessoas nesse time'
            />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && {flex: 1}]}
            />
            }

            <Button
            title="Remover Turma"
            type="SECONDARY"
            onPress={handleGroupeRemove}
            />
        </Container>
    )
}