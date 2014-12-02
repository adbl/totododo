def create(db, data):
    cursor = db.cursor()
    cursor.execute('INSERT INTO todos (text) VALUES (?)', [data['text']])
    db.commit()
    return read(db, cursor.lastrowid)


def read(db, id):
    row = db.execute('SELECT id, text FROM todos WHERE id=?', [id]).fetchone()
    if row:
        return _from_row(row)


def list(db):
    return [_from_row(row) for row in
            db.execute('SELECT id, text FROM todos')]


def to_json(todo):
    return todo


def _from_row(row):
    return {'id': str(row[0]), 'text': row[1]}
