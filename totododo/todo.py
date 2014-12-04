import dateutil.parser


def create(db, data):
    cursor = db.cursor()
    cursor.execute('INSERT INTO todos (text) VALUES (?)', [data['text']])
    db.commit()
    return read(db, cursor.lastrowid)


def update(db, todo):
    db.execute('UPDATE todos SET text=?, completed=? WHERE id=?',
               [todo['text'], todo['completed'], todo['id']])
    db.commit()


def read(db, id):
    row = db.execute(
        'SELECT id, text, completed FROM todos WHERE id=?', [id]).fetchone()
    if row:
        return _from_row(row)


def list(db):
    return [_from_row(row) for row in db.execute(
        'SELECT id, text, completed FROM todos ORDER BY `order` DESC, id')]


def set_order(db, todoIds):
    dbIds = [todo['id'] for todo in list(db)]  # FIXME list is a bad name...
    if (set(todoIds) != set(dbIds)):
        return False

    # order is descending, making new entries without order come last
    todoIds.reverse()
    cursor = db.cursor()
    for order, todoId in enumerate(todoIds):
        cursor.execute(
            'UPDATE todos SET `order`=? WHERE id=?', [order, todoId])
    db.commit()
    return True


def to_json(todo):
    completed = todo['completed']
    if completed:
        todo['completed'] = "%sZ" % completed.isoformat()
    return todo


def from_json(data):
    try:
        completed = data['completed']
        if completed:
            parsed = dateutil.parser.parse(completed)
            if not parsed:
                return None
            # remove utc offset and tzinfo, otherwise sqlite can't convert the
            # values back when reading from db.
            # http://bugs.python.org/issue19065
            completed = (parsed - parsed.utcoffset()).replace(tzinfo=None)
        return {
            'id': data['id'],
            'text': data['text'],
            'completed': completed
        }
    except:
        return None


def _from_row(row):
    return {
        'id': str(row[0]),
        'text': row[1],
        'completed': row[2]
    }
