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


@app.route('/api/todos', methods=['GET', 'POST'])
def todos():
    if request.method == 'GET':
        return todos_list()
    else:
        return todos_create()


def todos_list():
    # TODO set Content-Type to application/vnd.api+json
    # links are implied at <collection url for type>/<id>
    response = {'todos': [item['id'] for item in todo.list(g.db)]}
    return (json.dumps(response), 200)


def todos_create():
    # TODO set/accept Content-Type to application/vnd.api+json
    # TODO handle all kinds of json problems
    data = request.get_json(force=True)
    created = todo.create(g.db, data['todos'])
    # include href?
    return (json.dumps({'todos': todo.to_json(created)}),
            201, {'Location': _url("/todos/%s" % created['id'])})


@app.route('/api/todos/<todoId>', methods=['GET', 'PUT'])
def todo_handler(todoId):
    if request.method == 'GET':
        return todo_read(todoId)
    else:
        return todo_update(todoId)


def todo_read(todoId):
    item = todo.read(g.db, todoId)
    if not item:
        return ("", 404)
    else:
        return (json.dumps({'todos': todo.to_json(item)}), 200)


def todo_update(todoId):
    if not todo.read(g.db, todoId):
        return ("", 404)

    data = request.get_json(force=True)
    item = todo.from_json(data['todos'])
    if not item or item['id'] != todoId:
        return ("", 400)

    todo.update(g.db, item)
    # TODO don't send a body at all
    return ("", 204)
