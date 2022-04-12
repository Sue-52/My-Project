const cheerio = require("cheerio");
const axios = require("axios");
// 4. 引入fs模块
const fs = require("fs");
const path = require("path");

// 1. 设置基准地址
let httpURL = "http://scp-zh-tr.wikidot.com";

// 2. 发起请求获取数据
axios.get(httpURL).then(res => {
  // 2.1 获取页面整体数据放入到 $ 变量中
  // console.log(res.data)
  const $ = cheerio.load(res.data);
  // 2.2 根据DOM标签进入自己想要的部分并遍历
  $("#top-bar > div.top-bar > ul > li:first-child > ul > li:first-child").each((index, element) => {
    // console.log(index)
    // console.log(element)
    // 2.2.1 获取当前页面的标题
    const title = $(element).find("a").text();
    // console.log(title)
    // 2.2.2 获取当前页面的链接
    const firstPageUrl = $(element).find("a").attr("href");
    // console.log(firstPageUrl)
    // 2.2.3 通过回调函数将数据传入
    getFirstPageData(firstPageUrl, title);
  })
})

// 二级页面数据获取
async function getFirstPageData(url, title) {
  const res = await axios.get(httpURL + url);
  // console.log(res.data)
  const $ = cheerio.load(res.data);
  $("#page-content > div:nth-child(143)").each((index, element) => {
    // console.log(index)
    // 根据 ID 获取对应的 title
    const secondTitle = $(element).find("h1").text();
    // console.log(secondTitle)
    // 查找三级页面的链接
    const secondPageUrl = $(element).find("ul:nth-child(8) > li:first-child > a").text().toLowerCase();
    // console.log(secondPageUrl)

    // 获取三级页面的链接
    getThirdPageData(secondPageUrl, secondTitle);
  })
}

async function getThirdPageData(url, title) {
  const res = await axios.get(httpURL + "/" + url);
  // console.log(res.data)
  const $ = cheerio.load(res.data);
  $("#page-content > div:nth-child(143)").each((index, element) => {
    const thirdTitle1 = $(element).find("h1").text();
    const thirdTitle2 = $(element).find("h2").text();
    console.log(thirdTitle1)
    console.log(thirdTitle2)
  })
}