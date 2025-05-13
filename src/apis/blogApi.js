import axiosClient from './axiosClient';

const URL = 'apis/blog';

const blogApi = {
  getBlogList: () => {
    return axiosClient.get(`${URL}/blog-list`);
  },

  getBlogHtml: (_id) => {
    return axiosClient.get(`${URL}/blog-html`, { params: { _id } });
  },
};

export default blogApi;
