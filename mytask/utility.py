import bs4
import requests
import urllib.parse
import re

class Crawler:
    def __init__(self):
        self.crawled_links = []
        self.links = []
        # self.seed_link = seed_link
        # self.depth = depth

    def fetch_data(self, links, depth):
        next_links = []
        if depth != 0:
            for link in links:

                if link not in self.links:
                    pattern = re.compile(link)

                    response = requests.get(link)
                    if response.status_code == 200:
                        html_text = response.text
                        soup = bs4.BeautifulSoup(html_text, "html.parser")

                        page_links = soup.findAll('a')
                        images = soup.findAll('img')
                        image_list = []
                        for image in images:
                            image_list.append(image.get('src'))

                        self.crawled_links.append({"link": link, "images": list(set(image_list))})
                        self.links.append(link)
                        for link in page_links:
                            new_link = link.get('href')
                            if new_link:
                                print(new_link)
                                match = pattern.match(new_link)
                                if match:
                                    next_links.append(new_link)
            print(next_links)
            self.fetch_data(next_links, depth - 1)







