import axios from 'axios';

export const fetchHtml = async url => {
  // console.log(`/${url === '/' ? 'index' : `html/${url}`}.html`);
  try {
    const res = await axios.get(url);
    console.log('res ===>', res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSignUpForm = async () => {
  try {
    return await axios.get('/signup');
  } catch (error) {
    console.error(error);
  }
};

export const getSignUpEmail = async emailValue => {
  try {
    return await axios.get(`/user/email/${emailValue}`);
  } catch (error) {
    console.error(error);
  }
};

export const getSignUpName = async nickname => {
  try {
    return await axios.get(`/user/name/${nickname}`);
  } catch (error) {
    console.error(error);
  }
};

export const findPosts = async (city, district, species) => {
  return await axios.get(`/findposts/${city}/${district}/${species}`);
};

// 회원가입 정보 전송
export const getSignup = async (nickname, email, password, city, district) => {
  try {
    return await axios.post('/users/signup', {
      nickname,
      email,
      password,
      city,
      district,
    });
  } catch (error) {
    console.error(error);
  }
};

export const postSignIn = async (email, password, autoLogin) => {
  try {
    return await axios.post('/user/signin', { email, password, autoLogin });
  } catch (error) {
    console.error(error);
  }
};

export const getSignOut = async () => {
  try {
    return await axios.get('/user/signout');
  } catch (error) {
    console.error(error);
  }
};

// main page posting 관리
export const getMainPosts = async () => {
  try {
    return await axios.get('/getposts');
  } catch (error) {
    console.error(error);
  }
};

export const searchTitile = async title => {
  return await axios.get(`/findposts/${title}`);
};

// 메인페이지 -> 상세페이지로 이동
export const getPostId = async id => {
  try {
    return await axios.get(`/post/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// 상세페이지 posting 정보 가져오기
export const getPostInfo = async id => {
  return await axios.get(`/post/${id}`);
};
// 상세페이지 user 정보 가져오기
export const getPostwriter = async id => {
  return await axios.get(`/post/user/${id}`);
};

// mypage 정보
export const getMyProfile = async () => {
  try {
    return await axios.get('/profile');
  } catch (error) {
    console.error(error);
  }
};

// profile 변경
export const changeUserProfile = async (curUserId, nickname, password, city, district) => {
  try {
    return await axios.patch(`/users/${curUserId}`, {
      nickname,
      password,
      city,
      district,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getIsUserLogin = async () => {
  try {
    return await axios.get('/user/login');
  } catch (error) {
    console.error(error);
  }
};
