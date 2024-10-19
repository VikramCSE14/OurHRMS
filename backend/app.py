from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/timesheets', methods=['GET'])
def get_timesheets():
    timesheets = [
        {"id": 1, "status": "Pending", "count": 20},
        {"id": 2, "status": "Submitted", "count": 0},
        {"id": 3, "status": "Saved Drafts", "count": 0},
        {"id": 4, "status": "Returned", "count": 0},
        {"id": 5, "status": "Approved", "count": 0},
    ]
    return jsonify(timesheets)

# New route to get pending timesheet dates
@app.route('/api/timesheets/pending', methods=['GET'])
def get_pending_timesheet_dates():
    pending_dates = [
        "2024-09-20",
        "2024-09-21",
        "2024-09-22",
        "2024-09-25",
    ]
    return jsonify(pending_dates)

if __name__ == '__main__':
    app.run(debug=True)
