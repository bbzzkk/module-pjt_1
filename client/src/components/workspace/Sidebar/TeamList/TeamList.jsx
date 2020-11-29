import React, { useEffect } from 'react';

import AddTeam from './AddTeam';
import Team from './Team';
import S from './style';
import { inject, observer } from 'mobx-react';

const TeamList = props => {
  const { user } = props.store.authStore;
  const { teamList, getTeamList } = props.store.teamStore;
  useEffect(() => {
    getTeamList(user.id);
  }, [teamList]);
  return (
    <S.List>
      <S.ListItem>
        <S.ListItemText primary="Teams" />
        <AddTeam />
      </S.ListItem>
      <S.List component="div" disablePadding>
        {teamList.map(team => {
          console.log('this is teamList map');
          console.log(team);
          return <Team key={team.teamId} team={team} />;
        })}
      </S.List>
    </S.List>
  );
};

export default inject('store')(observer(TeamList));