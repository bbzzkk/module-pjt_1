import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Sorting from '@/components/workspace/Main/Documents/Filtering/Sorting';
import S from './style'

const Searching = (props) => {
  return (
  <>
    <S.Container>
    
      <S.Searchbox type="text" placeholder="Search with Title..."/>
      <S.Searchbutton type="submit" > 
        <SearchIcon/>
      </S.Searchbutton>
    <Sorting />
    </S.Container>
  </>
  )
}


export default Searching;