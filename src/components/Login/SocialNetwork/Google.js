import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import accountApi from "apis/accountApi";
import ggIcon from "assets/icons/gg-icon.png";
import { UX } from "constant";
import React from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/slices/message.slice";
import useStyle from "./style";

function LoginGoogleWrapper() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <LoginGoogle />
    </GoogleOAuthProvider>
  );
}

function LoginGoogle() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const onLoginSuccess = (data) => {
    localStorage.setItem("auth_token", data.token);
    window.location.href = "/";
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        const response = await accountApi.postLoginWithGoogle(accessToken);
        const { status, data } = response;

        if (status === 200) {
          onLoginSuccess(data);
        }
      } catch (error) {
        const message =
          error.response?.data?.message || "Đăng nhập thất bại, thử lại!";
        dispatch(setMessage({ type: "error", message }));
      }
    },
    onError: () =>
      dispatch(
        setMessage({ type: "error", message: "Đăng nhập thất bại!" })
      ),
    scope: "profile email",
    flow: "implicit", // dùng implicit flow để nhận access_token
  });

  return (
    <div onClick={() => login()} className={classes.socialBtn}>
      <img className={classes.socialImg} src={ggIcon} alt="GG" />
      <span className={classes.socialName}>Google</span>
    </div>
  );
}

export default LoginGoogleWrapper;
