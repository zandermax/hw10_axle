# hw10_axle

## To run

1. Build front end:
   1. Have node installed. If not, see <http://nodejs.org>.
   2. From the directory of this project go to React directory: `cd ./react-front-end`
   3. Build node project using `npm install && npm run-script build`.
1. Run back end:
   1. (Optional) RECOMMENDED: create python virtual environment and activate it:
      1. Install vitrualenv if not already installed: `python3 -m pip install --user virtualenv`
      1. `cd ../` (should be at the project root)
      1. `python3 -m venv env`
      1. Activate the virtual environment:
         1. Mac/*nix system: `source env/bin/activate`
         1. Windows: `env\Scripts\activate.bat`
      1. Go to project root: `cd ..`
   1. `cd ./flask-api`
   1. Have python3 and dependencies installed: `pip install -r requirements.txt`
   1. Start the server using the local flask executable:`../env/bin/flask run`
   1. Goto <http://localhost:5000> and have fun!
