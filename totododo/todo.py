def create(db, data):
    cursor = db.cursor()
    cursor.execute('INSERT INTO todos (text) VALUES (?)', [data['text']])
    db.commit()
    return read(db, cursor.lastrowid)


def read(db, id):
    text, = db.execute('SELECT text FROM todos WHERE id=?', [id]).fetchone()
    return {'id': id, 'text': text}


def to_json(todo):
    return todo
