import json
from django.conf import settings
from .serializers import UserAccountSerializer
from .models import UserAccount
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User = get_user_model()

class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self,request, format=None):
        data = self.request.data
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        email = data['email']
        password1 = data['password1']
        password2 = data['password2']

        if password1 == password2:
            if User.objects.filter(email=email).exists():
                return Response({ "error":"User Already Exists" })
            else:
                if len(password1) < 6:
                    return Response({ "error":"Password Must be of atleast 6 characters"})
                else:
                    if User.objects.filter(username=username).exists():
                        return Response({ "error":"UserName already exists.Choose a different one" })
                    else:
                        user = UserAccount.objects.create(first_name=first_name,
                        last_name=last_name,
                        email=email,
                        password=password1,
                        username=username
                        )
                        user.save()
                        del user.password
                        serializer = UserAccountSerializer(user,many=False)
                        return Response({"user":serializer.data,"message":"Successfully Created your account"})
        else:
            return Response({ "error":"Passwords do not match"})



class LoginSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # custom data for frontend
        user = UserAccount.objects.get(username = attrs["username"])
        serialized_user = UserAccountSerializer(user,many=False)
        data["user"] = serialized_user.data


        return data

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class UpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser]

    def post(self, request,format=None):
        data=self.request.data
        print(self.request.data)
        user = User.objects.get(username=self.request.user.username)
        user_account = UserAccount.objects.get(username=self.request.user.username)
        if user.check_password(data["password"]):

            if data["first_name"]:
                if data["first_name"] != "" and len(data["first_name"].strip(" ")) != 0:
                    user_account.first_name = data["first_name"]
                    user_account.save()
                    user.first_name = user_account.first_name
                    user.save()
            
            if data["last_name"]:
                if data["last_name"] != "" and len(data["last_name"].strip(" ")) != 0:
                    user_account.last_name = data["last_name"]
                    user_account.save()
                    user.last_name = user_account.last_name
                    user.save()

            if data["email"]:
                if data["email"] != "" and len(data["email"].strip(" ")) != 0:
                    user_account.email = data["email"]
                    user_account.save()
                    user.email = user_account.email
                    user.save()

            if data["username"]:
                if data["username"] != "" and len(data["username"].strip(" ")) != 0:
                    user_account.username = data["username"]
                    user_account.save()
                    user.username = user_account.username
                    user.save()

            if data["image"]:
                if data["image"] != "" and type(data["image"]) is not None:
                    storage, path,name = user_account.image.storage, user_account.image.path,user_account.image.name

                    if name != "photo.png":
                        storage.delete(path)
                    user_account.image = data["image"]
                    user_account.save()

            if data["new_password"]:
                if data["new_password"] != "" and len(data["new_password"].strip(" ")) != 0:
                    user.set_password(data["new_password"])
                    user.save()
                    user_account.password = user.password
                    user.save()
        else:
            return Response({"error":"Incorrect Password"})
        
        serialized_user = UserAccountSerializer(user_account,many=False)
        return Response({"success":"Successfully Updated user","user":serialized_user.data})