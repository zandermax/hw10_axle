# hw10_axle

## To run

1. Build front end
   1. Have npm / yarn installed
   2. `cd ./react-front-end
   3. Build node using `npminstall && npm build` (or `yarn install && yarn build`) in `react-front-end` directory
2. Run back end
   1. (Optional) RECOMMENDED: create python virtual environment and activate it:
      1. `cd ../` (should be a project root)
      2. `python3 -m venv venv`
      3. Mac / *nix system: `source venv/bin/activate`
      4. Windows: `venv\Scripts\activate.bat`
   2. `cd ./flask-api`
   3. Have python3 and dependencies installed - use `pip install -r flask-api/requirements.txt`
   4. `flask run`
   5. Goto <http://localhost:5000> and have fun!
