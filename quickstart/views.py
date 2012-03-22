from django.http import HttpResponse
from django.template import RequestContext, loader
import mimetypes
import urllib2
import re

def index(request):
    t = loader.get_template('quickstart/index.html')    
    c = RequestContext(request, {'foo': 'bar',})
    return HttpResponse(t.render(c)) 
	
def getpage(request):    
    url = request.GET.get('url')        
    req = urllib2.urlopen(url)
    status_code = req.code
    mimetype = req.headers.typeheader or mimetypes.guess_type(url)
    content = req.read()
    ##encoding=req.headers['content-type'].split('charset=')[-1]
    ucontent = unicode(content, 'utf8')
    base = '<head\1><base href="' + url.decode('utf8') + '">'
    
    html = re.sub('<head(.*)>', base, ucontent, 1)
    return HttpResponse(html.encode('utf8'), status=status_code, mimetype=mimetype)
