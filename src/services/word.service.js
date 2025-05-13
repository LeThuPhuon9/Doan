// const WordModel = require('../models/word.model');

// exports.createNewWord = async (wordInfo) => {
//   try {
//     const newWord = await WordModel.create({ ...wordInfo });

//     if (newWord) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.searchWord = async (word = '', limit = 20, select = '') => {
//   try {
//     const regex = new RegExp(`^${word}.*`, 'gi');
//     const list = await WordModel.find({ word: regex })
//       .limit(limit)
//       .select(select);
//     return list;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getWordDetail = async (word = '') => {
//   try {
//     const res = await WordModel.findOne({ word });

//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getFavoriteList = async (rawFavorites = []) => {
//   try {
//     if (!Array.isArray(rawFavorites) || rawFavorites.length === 0) {
//       return [];
//     }

//     let list = [];
//     for (let word of rawFavorites) {
//       const regex = new RegExp(`^${word}.*`, 'gi');
//       const wordDetails = await WordModel.findOne({ word: regex }).select(
//         '-_id type word mean phonetic picture',
//       );
//       if (wordDetails) {
//         list.push(wordDetails);
//       }
//     }

//     return list;
//   } catch (error) {
//     throw error;
//   }
// };
// exports.approveWord = async (wordId) => {
//   try {
//     const updated = await WordModel.findByIdAndUpdate(
//       wordId,
//       { status: 'approved', isChecked: true },
//       { new: true }
//     );
//     return updated;
//   } catch (error) {
//     throw error;
//   }
// };

// // exports.rejectWord = async (wordId) => {
// //   try {
// //     const word = await WordModel.findById(wordId);
// //     if (!word) return null;

// //     await WordModel.findByIdAndDelete(wordId);
// //     return true;
// //   } catch (error) {
// //     throw error;
// //   }
// // };
// exports.rejectWord = async (wordId) => {
//   try {
//     const word = await WordModel.findById(wordId);
//     if (!word) return null;

//     // Nếu đang approved → xóa luôn
//     if (word.status === 'approved') {
//       await WordModel.findByIdAndDelete(wordId);
//       return { deleted: true };
//     }

//     // Ngược lại (đang pending...) → cập nhật status là rejected
//     word.status = 'rejected';
//     word.isChecked = true;
//     await word.save();

//     return { deleted: false };
//   } catch (error) {
//     throw error;
//   }
// };

// exports.getPendingWords = async () => {
//   return WordModel.find({ status: 'pending' });
// };
// exports.getApprovedWords = async () => {
//   return WordModel.find({ status: 'approved' }); // Không .select để lấy full
// };
// exports.setWordToPending = async (wordId) => {
//   try {
//     const word = await WordModel.findById(wordId);
//     if (!word) return null;

//     word.status = 'pending';
//     word.isChecked = false;
//     await word.save();

//     return word;
//   } catch (error) {
//     throw error;
//   }
// };





const WordModel = require('../models/word.model');

const createNewWord = async (wordInfo) => {
  const newWord = await WordModel.create(wordInfo);
  return !!newWord;
};

const searchWord = async (word = '', limit = 20, select = '') => {
  const regex = new RegExp(`^${word}.*`, 'gi');
  return WordModel.find({ word: regex }).limit(limit).select(select);
};

const getWordDetail = async (word = '') => {
  return WordModel.findOne({ word });
};

const getFavoriteList = async (rawFavorites = []) => {
  if (!Array.isArray(rawFavorites) || rawFavorites.length === 0) return [];

  const list = [];
  for (const word of rawFavorites) {
    const regex = new RegExp(`^${word}.*`, 'gi');
    const wordDetails = await WordModel.findOne({ word: regex }).select(
      '-_id type word mean phonetic picture'
    );
    if (wordDetails) list.push(wordDetails);
  }

  return list;
};

const approveWord = async (wordId) => {
  return WordModel.findByIdAndUpdate(
    wordId,
    { status: 'approved', isChecked: true },
    { new: true }
  );
};

const rejectWord = async (wordId) => {
  const word = await WordModel.findById(wordId);
  if (!word) return null;

  if (word.status === 'approved') {
    await WordModel.findByIdAndDelete(wordId);
    return { deleted: true };
  }

  word.status = 'rejected';
  word.isChecked = true;
  await word.save();

  return { deleted: false };
};

const getPendingWords = async () => {
  return WordModel.find({ status: 'pending' });
};

const getApprovedWords = async () => {
  return WordModel.find({ status: 'approved' });
};

const setWordToPending = async (wordId) => {
  const word = await WordModel.findById(wordId);
  if (!word) return null;

  word.status = 'pending';
  word.isChecked = false;
  await word.save();

  return word;
};

module.exports = {
  createNewWord,
  searchWord,
  getWordDetail,
  getFavoriteList,
  approveWord,
  rejectWord,
  getPendingWords,
  getApprovedWords,
  setWordToPending,
};
