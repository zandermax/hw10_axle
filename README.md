# hw10_axle

## To run

### Option1 - Run the script:
   1. Get permission to run the script (Mac/*nix systems):
      * `chmod a+x ./run.sh`
   2. Run it
      * `./run.sh'

### Option 2 - Manually build and run it yourself:
1. Build front end:
   1. Have node installed. If not, see <http://nodejs.org>.
   2. From the directory of this project go to React directory:
      * `cd [root]/react-front-end`
   3. Build node project:
      * `npm install`
      * `npm run-script build`
1. Go back to root directory:
   * `cd ../`
1. Run back end:
   1. (Optional) RECOMMENDED: create python virtual environment and activate it:
      1. Install vitrualenv if not already installed:
         * `pip3 install --user virtualenv`
      1. Create the virtual environment:
         * `python3 -m venv env`
      1. Activate the virtual environment:
         1. Mac/*nix system: 
            * source [root]/env/bin/activate`
         1. Windows:
            * `[root]\env\Scripts\activate.bat`
      1. Go back to project root:
         * `cd ../`
   1. Go to back end directory:
      * `cd [root]/flask-api`
   1. Install python dependencies:
      * `pip3 install -r requirements.txt`
   1. Start the server using the local flask executable:
      * `[root]/env/bin/flask run`
1. Goto <http://localhost:5000> and have fun!
