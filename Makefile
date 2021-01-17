mongo:
	mongod --dbpath /var/lib/mongo/ --fork --logpath /var/log/mongodb/mongod.log --config /etc/mongod.conf
