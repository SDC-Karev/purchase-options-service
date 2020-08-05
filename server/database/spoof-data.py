import os
import re
import urllib.parse
import json

from bs4 import BeautifulSoup
from urllib.request import urlopen, Request

def _getPage(url):
    # context = ssl._create_unverified_context()
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers={'User-Agent':user_agent,}
    req = Request(url, None, headers)

    with urlopen(req) as response:
        return BeautifulSoup(response, 'html.parser')


if __name__ == '__main__':
  u = "https://store.steampowered.com/tag/browse/#global_492";
  soup = _getPage(u);
  rs = [s.text for s in soup.findAll('div', {'class': 'tag_browse_tag'})]
  with open('tags.json', 'w+') as f:
    json.dump(rs, f, indent=2)