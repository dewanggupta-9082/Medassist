from django.shortcuts import render
from . import Pool
from django.http import JsonResponse
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt


def Admin_Login(request):
    return render(request,"AdminLogin.html")

def Admin_Logout(request):
    del request.session['ADMIN']
    return render(request,"AdminLogin.html")

def Check_Admin_Login(request):
    try:
        DB, CMD = Pool.ConnectionPooling()

        emailid = request.POST['emailid']
        password = request.POST['password']
        Q = "select * from adminlogin where emailid='{0}' and password='{1}'".format(emailid,password)
        print(Q)
        CMD.execute(Q)
        row=CMD.fetchone()
        if(row):
            request.session['ADMIN']=row

            return render(request, "DashBoard.html" ,{'AdminData':row})
        else:
            return render(request, "AdminLogin.html",{'message':'Invalid Email Id / Password'})

        DB.close()

    except Exception as e:
        return render(request, "AdminLogin", {'message': 'Something went wrong'})