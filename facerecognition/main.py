from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.post('/api/video/capture')
def getVideoCap():
    print('hmm')
    buffer = request.files.get('file')
    name = request.form.get('name')
    print(name)
    print('got buffer: ')
    buffer = buffer.read()
    return "done"

@app.post('/api/register')
def register():
    print('hmm')
    data = request.data.decode()
    print(data)
    return {'error': 0, 'status': 'OK'}


if __name__ == "__main__":
    app.run(port=8081)