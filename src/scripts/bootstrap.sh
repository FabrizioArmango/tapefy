#!/bin/bash

ERR_LOG=/vagrant/scripts/vm_provision.log

echo "Provisioning virtual machine..."

# fix dpkg-preconfigure: unable to re-open stdin: No such file or directory
export DEBIAN_FRONTEND=noninteractive

# Prevent on some computers the error: Could not get lock /var/lib/apt/lists/lock - open (11: Resource temporarily unavailable)
rm /var/lib/apt/lists/lock
rm /var/cache/apt/archives/lock
apt-get update > $ERR_LOG 2>&1

curl -sL https://deb.nodesource.com/setup_8.x | bash - > $ERR_LOG 2>&1

# fix Could not get lock /var/lib/dpkg/lock - open (11: Resource temporarily unavailable)
rm /var/lib/dpkg/lock
dpkg --configure -a

apt-get -y install nodejs > /dev/null 2> $ERR_LOG; [ -s $ERR_LOG ] || rm -f $ERR_LOG
