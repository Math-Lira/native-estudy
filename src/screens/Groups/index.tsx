import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/CroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { groupGetAll } from '@storage/group/groupGetAll';

import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


export function Groups() {
  const [ groups, setGroups ] = useState<string[]>([]);
  const [ isLoading, setisLoading ] = useState(true)

  const navigation = useNavigation();

  function handleNewGroup () {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setisLoading(true)

      const data = await groupGetAll()

      setGroups(data);

    } catch (error) {
      Alert.alert('Turmas','Não foi possivel carregar as turmas')
    } finally{
      setisLoading(false)
    }
  }

  function handleOpenGruop(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      {
        isLoading ? <Loading/> :
      
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
          onPress={() => handleOpenGruop(item)} 
          title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty 
          message='Que tal cadastrar a primeira turma?'
          />
        )}
      />
      }

      <Button
      title='Criar nova turma'
      type='PRIMARY'
      onPress={handleNewGroup}
      />
    </Container>
  );
}
