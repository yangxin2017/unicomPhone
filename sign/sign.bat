keytool -genkey -v -keystore sign/zjb.keystore -alias zjb -keyalg RSA -keysize 2048 -validity 36000
#密码 hzspec123456
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sign/zjb.keystore -signedjar sign/zjb.apk sign/android-release-unsigned.apk zjb

#C:\Users\admin\AppData\Local\Android\sdk\build-tools\26.0.1
C:\Users\admin\AppData\Local\Android\sdk\build-tools\26.0.1\zipalign -v 4 sign/zjb.apk sign/zjb_zip.apk