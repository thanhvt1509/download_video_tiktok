const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/index',
    params: { url: 'https://www.tiktok.com/@taylorswift/video/7192946753652411691' },
    headers: {
        'X-RapidAPI-Key': '0d7421432fmsh3c8b027a54b05a6p1a076bjsndba7ac301901',
        'X-RapidAPI-Host': 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data.video);
}).catch(function (error) {
    console.error(error);
});