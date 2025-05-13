const wordApi = require('express').Router();
const wordController = require('../controllers/word.controller');
const { jwtAuthentication } = require('../middlewares/passport.middleware');

wordApi.post('/contribute/add-word', wordController.postContributeWord);

wordApi.get('/exist', wordController.getCheckWordExistence);
wordApi.get('/pack', wordController.getWordPack);
wordApi.get('/search-word', wordController.getSearchWord);
wordApi.get('/word-details', wordController.getWordDetails);
wordApi.get(
  '/favorite-list',
  jwtAuthentication,
  wordController.getUserFavoriteList,
);
wordApi.get('/', (req, res) => {
  res.json({ message: "Word API is working!" });
});
wordApi.put(
  '/approve/:wordId',
  jwtAuthentication,
  wordController.approveWordById
);
wordApi.put(
  '/reject/:wordId',
  jwtAuthentication,
  wordController.rejectWordById
);
wordApi.get('/approved-words', wordController.getApprovedWords);
wordApi.get('/pending-words', wordController.getPendingWords);
wordApi.put(
  '/pending/:wordId',
  jwtAuthentication,
  wordController.setWordToPendingById
);

module.exports = wordApi;
