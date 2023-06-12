from django.shortcuts import render
from django.views.decorators.clickjacking import xframe_options_exempt
@xframe_options_exempt


def Security(request,page):
    try:
        admin = request.session['ADMIN']
        return render(request,page)
    except:
        return render(request, 'AdminLogin.html')
