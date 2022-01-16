import header from './components/header';
import { handleHistory, moveToPage } from './router';
import { getMainPosts, findPosts, getSearchTitle } from './requests';
import { $ } from './helpers/utils';
import { handleSelectOptions } from './helpers/select';

const $city = $('#city');
const $district = $('#district');

const setPosts = posts => {
  if (posts) {
    let postlist = '';
    posts.map(post => {
      postlist += `
    <div data-id="${post.id}" class="main-posts-posting-list">
      <a href="javascript:void(0)">
        <img src="${post.images[0]}" alt="${post.title} 이미지" />
        <span class="main-posts-title">${post.title}</span>
        <span class="main-posts-species species-${
          post.animal === '강아지' ? 'dog' : post.animal === '고양이' ? 'cat' : 'etc'
        }">${post.animal}</span>
        <span class="main-posts-place">${post.city} ${post.district}</span>
      </a>
    </div>`;
    });
    $('.main-posts').innerHTML = postlist;
  }
};

const render = (() => {
  window.onload = async () => {
    try {
      const { data: posts } = await getMainPosts();
      setPosts(posts);
    } catch (e) {
      console.error(e);
    }
  };
})();

const bindEvents = () => {
  header.bindEvents();

  window.addEventListener('popstate', handleHistory);
};

const init = () => {
  bindEvents();
};

$city.onchange = () => {
  handleSelectOptions({ $city, $district });
};

const $searchInput = $('.search-input');
const $navSearchButton = $('.main-nav-search-btn');

$searchInput.onkeypress = ({ key }) => {
  if (key !== 'Enter') return;

  const content = $searchInput.value.trim();

  if (key !== 'Enter' || content === '') {
    $navSearchButton.disabled = false;
    return;
  }
  $navSearchButton.disabled = false;

  $searchInput.value = '';
  filterTitle(content);
};
$navSearchButton.onclick = () => {
  filterTitle($searchInput.value);
};

const filterTitle = async inputValue => {
  try {
    const { data: posts } = await getSearchTitle(inputValue);

    posts.length > 0
      ? setPosts(posts)
      : ($('.main-posts').innerHTML = '<div class="search-error">해당하는 게시물이 존재하지 않습니다.</div>');
  } catch (error) {
    console.error(error);
  }
};

const $findButton = $('.main-nav-find-btn');

$findButton.onclick = async () => {
  const [city, district, species] = [$city.value, $district.value, $('#kind').value];
  console.log({ city, district, species });
  try {
    const { data: posts } = await findPosts(city, district, species);
    if (posts) {
      let postlist = '';
      console.log(postlist);
      posts.map(post => {
        postlist += `
        <div data-id="${post.id}" class="main-posts-posting-list">
          <a href="javascript:void(0)">
            <img src="${post.images[0]}" alt="" />
            <span class="main-posts-title">${post.title}</span>
            <span class="main-posts-species species-dog">${post.animal}</span>
            <span class="main-posts-place">${post.city} ${post.district}</span>
        </a>
        </div>`;
      });
      $('.main-posts').innerHTML = postlist;
    }
  } catch (e) {
    console.error(e);
  }
};

$('.main-posts').onclick = ({ target }) => {
  if (target.classList.contains('main-posts')) return;
  try {
    moveToPage(`/post/${target.dataset.id}`);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('DOMContentLoaded', init);
