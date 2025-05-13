// const {
//   isExistWord,
//   uploadImage,
//   getWordPack,
// } = require('../services/common.service');
// const {
//   createNewWord,
//   searchWord,
//   getWordDetail,
//   getFavoriteList,
//   approveWord,
//   rejectWord,
//   getApprovedWords,
//   getPendingWords,
//   setWordToPending,
// } = require('../services/word.service');

// exports.postContributeWord = async (req, res, next) => {
//   try {
//     const { picture, word, type, ...rest } = req.body;

//     // check existence of word
//     const isExist = await isExistWord(word, type);
//     if (isExist) {
//       return res
//         .status(409)
//         .json({ message: `Từ "${word} (${type})" đã tồn tại trong từ điển` });
//     }

//     // upload description picture if available
//     let pictureUrl = null;
//     if (picture) {
//       pictureUrl = await uploadImage(picture, 'dynonary/words');
//     }

//     // create the new word
//     const isCreateSuccess = await createNewWord({
//       word,
//       type,
//       picture: pictureUrl,
//       isChecked: false,
//       ...rest,
//     });

//     if (isCreateSuccess) {
//       return res.status(200).json({ message: 'Tạo từ mới thành công' });
//     }
//     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   } catch (error) {
//     console.error('POST CONTRIBUTE WORD ERROR: ', error);
//     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.getCheckWordExistence = async (req, res) => {
//   try {
//     const { word, type } = req.query;
//     const isExist = await isExistWord(word, type);
//     return res.status(200).json({ isExist });
//   } catch (error) {
//     console.error('GET CHECK WORD EXIST ERROR: ', error);
//     return res.status(200).json({ isExist: false });
//   }
// };

// exports.getWordPack = async (req, res) => {
//   try {
//     const { page, perPage, packInfo, sortType } = req.query;

//     const pageInt = parseInt(page),
//       perPageInt = parseInt(perPage);
//     const skip = (pageInt - 1) * perPageInt;

//     const packList = await getWordPack(
//       JSON.parse(packInfo),
//       skip,
//       perPageInt,
//       '-_id type word mean phonetic picture',
//       sortType === 'asc' ? '1' : sortType === 'desc' ? '-1' : null,
//       null,
//     );

//     return res.status(200).json({ packList });
//   } catch (error) {
//     console.error('WORD GET WORD PACK ERROR: ', error);
//     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.getSearchWord = async (req, res) => {
//   try {
//     const { word, isCompact = false } = req.query;
//     const list = await searchWord(
//       word,
//       20,
//       isCompact == 'true'
//         ? '-_id word'
//         : '-_id type word mean phonetic picture',
//     );
//     return res.status(200).json({ packList: list });
//   } catch (error) {
//     console.error('GET SEARCH WORD ERROR: ', error);
//     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.getWordDetails = async (req, res, next) => {
//   try {
//     const { word } = req.query;
//     const wordDetail = await getWordDetail(word);
//     if (wordDetail) {
//       return res.status(200).json(wordDetail);
//     }
//   } catch (error) {
//     console.error('GET WORD DETAILS ERROR: ', error);
//     return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.getUserFavoriteList = async (req, res, next) => {
//   try {
//     const { user } = req;
//     if (!user || !user.favoriteList) {
//       return res.status(400).json({ message: 'failed' });
//     }

//     const { favoriteList } = user;
//     if (!Array.isArray(favoriteList) || favoriteList.length === 0) {
//       return res.status(200).json({ list: [] });
//     }

//     let { page, perPage, sortType } = req.query;
//     page = parseInt(page);
//     perPage = parseInt(perPage);

//     let favoriteSorted = [...favoriteList];
//     if (sortType === 'asc') {
//       favoriteSorted.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
//     } else if (sortType === 'desc') {
//       favoriteSorted.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
//     }
//     favoriteSorted = favoriteSorted.slice((page - 1) * perPage, page * perPage);

//     const packList = await getFavoriteList(favoriteSorted);

//     return res.status(200).json({ packList });
//   } catch (error) {
//     console.error(' ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };
// exports.approveWordById = async (req, res) => {
//   try {
//     const { wordId } = req.params;
//     const result = await approveWord(wordId);
//     if (!result) {
//       return res.status(404).json({ message: 'Không tìm thấy từ để duyệt' });
//     }
//     return res.status(200).json({ message: 'Duyệt từ thành công' });
//   } catch (error) {
//     console.error('APPROVE WORD ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.rejectWordById = async (req, res) => {
//   try {
//     const { wordId } = req.params;
//     const result = await rejectWord(wordId);
//     if (!result) {
//       return res.status(404).json({ message: 'Không tìm thấy từ để từ chối' });
//     }

//     const message = result.deleted
//       ? 'Từ đã bị từ chối và xóa khỏi hệ thống'
//       : 'Từ đã bị từ chối';
//     return res.status(200).json({ message });
//   } catch (error) {
//     console.error('REJECT WORD ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };

// exports.getApprovedWords = async (req, res) => {
//   try {
//     const list = await getApprovedWords();
//     return res.status(200).json({ list });
//   } catch (error) {
//     console.error('GET APPROVED WORDS ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };
// exports.getPendingWords = async (req, res) => {
//   try {
//     const list = await getPendingWords();
//     return res.status(200).json({ list });
//   } catch (error) {
//     console.error('GET PENDING WORDS ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };
// exports.setWordToPendingById = async (req, res) => {
//   try {
//     const { wordId } = req.params;
//     const updated = await setWordToPending(wordId);
//     if (!updated) {
//       return res.status(404).json({ message: 'Không tìm thấy từ' });
//     }

//     return res.status(200).json({ message: 'Đã chuyển về trạng thái chờ duyệt' });
//   } catch (error) {
//     console.error('SET WORD TO PENDING ERROR: ', error);
//     return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
//   }
// };
const {
  isExistWord,
  uploadImage,
  getWordPack
} = require('../services/common.service');

const {
  createNewWord,
  searchWord,
  getWordDetail,
  getFavoriteList,
  approveWord,
  rejectWord,
  getApprovedWords,
  getPendingWords,
  setWordToPending
} = require('../services/word.service');

exports.postContributeWord = async (req, res) => {
  try {
    const { picture, word, type, ...rest } = req.body;

    const isExist = await isExistWord(word, type);
    if (isExist) {
      return res.status(409).json({
        message: `Từ "${word} (${type})" đã tồn tại trong từ điển`
      });
    }

    let pictureUrl = null;
    if (picture) {
      pictureUrl = await uploadImage(picture, 'dynonary/words');
    }

    const isCreateSuccess = await createNewWord({
      word,
      type,
      picture: pictureUrl,
      isChecked: false,
      ...rest,
    });

    if (isCreateSuccess) {
      return res.status(200).json({ message: 'Tạo từ mới thành công' });
    }

    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  } catch (error) {
    console.error('POST CONTRIBUTE WORD ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getCheckWordExistence = async (req, res) => {
  try {
    const { word, type } = req.query;
    const isExist = await isExistWord(word, type);
    return res.status(200).json({ isExist });
  } catch (error) {
    console.error('GET CHECK WORD EXIST ERROR: ', error);
    return res.status(200).json({ isExist: false });
  }
};

exports.getWordPack = async (req, res) => {
  try {
    const { page, perPage, packInfo, sortType } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(perPage);

    const packList = await getWordPack(
      JSON.parse(packInfo),
      skip,
      parseInt(perPage),
      '-_id type word mean phonetic picture',
      sortType === 'asc' ? '1' : sortType === 'desc' ? '-1' : null,
      null,
    );

    return res.status(200).json({ packList });
  } catch (error) {
    console.error('WORD GET WORD PACK ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getSearchWord = async (req, res) => {
  try {
    const { word, isCompact = false } = req.query;
    const list = await searchWord(
      word,
      20,
      isCompact === 'true'
        ? '-_id word'
        : '-_id type word mean phonetic picture'
    );
    return res.status(200).json({ packList: list });
  } catch (error) {
    console.error('GET SEARCH WORD ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getWordDetails = async (req, res) => {
  try {
    const { word } = req.query;
    const wordDetail = await getWordDetail(word);
    if (wordDetail) {
      return res.status(200).json(wordDetail);
    }
    return res.status(404).json({ message: 'Không tìm thấy từ' });
  } catch (error) {
    console.error('GET WORD DETAILS ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getUserFavoriteList = async (req, res) => {
  try {
    const { user } = req;
    if (!user || !user.favoriteList) {
      return res.status(400).json({ message: 'failed' });
    }

    const { favoriteList } = user;
    if (!Array.isArray(favoriteList) || favoriteList.length === 0) {
      return res.status(200).json({ list: [] });
    }

    let { page, perPage, sortType } = req.query;
    page = parseInt(page);
    perPage = parseInt(perPage);

    let favoriteSorted = [...favoriteList];
    if (sortType === 'asc') {
      favoriteSorted.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'desc') {
      favoriteSorted.sort((a, b) => b.localeCompare(a));
    }

    favoriteSorted = favoriteSorted.slice((page - 1) * perPage, page * perPage);
    const packList = await getFavoriteList(favoriteSorted);

    return res.status(200).json({ packList });
  } catch (error) {
    console.error('GET USER FAVORITE LIST ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.approveWordById = async (req, res) => {
  try {
    const { wordId } = req.params;
    const result = await approveWord(wordId);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy từ để duyệt' });
    }
    return res.status(200).json({ message: 'Duyệt từ thành công' });
  } catch (error) {
    console.error('APPROVE WORD ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.rejectWordById = async (req, res) => {
  try {
    const { wordId } = req.params;
    const result = await rejectWord(wordId);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy từ để từ chối' });
    }

    const message = result.deleted
      ? 'Từ đã bị từ chối và xóa khỏi hệ thống'
      : 'Từ đã bị từ chối';
    return res.status(200).json({ message });
  } catch (error) {
    console.error('REJECT WORD ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getApprovedWords = async (req, res) => {
  try {
    const list = await getApprovedWords();
    return res.status(200).json({ list });
  } catch (error) {
    console.error('GET APPROVED WORDS ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getPendingWords = async (req, res) => {
  try {
    const list = await getPendingWords();
    return res.status(200).json({ list });
  } catch (error) {
    console.error('GET PENDING WORDS ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.setWordToPendingById = async (req, res) => {
  try {
    const { wordId } = req.params;
    const updated = await setWordToPending(wordId);
    if (!updated) {
      return res.status(404).json({ message: 'Không tìm thấy từ' });
    }

    return res.status(200).json({ message: 'Đã chuyển về trạng thái chờ duyệt' });
  } catch (error) {
    console.error('SET WORD TO PENDING ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
