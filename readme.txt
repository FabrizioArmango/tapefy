### Fabrizio Armango

# Express
Una volta avviato il box vagrant è necessario entrare via ssh

```
vagrant ssh
```

ed eseguire

```
node /tapefy/bin/www
```

per startare l'applicazione in Express.


#Database
- tapefy.sql


# APK
Per buildare l'apk modificare gli l'ip sul file /tapefy-cordova/www/config.xml

```
  <!-- Allow links to example.com -->
  <allow-navigation href="http://192.168.33.10/*"/>

  <!-- Wildcards are allowed for the protocol, as a prefix to the host, or as a suffix to the path -->
  <allow-navigation href="*://*192.168.33.10/*"/>
```


e in /tapefy-cordova/js/index.js

```
window.location = "http://192.168.33.10:3001";
```

e infine eseguendo il seguente comando, verrà generato l'apk

```
cordova build android
```
