import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Header } from "@components/Header";
import { ButtonIcon } from "@components/ButtonIcon/inde";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

type RouteParams = {
    group: string;
}

export function Players() {
    const [ team, setTeam ] = useState('Time A');
    const [ players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [ newPlayerName, setnewPlayerName ] = useState('')
    
    const route = useRoute();
    const { group } = route.params as RouteParams;

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
            const playersByTeam = await playerGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam);
        } catch (error) {
            Alert.alert('Pessoa', 'Não foi possivel carregar as pessoas do time selecionado.')
        }
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
                placeholder="Nome da pessoa"
                autoCorrect={false}
                onChangeText={setnewPlayerName}
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
            <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
                <PlayerCard
                name={item.name}
                OnRemove={() => {}}
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
            <Button
            title="Remover Turma"
            type="SECONDARY"
            />
        </Container>
    )
}