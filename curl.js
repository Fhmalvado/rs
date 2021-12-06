const request = require('request');
module.exports = (uri, postdata, headers = {}, jar = false) => {

    let resolve;
    let reject;
    const promise = new Promise((a, b) => {
        resolve = a;
        reject = b;
    });
    var h = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'upgrade-insecure-requests': '1'

    };
    if (postdata) {
        h['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    try {
        JSON.parse(postdata);
        h['Content-Type'] = 'application/json; charset=UTF-8';
    } catch (ex) {

    }

    Object.keys(headers).forEach((value) => {
        h[value] = headers[value];
    });



    method = (postdata) ? 'POST' : 'GET';
    var opts = {
        method: method,
        url: uri,
        jar,
        headers: h,
        body: postdata,
        forever: true,
        followAllRedirects: false,
        followRedirect: false

    }

    opts["rejectUnauthorized"] = false;

    request(opts, function (err, res, body) {
        if (err) {
            module.exports(uri, postdata, headers, jar).then(x => {
                resolve(x)
            })
        } else {

            resolve(res);


        }
    });

    return promise;
}
