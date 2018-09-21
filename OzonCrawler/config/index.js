module.exports = {

    options: {
        hostname: 'www.ozon.ru',
        port: 443,
        path: '/context/detail/id/144054492/',
        method: 'GET',
        headers: {
            'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'if-modified-since':'Fri, 08 Jun 2018 03:42:08 GMT',
            'referer':'https://www.ozon.ru/catalog/1133763/?type=48856',
            'upgrade-insecure-requests':1,
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
        }
    },
    baseURL: 'https://www.ozon.ru',
    timeout: 3000
}