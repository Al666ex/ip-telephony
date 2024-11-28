import React,{useState,useEffect} from 'react'
import { Button, Input, Flex,Divider } from 'antd'
import { useFetch } from '../../hooks/useFetch'
import Spinner from '../../assets/spinner.svg'
import {setSearchPerson,setFindPerson,setSearchRefresh} from '../../app/ipPhoneSlice'
import { useSelector,useDispatch } from 'react-redux'
import {searchPersonAPI} from '../../http/userApi'
import Warning from './Warning'
import PersonFound from './PersonFound'
import PersonPhoneADD from './PersonPhoneADD'

const SearchPersons = () => {
  const searchPerson = useSelector(state => state.ipPhone.searchPerson);
  const searchRefresh = useSelector(state => state.ipPhone.searchRefresh);
  const dispatch = useDispatch();

  // Регулярное выражение для латинских букв, цифр и специальных символов
  const latinPattern = /^[A-ZŢţŞşĂăÂâŞşÎîȘșȚț0-9-\s]*$/;

  const [fetchFindQueries, loadingFind, error] = useFetch(async () => {
    dispatch(setFindPerson([]));
    let arrParams = [];
    let path = '';
    if (searchPerson.length) {
      arrParams = searchPerson.split(' ');
      if (arrParams[0]) {
        path = `?last_name=${arrParams[0]}`;
      }
      if (arrParams[1]) {
        path += `&first_name=${arrParams[1]}`;
      }
      const response = await searchPersonAPI(path);
      dispatch(setFindPerson(response.data));
    }
  });

  const handleKeyDown = (event) => {
    const inputValue = event.target.value.trim();
    const words = inputValue.split(/\s+/);
    if (words.length >= 2 && event.key === ' ') {
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    let inputValue = event.target.value.toUpperCase();

    // Проверка каждого символа на соответствие шаблону
    if (!latinPattern.test(inputValue)) {
      return; // Если символы не соответствуют шаблону, блокируем ввод
    }

    if (inputValue.startsWith(' ')) {
      inputValue = inputValue.trimStart();
    }

    const words = inputValue.trim().split(/\s+/);
    if (words.length <= 2) {
      dispatch(setSearchPerson(inputValue));
    } else {
      dispatch(setSearchPerson(words.slice(0, 2).join(' ')));
    }
  };

  const handleClear = () => {
    dispatch(setSearchPerson(''));
  };

  useEffect(() => {
    dispatch(setSearchPerson(searchPerson.replace(/ {2,}/g, ' ')));
    fetchFindQueries();
    dispatch(setSearchRefresh(false));
  }, [searchPerson, searchRefresh]);

  return (
    <div className="left">
      <Flex vertical justify="center">
        <h2 style={{ color: 'var(--color-almost-black)' }}>
          Caută după nume și prenume sau pe numărul de telefon
        </h2>
        <Input
          type="text"
          name="search"
          autoFocus
          placeholder="SURNAME NAME OR PHONE NUMBER"
          value={searchPerson}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          style={{ textTransform: 'uppercase' }}
          allowClear
          onClear={handleClear}
        />
      </Flex>
      <Flex style={{ paddingTop: '20px', display: 'block' }}>
        {loadingFind && <img src={Spinner} className="spinner" alt="spinner" />}
        {error && <Warning error={error} />}
        <Flex justify="space-between">
          {!loadingFind && !error && (
            <div className="textAlignLeft">
              <PersonPhoneADD />
              <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
              <PersonFound />
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default SearchPersons;