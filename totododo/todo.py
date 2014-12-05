import dateutil.parser


def create(db, data):
    created = _parse_timestamp(data['created'])
    cursor = db.cursor()
    cursor.execute('INSERT INTO todos (text, created) VALUES (?,?)',
                   [data['text'], created])
    db.commit()
    return read(db, cursor.lastrowid)


def update(db, todo):
    db.execute('UPDATE todos SET text=?, completed=? WHERE id=?',
               [todo['text'], todo['completed'], todo['id']])
    db.commit()


def read(db, id):
    row = db.execute(
        'SELECT id, text, created, completed FROM todos WHERE id=?',
        [id]).fetchone()
    if row:
        return _from_row(row)


def list(db):
    # order is ascending, making new entries without order come first
    return [_from_row(row) for row in db.execute(
        'SELECT id, text, created, completed FROM todos '
        'ORDER BY `order`, id DESC')]


def set_order(db, todoIds):
    dbIds = [todo['id'] for todo in list(db)]  # FIXME list is a bad name...
    if (set(todoIds) != set(dbIds)):
        return False

    cursor = db.cursor()
    for order, todoId in enumerate(todoIds):
        cursor.execute(
            'UPDATE todos SET `order`=? WHERE id=?', [order, todoId])
    db.commit()
    return True


def to_json(todo):
    todo['created'] = "%sZ" % todo['created'].isoformat()
    completed = todo['completed']
    if completed:
        todo['completed'] = "%sZ" % completed.isoformat()
    return todo


def from_json(data):
    try:
        created = _parse_timestamp(data['created'])
        completed = data['completed']
        if completed:
            completed = _parse_timestamp(completed)
        return {
            'id': data['id'],
            'text': data['text'],
            'created': created,
            'completed': completed
        }
    except:
        return None


def _parse_timestamp(timestamp):
    parsed = dateutil.parser.parse(timestamp)
    if not parsed:
        return None
    # remove utc offset and tzinfo, otherwise sqlite can't convert the
    # values back when reading from db.
    # http://bugs.python.org/issue19065
    return (parsed - parsed.utcoffset()).replace(tzinfo=None)


def _from_row(row):
    return {
        'id': str(row[0]),
        'text': row[1],
        'created': row[2],
        'completed': row[3]
    }
