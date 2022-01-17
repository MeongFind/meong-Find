import header from '../components/header';
import { moveToPage } from '../router';
import { getMyProfile, getMyPosts } from '../requests';
import { $ } from '../helpers/utils';

let curUserId = '';
// render 바꿔
const render = (() => {
  window.onload = async () => {
    try {
      const {
        data: [user],
      } = await getMyProfile();

      if (user) {
        curUserId = user.id;
        $('.profile__title-container').innerHTML = `
          <span>${user.nickname}</span>
          <span class="bold">님의 프로필</span>
        `;

        $('.profile__email-container').innerHTML = `
        <span class="profile__email-title">이메일</span>
        <span class="profile__email">${user.email}</span>
        `;

        $('.profile__city-container').innerHTML = `
          <span class="profile__city-title">지 역</span>
          <span class="profile__city">${user.city}</span>
          <span class="profile__district">${user.district}</span>
        `;
      }

      const { data: myposts } = await getMyPosts(curUserId);
      if (myposts) {
        $('.profile__posting-container').innerHTML = myposts
          .map(
            ({ id, title }, index) => `
        <li class="profile__posting-list" data-id="${id}">
          <span class="profile__posting-num">${index + 1}</span>
          <span class="profile__posting-header">${title}</span>
          <a href="javascript:void(0)" class="profile__posting-edit">
            <span>수정</span>
          </a>
          <button class="profile__posting-del" type="button">삭제</button>
        </li>
        `
          )
          .join('');
      }

      $('.profile__posting-container').addEventListener('click', ({ target }) => {
        if (!target.matches('.profile__posting-edit')) return;
        moveToPage(`/update/${target.parentElement.dataset.id}`);
      });
    } catch (e) {
      console.error(e);
    }
  };
})();

const bindEvents = () => {
  header.bindEvents();
};

$('.profile__posting-container').onclick = e => {
  if (e.target.matches('button')) {
    // 삭제버튼 이벤트
    const curPostId = e.target.parentNode.dataset.id;
  }
};

// 정보수정으로 이동
$('.profile__edit').addEventListener('click', () => {
  moveToPage('/mypageEdit');
});

window.addEventListener('DOMContentLoaded', bindEvents);
