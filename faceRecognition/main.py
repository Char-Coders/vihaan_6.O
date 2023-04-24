from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.post('/video/capture')
def getVideoCap():
    buffer = request.files['data']
    print('got buffer: ')
    print(len(buffer))

if __name__ == "__main__":
    app.run(port=8081)