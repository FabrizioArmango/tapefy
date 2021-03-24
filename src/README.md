# LAMP-NodeJS
LAMP-NodeJS provide Ubuntu 18.04, Apache, PHP7.1, MySQL, phpMyAdmin and NodeJS in a flexible box for Vagrant.

## Prerequisites

Be sure to install [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [Vagrant](https://www.vagrantup.com/downloads.html) and optionally [Git](https://git-scm.com/downloads).

## First time initialization

#### From command line
```
$ git clone https://github.com/LeonardoPuccio/LAMP-NodeJS my-workspace
```

#### GUI
Simply [download](https://github.com/LeonardoPuccio/LAMP-NodeJS/archive/master.zip) and extract LAMP-NodeJS-master.zip where do you want.

## How to use

#### Start
```
$ vagrant up
```

#### Stop
```
$ vagrant halt
```

#### Terminal
*shell into the running Vagrant machine.*
```
$ vagrant ssh
```
#### Accesses

##### - From browser go to
> [http://192.168.33.10/](http://192.168.33.10/)
or
> [http://localhost/](http://localhost/)  

to see [phpinfo()](http://php.net/manual/en/function.phpinfo.php).

##### - phpMyAdmin
>[http://192.168.33.10/phpmyadmin/](http://192.168.33.10/phpmyadmin/)
or [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)

##### - Shared folder
The `www` folder is a shared folder synced with `/var/www/html` and `/vagrant/www/` in ubuntu virtual machine that corresponds to the default root folder of the web server.

*It's possible access to the database from a desktop client such as Sequel Pro or HeidiSQL.
Keep in mind that you need ssh tunneling.*

## In the box
- Ubuntu-18.04 (live-server-amd64)
- Apache (2.4.29)
- PHP7.1 (7.1.17)
- MySQL (5.7.22-0)
- phpMyAdmin
- Node.js LTS (8.x)
- npm included with Node.js LTS ([more info](https://nodejs.org/en/download/ "NodeJS"))

## Default Credential  

#### - Ubuntu Root Login
> root: vagrant  
> password: vagrant  

#### - DataBase Users

##### &nbsp; &nbsp;MySQL Admin* for phpMyAdmin  
> user: vagrantdb  
> password: vagrantdb

##### &nbsp; &nbsp;MySQL Root
> user: root  
> password: root

*Note: vagrantdb is an user with all the privileges on vagrantdb, this is needed to avoid conflict problem with the phpmyadmin access.*

## Troubleshoot

#### - nodejs and/or npm are not correctly installed
perform a new provision with:
```
$ vagrant provision
```
#### - npm install error and `EPROTO: protocol error, symlink`
It's not possible to translate symlinks in the synced folder on Windows. To prevent this issue, run:
```
$ npm install --no-bin-links
```
[Official Docs](https://docs.npmjs.com/cli/install "npm-install")
#### - Unable to access to a specific port on localhost (e.g. port 3000 for express).
If you want to access to a specific URL on a determined port on the localhost through your default browser, it's necessary forwarding that choosen port from the VM to the OS. The way to go for it is simple, just add the following string into **Vagrantfile**, after all the other forwarded ports:
```
config.vm.network "forwarded_port", guest: 3000, host: 3000
```

## References
 - [What is VirtualBox?](https://www.virtualbox.org/manual/ch01.html "VirtualBox Doc")
 - [What is Vagrant?](https://www.vagrantup.com/intro/index.html "Vagrant Doc")
 - [Why VirtualBox?](https://www.vagrantup.com/docs/providers/default.html "Vagrant Doc")
 - [What is NodeJS?](https://nodejs.org/en/ "NodeJS Home")
