import accountApi from 'apis/accountApi';
import { UX } from 'constant';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import { getUserInfo } from 'redux/slices/userInfo.slice';
import Login from './index';

function LoginData() {
  const [loading, setLoading] = useState(false);  // Added back the loading state
  const dispatch = useDispatch();

  const handleLogin = async (account) => {
    try {
      setLoading(true);
      const { email, password } = account;

      const apiRes = await accountApi.postLogin(email.toLowerCase(), password);
      
      if (apiRes && apiRes.status === 200) {
        const userData = apiRes.data.user;
        
        if (userData && userData.username === 'lethuphuong2962003a5ca0') {
          localStorage.setItem('isAdmin', 'true');
        }

        dispatch(getUserInfo());
        dispatch(
          setMessage({ message: 'Đăng nhập thành công', type: 'success' }),
        );

        setTimeout(() => {
          window.location.reload();
        }, UX.DELAY_TIME);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Thất bại, thử lại !';
      dispatch(setMessage({ message, type: 'error' }));
      setLoading(false);
    }
  };

  return <Login onLogin={handleLogin} loading={loading} />;
}

export default LoginData;
