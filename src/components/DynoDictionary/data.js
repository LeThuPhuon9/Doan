import commonApi from 'apis/commonApi';
import wordApi from 'apis/wordApi';
import WordDetailModal from 'components/UI/WordDetailModal';
import { TOEIC_KEY } from 'constant/topics';
import { equalArray } from 'helper';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import DynoDictionary from '.';

const perPage = 20;

function DynoDictionaryData({ isTOEIC }) {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('rand');
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Get approved words
  useEffect(() => {
    let isSub = true;

    async function loadApprovedWords() {
      try {
        setLoading(true);
        const response = await wordApi.getApprovedWords();
        if (response.status === 200 && isSub) {
          const approvedWords = response.data.list || [];
          setList(approvedWords);
        }
      } catch (error) {
        console.error('Failed to load approved words:', error);
      } finally {
        if (isSub) {
          setLoading(false);
          setIsFirstLoad(false);
        }
      }
    }

    loadApprovedWords();
    return () => (isSub = false);
  }, []);

  const onSearchWord = async (word) => {
    try {
      if (word === '') {
        setList([]);
        return;
      }

      const apiRes = await wordApi.getSearchWord(word);
      if (apiRes.status === 200) {
        const { packList = [] } = apiRes.data;
        setList(packList);
      }
    } catch (error) {}
  };

  return (
    <>
      <DynoDictionary
        isTOEIC={isTOEIC}
        list={list}
        loading={loading}
        onLoadData={() => {}}
        more={false}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={() => {}}
        onSortTypeChange={() => {}}
        onSearchWord={onSearchWord}
      />
      <WordDetailModal />
    </>
  );
}

DynoDictionaryData.propTypes = {
  isTOEIC: PropTypes.bool,
};

DynoDictionaryData.defaultProps = {
  isTOEIC: false,
};

export default DynoDictionaryData;
