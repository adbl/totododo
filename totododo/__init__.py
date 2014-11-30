from flask import Flask, request, g, jsonify

app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.before_request
def _api_location():
    if not 'Host' in request.headers:
        return ("", 400, None)
    else:
        g.api_location = "http://%s/api" % request.headers['Host']


def _url(path=""):
    return "%s%s" % (g.api_location, path)


@app.route('/api')
def root():
    # TODO set Content-Type to application/vnd.api+json
    return jsonify(todos={'href': _url("/todos")})
