import commonApi from 'apis/commonApi';
import flashcardApi from 'apis/flashcardApi';
import { equalArray } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import wordApi from 'apis/wordApi';
import Flashcard from '.';

const perPage = 7;

function FlashcardData() {
  const dispatch = useDispatch();
  const list = useRef([]); // list store all item to prevent call API when prev button click
  const [currentList, setCurrentList] = useState([]);
  const [total, setTotal] = useState(-1);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    packInfo: {
      type: '-1',
      level: '-1',
      specialty: '-1',
      topics: [],
    },
  });

  // get total word pack
  useEffect(() => {
    let isSubscribe = true;

    if (total !== -1) {
      return;
    }

    (async function getTotalWordPack() {
      try {
        const apiRes = await commonApi.getWordPackTotal(pageInfo.packInfo);

        if (apiRes.status === 200 && isSubscribe) {
          const { total = 0 } = apiRes.data;
          if (total === 0) {
            dispatch(
              setMessage({
                type: 'warning',
                message: 'Gói từ vựng hiện tại không đủ, vui lòng thử lại sau.',
                duration: 3000,
              }),
            );
          }
          setTotal(total);
        }
      } catch (error) {
        setTotal(0);
      }
    })();

    return () => (isSubscribe = false);
  }, [total]);

  // get word pack when page change
  useEffect(() => {
    let isSubscribe = true;

    async function getFlashcardList() {
      try {
        const apiRes = await wordApi.getApprovedWords();

        if (apiRes.status === 200 && isSubscribe) {
          const { list: approvedList = [] } = apiRes.data;
          setCurrentList(approvedList.slice((pageInfo.page - 1) * perPage, pageInfo.page * perPage));
          list.current = approvedList;
          if (total === -1) {
            setTotal(approvedList.length);
          }
        }
      } catch (error) {
        console.error('Failed to load approved words:', error);
      }
    }

    isSubscribe && getFlashcardList();

    return () => (isSubscribe = false);
  }, [pageInfo]);

  const handleNextClick = () => {
    const { page } = pageInfo;
    if (page < total) {
      if (pageInfo.page < list.current.length / perPage) {
        const oldList = list.current.slice(
          page * perPage,
          (page + 1) * perPage,
        );
        setCurrentList(oldList);
      }
      setPageInfo({ ...pageInfo, page: page + 1 });
    }
  };

  const handlePrevClick = () => {
    const { page } = pageInfo;
    if (page > 1) {
      const oldList = list.current.slice(
        (page - 2) * perPage,
        (page - 1) * perPage,
      );
      setCurrentList(oldList);
      setPageInfo({ ...pageInfo, page: page - 1 });
    }
  };

  const onWordPackChange = (newPackInfo) => {
    const { packInfo } = pageInfo;

    // check the similarity
    let isSame = true;
    const { topics } = newPackInfo;
    isSame = equalArray(topics, packInfo.topics);
    for (let k in packInfo) {
      if (k !== 'topics' && packInfo[k] !== newPackInfo[k]) {
        isSame = false;
        break;
      }
    }

    if (isSame) return;

    // reset and call API
    list.current = [];
    setPageInfo({
      page: 1,
      packInfo: newPackInfo,
    });
    setTotal(-1);
  };

  return (
    <Flashcard
      list={currentList}
      total={total}
      currentPage={pageInfo.page}
      onNextPage={handleNextClick}
      onPrevPage={handlePrevClick}
      onWordPackChange={onWordPackChange}
    />
  );
}

export default FlashcardData;
