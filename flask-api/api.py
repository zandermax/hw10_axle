from flask import (Flask, render_template, request)

import feedparser
import pprint
import requests
import time
import urllib.parse

app = Flask(__name__)

pp = pprint.PrettyPrinter(indent=4)

# Set search string based on search engine, first element is pre search query, second is post
engineSwitcher = {
    'bing': ['http://bing.com/results.aspx?q=', '&format=rss'],
    'ebay': ['https://www.ebay.com/sch/i.html?_nkw=', '&_rss=1'],
    'googlenews': ['https://news.google.com/rss/search?q=', ''],
    'reddit': ['https://www.reddit.com/search.rss?q=', ''],
    'stackoverflow': ['https://stackoverflow.com/feeds/tag/', '']
}

@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/search", methods = ['POST'])
def perform_search():
    if request.method == 'POST':
        result_json = request.get_json()
        search = result_json['searchText']
        engine = result_json['searchEngine']
        # create encoded URL
        quoted_search_term = urllib.parse.quote(search)

        base_url = engineSwitcher[engine][0]
        rss_feed_url = base_url + f'{format(quoted_search_term)}{engineSwitcher[engine][1]}'
        # send request
        r = requests.get(rss_feed_url, headers={'User-agent': 'Teddy Salad'})

        # Handle any errors
        if r.status_code != 200:
            result = 'ERROR'
        else:
            f = feedparser.parse(r.text)
            result = f.entries
        return {'engine': engine, 'result': result}
