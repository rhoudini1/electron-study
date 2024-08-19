getNews("politics").then((news) => showNews(news));

async function getNews(category) {
  const newsJson = await window.newsApi.getNews(category);
  return JSON.parse(newsJson);
}

function showNews(allNews) {
  allNews.forEach((news) => {
    const singleNews = `
      <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50" height="50" />
        <div class="media-body">
          <strong><a href="${news.url}" target="_blank">${news.title}</a></strong>
          <div>
            <span class="">${news.publishedAt}</span>
            <span class="pull-right">Author: ${news.author}</span>
          </div>
          <p>${news.description ?? ""}</p>
        </div>
      </li>
    `;
    $("#news-list").append(singleNews);
  });
}
