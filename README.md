Locations
=========

Location generator in node

Install
-------

```
$ npm install
```

Usage
-----

### Find

ACTION=find LATITUDE_RANGE=<lower bound>-<upper bound> LONGITUDE_RANGE=<lower bound>-<upper bound> TIMESTAMP_RANGE=<lower bound>-<upper bound> npm start

Example:
```
$ ACTION=find LATITUDE_RANGE=20-30 npm start
```

If it is needed to search for the exact value rather than a range just specify only the value in front of the relevant tag.

ACTION=find LATITUDE_RANGE=<value> LONGITUDE_RANGE=<value> TIMESTAMP_RANGE=<value> npm start

Example:
```
ACTION=find LONGITUDE_RANGE=75 npm start
```

### delete

ACTION=delete LATIDUE_RANDE=<lower bound>-<upper bound> LONGITUDE_RANGE=<lower bound>-<upper bound> npm start

Example:
```
$ ACTION=delet LATITUDE_RANGE=20-30 npm start
```

Author
------

* Akila Nonis - <akila@anthillsolutions.ch>
* Kasun Samarasinghe - <kasun@anthillsolutions.ch>
* Ishara Udayanga - <lisharaudayanga@gmail.com>
* Pierre Repetto-Andipatin - <pierre@anthillsolutions.ch>

License
-------

MIT
