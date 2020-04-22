var apiUrl = "http://toeicbookapi.appspot.com/"

if (window.location.href.indexOf("localhost") > 0) {
    apiUrl = "http://localhost:3000/"
}

module.exports = {
    apiUrl
}