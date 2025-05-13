// import axiosClient from './axiosClient';

// const URL = '/apis/word';

// const wordApi = {
//   postContributeWord: (wordInfor) => {
//     return axiosClient.post(`${URL}/contribute/add-word`, { ...wordInfor });
//   },

//   getCheckWordExistence: (word, type) => {
//     return axiosClient.get(`${URL}/exist`, { params: { word, type } });
//   },

//   // get word, type, phonetic, mean
//   getWordList: (page = 1, perPage = 8, packInfo, sortType = 'rand') => {
//     return axiosClient.get(`${URL}/pack`, {
//       params: { page, perPage, packInfo: JSON.stringify(packInfo), sortType },
//     });
//   },

//   getSearchWord: (word = '', isCompact = false) => {
//     return axiosClient.get(`${URL}/search-word`, {
//       params: { word, isCompact },
//     });
//   },

//   getWordDetails: (word = '') => {
//     return axiosClient.get(`${URL}/word-details`, { params: { word } });
//   },

//   getUserFavoriteList: (page = 0, perPage = 20, sortType = 'rand') => {
//     return axiosClient.get(`${URL}/favorite-list`, {
//       params: { page, perPage, sortType },
//     });
//   },
// };

// export default wordApi;
import axiosClient from './axiosClient';

const URL = '/apis/word';

const wordApi = {
  postContributeWord: (wordInfor) => {
    return axiosClient.post(`${URL}/contribute/add-word`, { ...wordInfor });
  },

  getCheckWordExistence: (word, type) => {
    return axiosClient.get(`${URL}/exist`, { params: { word, type } });
  },

  getWordList: (page = 1, perPage = 8, packInfo, sortType = 'rand') => {
    return axiosClient.get(`${URL}/pack`, {
      params: { page, perPage, packInfo: JSON.stringify(packInfo), sortType },
    });
  },

  getSearchWord: (word = '', isCompact = false) => {
    return axiosClient.get(`${URL}/search-word`, {
      params: { word, isCompact },
    });
  },

  getWordDetails: (word = '') => {
    return axiosClient.get(`${URL}/word-details`, { params: { word } });
  },

  getUserFavoriteList: (page = 0, perPage = 20, sortType = 'rand') => {
    return axiosClient.get(`${URL}/favorite-list`, {
      params: { page, perPage, sortType },
    });
  },

  // ✅ NEW: Get all words with pending status
  getPendingWords: () => {
    return axiosClient.get(`${URL}/pending-words`);
  },

  // ✅ NEW: Approve a word by ID
  approveWord: (wordId) => {
    return axiosClient.put(`${URL}/approve/${wordId}`);
  },

  // ✅ NEW: Reject a word by ID
  rejectWord: (wordId) => {
    return axiosClient.put(`${URL}/reject/${wordId}`);
  },
  getApprovedWords: () => {
    return axiosClient.get(`${URL}/approved-words`);
  },
  setWordToPending: (wordId) => {
    return axiosClient.put(`${URL}/pending/${wordId}`);
  },
};

export default wordApi;
