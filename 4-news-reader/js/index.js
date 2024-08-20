const navItems = $(".nav-group-item");

getNews("business").then((news) => showNews(news));

navItems.on("click", (event) => {
  const category = event.target.id;
  navItems.removeClass("active");
  $(event.target).addClass("active");
  getNews(category).then((news) => showNews(news));
});

async function getNews(category) {
  const newsJson = await window.newsApi.getNews(category);
  return JSON.parse(newsJson);
}

function showNews(allNews) {
  const searchBarHtml = `
    <li class="list-group-header">
      <input class="form-control" type="text" value="" placeholder="Search for news" />
    </li>
  `;

  $("#news-list").html("");
  $("#news-list").append(searchBarHtml);

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
