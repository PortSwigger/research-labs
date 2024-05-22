from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='build')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def send_report(path):
    print(path)
    if path != "":
        return send_from_directory('dist', path)
    return send_from_directory('dist', 'index.html')
    

if __name__ == '__main__':
    app.run()