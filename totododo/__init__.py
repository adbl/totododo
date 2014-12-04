from flask import Flask, request, g, Response, json
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


def _response(data=None, **kwargs):
    if data:
        kwargs['response'] = json.dumps(data)
        kwargs['content_type'] = 'application/vnd.api+json'
    return Response(**kwargs)


@app.route('/api')
def root():
    data = {
        'todos': {
            'href': _url("/todos")
        }
    }
    return _response(data=data)


@app.route('/api/todos', methods=['GET', 'PUT', 'POST'])
def todos():
    if request.method == 'GET':
        return todos_list()
    elif request.method == 'PUT':
        return todos_update()
    else:
        return todos_create()


def todos_list():
    # links are implied at <collection url for type>/<id>
    data = {
        'todos': [item['id'] for item in todo.list(g.db)]
    }
    return _response(data=data)


def todos_update():
    json = request.get_json(force=True)
    if todo.set_order(g.db, json['todos']):
        return _response(status=204)
    else:
        return _response(status=409)


def todos_create():
    # TODO handle all kinds of json problems
    json = request.get_json(force=True)
    created = todo.create(g.db, json['todos'])
    # include href?
    data = {
        'todos': todo.to_json(created)
    }
    return _response(data=data, status=201,
                     headers={'Location': _url("/todos/%s" % created['id'])})


@app.route('/api/todos/<todoId>', methods=['GET', 'PUT'])
def todo_handler(todoId):
    if request.method == 'GET':
        return todo_read(todoId)
    else:
        return todo_update(todoId)


def todo_read(todoId):
    item = todo.read(g.db, todoId)
    if not item:
        return _response(status=404)
    else:
        data = {
            'todos': todo.to_json(item)
        }
        return _response(data=data)


def todo_update(todoId):
    if not todo.read(g.db, todoId):
        return _response(status=404)

    data = request.get_json(force=True)
    item = todo.from_json(data['todos'])
    if not item or item['id'] != todoId:
        # TODO error structure
        return _response(status=400)

    todo.update(g.db, item)
    return _response(status=204)
