from django.shortcuts import render
from . import Pool
from django.http import JsonResponse
from django.views.decorators.clickjacking import xframe_options_exempt
@xframe_options_exempt

def Brand_Interface(request):
    try:
        admin = request.session['ADMIN']
        return render(request, 'Brand.html')
    except:
        return render(request, 'AdminLogin.html')


@xframe_options_exempt


def Submit_Brand(request):

    try:
        DB,CMD=Pool.ConnectionPooling()

        categoryid=request.POST['categoryid']
        subcategoryid=request.POST['subcategoryid']
        brandname=request.POST['brandname']
        contactperson=request.POST['contactperson']
        mobilenumber=request.POST['mobilenumber']
        status = request.POST['status']
        brandicon=request.FILES['brandicon']

        Q ="Insert into brands(categoryid,subcategoryid,brandname,contactperson,mobilenumber,brandicon,status) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}')".format(categoryid, subcategoryid, brandname, contactperson, mobilenumber, brandicon.name, status)
        print(Q)

        F = open("C:/users/Asus/medassist_ecom/assets/" + brandicon.name, 'wb')

        for chunk in brandicon.chunks():
            F.write(chunk)
        F.close()

        CMD.execute(Q)
        DB.commit()
        DB.close()
        return render(request, "Brand.html", {'message': 'Brand added'})

    except Exception as e:
        print("Error:", e)
        return render(request, "Brand.html", {'message': 'Not Added'})

@xframe_options_exempt


def Display_All_Brands(request):
    try:
        admin = request.session['ADMIN']
    except:
        return render(request, 'AdminLogin.html')

    try:
      DB,CMD=Pool.ConnectionPooling()
      Q="select * from brands"
      CMD.execute(Q)
      records=CMD.fetchall()

      DB.close()
      return render(request,'DisplayBrands.html',{'records':records})
    except Exception as e:
      print('Error:', e)
      return render(request,'DisplayBrands.html', {'records': None})

@xframe_options_exempt

def Edit_Brand(request):
 try:
    DB,CMD=Pool.ConnectionPooling()
    brandid=request.GET['brandid']
    categoryid=request.GET['categoryid']
    subcategoryid = request.GET['subcategoryid']
    brandname=request.GET['brandname']
    contactperson=request.GET['contactperson']
    mobilenumber=request.GET['mobilenumber']
    #status = request.GET['status']

    Q = "update brands set categoryid='{0}',subcategoryid='{1}',brandname='{2}',contactperson='{3}',mobilenumber='{4}' where brandid='{5}'".format(categoryid, subcategoryid, brandname, contactperson, mobilenumber, brandid)
    print(Q)
    CMD.execute(Q)
    DB.commit()
    DB.close()

    return JsonResponse({'result': True}, safe=False)

 except Exception as e:
     print("Error:",e)
     return JsonResponse({'result': False}, safe=False)

@xframe_options_exempt


def Delete_Brands(request):
 try:
    DB,CMD=Pool.ConnectionPooling()

    brandid = request.GET['brandid']

    Q = "delete from brands where  brandid='{0}'".format(brandid)
    print(Q)
    CMD.execute(Q)
    DB.commit()
    DB.close()

    return JsonResponse({'result': True}, safe=False)

 except Exception as e:
     print("Error:",e)
     return JsonResponse({'result': False}, safe=False)

@xframe_options_exempt


def Edit_BrandIcon(request):
     try:
         DB, CMD = Pool.ConnectionPooling()

         brandid = request.POST['brandid']
         brandicon = request.FILES['brandicon']
         Q = "update brands set brandicon='{0}' where brandid={1}".format(brandicon.name, brandid)
         print(Q)
         F = open("C:/users/Asus/medassist_ecom/assets/" + brandicon.name, 'wb')
         for chunk in brandicon.chunks():
             F.write(chunk)
         F.close()

         CMD.execute(Q)
         DB.commit()
         DB.close()
         return JsonResponse({'result': True}, safe=False)
     except Exception as e:
         print("Error:", e)
         return JsonResponse({'result': False}, safe=False)

@xframe_options_exempt

def Fetch_All_Brand_Json(request):
    try:
        DB, CMD = Pool.ConnectionPooling()

        categoryid=request.GET['categoryid']
        subcategoryid = request.GET['subcategoryid']
        Q = "select * from brands where categoryid={0} and subcategoryid={1}".format(categoryid,subcategoryid)
        print(Q)
        CMD.execute(Q)
        records = CMD.fetchall()
        DB.close()

        return JsonResponse({'data': records}, safe=False)

    except Exception as e:
        print("Error:",e)
        return JsonResponse({'data': None}, safe=False)





