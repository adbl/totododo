from flask import Flask, request, g, jsonify, json
import sqlite3
from . import todo

DATABASE = '/mnt/totododo-data/db.sqlite3'

app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.before_request
def _api_location():
    if not 'Host' in request.headers:
        return ("", 400, None)
    else:
        g.api_location = "http://%s/api" % request.headers['Host']


@app.before_request
def _db_connect():
    g.db = sqlite3.connect(app.config['DATABASE'],
                           detect_types=sqlite3.PARSE_DECLTYPES)


@app.teardown_request
def _db_close(exception):
    if hasattr(g, 'db'):
        g.db.close()


def _url(path=""):
    return "%s%s" % (g.api_location, path)


@app.route('/api')
def root():
    # TODO set Content-Type to application/vnd.api+json
    return jsonify(todos={'href': _url("/todos")})


@app.route('/api/todos', methods=['POST'])
def create():
    # TODO handle all kinds of json problems
    data = request.get_json(force=True)
    created = todo.create(g.db, data['todos'])
    return (json.dumps({'todos': todo.to_json(created)}),
            201, {'Location': _url("/todos/%s" % created['id'])})
