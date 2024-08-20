const navItems = $(".nav-group-item");
let articles = null;

getNews("business");

navItems.on("click", (event) => {
  const category = event.target.id;
  navItems.removeClass("active");
  $(event.target).addClass("active");
  getNews(category);
});

async function getNews(category) {
  const newsJson = await window.newsApi.getNews(category);
  const news = JSON.parse(newsJson);
  articles = news;
  showNews(news);
}

function showNews(allNews, searchBarValue = "") {
  const searchBarHtml = `
    <li class="list-group-header">
      <input class="form-control" type="text" value="${searchBarValue}" placeholder="Search for news" onchange="search(this)" />
    </li>
  `;

  $("#news-list").html("");
  $("#news-list").append(searchBarHtml);

  if (allNews.length === 0) {
    $("#news-list").append(`<p style="margin-left: 15px; color: #9c9c9c;">No articles were found.</p>`);
    return;
  }

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

function search(input) {
  const query = input.value;
  if (query.length === 0) {
    showNews(articles);
  }
  const filteredArticles = articles.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  showNews(filteredArticles, query);
}
