from django.shortcuts import render
from django.template import loader

from django.http import HttpResponse
from mytask.utility import Crawler
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def crawl(request):
	data = json.loads(request.body.decode('utf-8'))
	link = data.get('link')
	depth = int(data.get('depth', 3))
	crawler = Crawler()
	crawler.fetch_data([link], depth)
	result = crawler.crawled_links
	print(len(result))
	return HttpResponse(json.dumps(result))
