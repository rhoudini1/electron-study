async function getNews(category) {
  const newsJson = await window.newsApi.getNews(category);
  return JSON.parse(newsJson);
}

function showNews(allNews) {
  allNews.forEach((news) => {
    const singleNews = `
      <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="" width="50" height="50" />
        <div class="media-body">
          <strong><a href="">${news.title}</a></strong>
          <div>
            <span class="">21st June 2020</span>
            <span class="pull-right">Author: ${news.author}</span>
          </div>
          <p>${news.description}</p>
        </div>
      </li>
    `;
    $("#news-list").append(singleNews);
  });
}

getNews("politics").then((news) => showNews(news));
showNews(news);
console.log(news);
