# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.11.0](https://github.com/LuckeeDev/csl/compare/v1.10.15...v1.11.0) (2021-04-12)


### Bug Fixes

* added admin endpoints to manage platform status ([2482469](https://github.com/LuckeeDev/csl/commit/24824699632e0e2cf0598aec423a20cc5d4514d7))
* added confirmed property to users ([1d8a8fe](https://github.com/LuckeeDev/csl/commit/1d8a8fe63b17b6c051384fca1f8bfbb76b1eb8a8))
* ask for user phone when confirming an order ([27f32a3](https://github.com/LuckeeDev/csl/commit/27f32a37b570b4e4ad65aef455c2c81bdd3a7635))
* change stripe product name ([dec081e](https://github.com/LuckeeDev/csl/commit/dec081e86be4f9dc3effd701573c9d0ead6fd91a))
* confirm orders ([2d49e3f](https://github.com/LuckeeDev/csl/commit/2d49e3f99408f94d4c263d964e47b6859b2a4343))
* created dev console logger with winston ([05c852b](https://github.com/LuckeeDev/csl/commit/05c852b639fe886bbdf2e8d3595f0957dbd47c18))
* created me user routes ([c557a7b](https://github.com/LuckeeDev/csl/commit/c557a7ba80436705356c968723e82e7d08d4d965))
* delete orders from cart ([5e63531](https://github.com/LuckeeDev/csl/commit/5e63531bdbe6117d9a4e692ee0d10bd39ece4f61))
* moved session store to mongo store ([1794fb1](https://github.com/LuckeeDev/csl/commit/1794fb13f6684740baee4f55e526553114159b2f))
* prevent cart update if category is confirmed ([2113060](https://github.com/LuckeeDev/csl/commit/21130604627bd0a6154a540e7f7270274ad37f29))
* prevent user from paying if category has already been paid ([29b7c2d](https://github.com/LuckeeDev/csl/commit/29b7c2d2f5c5cce3e72117be4fd4403033251afc))
* prevent user from removing items from cart if category is confirmed ([93e837b](https://github.com/LuckeeDev/csl/commit/93e837b1e995c290f2053684437278ed4350fad3))
* product creation works, but needs refactor ([b9cdc9b](https://github.com/LuckeeDev/csl/commit/b9cdc9b2497f5f0ec60b927ddd133c2ee057233c))
* retrieve all products instead of only gadgets ([eff51af](https://github.com/LuckeeDev/csl/commit/eff51af7fcede6fc2aa0a1a0bc87c09672f03dbd))
* save prices in cents ([bbade90](https://github.com/LuckeeDev/csl/commit/bbade9089cb04b64f869fcd9220d36b921b7ffd1))
* save Stripe price ID ([e2e7682](https://github.com/LuckeeDev/csl/commit/e2e7682df63e715a7ccbc6045820679b40f4eea6))
* update state with cartID generated on the backend ([f64be3a](https://github.com/LuckeeDev/csl/commit/f64be3a38dd20bff7c7e9122396e2ce857d83237))
* use stripe product ID as product ID ([9c9d2f3](https://github.com/LuckeeDev/csl/commit/9c9d2f3ff4589b12365f3d6c6f026984f5bf00af))
* webhook integration works ([174e3ec](https://github.com/LuckeeDev/csl/commit/174e3ec2cc010e9754514b27261882e476eee56e))


### Features

* added checkout session creation and class status verification ([db385f4](https://github.com/LuckeeDev/csl/commit/db385f43b25e5fb13c8deb554a4e53ccd2f6f436))
* added platform status ([45b7d67](https://github.com/LuckeeDev/csl/commit/45b7d67d4d3d437ffb3b1e6e28eb17942370fd49))
* create products on Stripe ([43d80f8](https://github.com/LuckeeDev/csl/commit/43d80f8933f4e14fb6f559dd41df4ee06346f18d))
* full payment flow ([2b36ee6](https://github.com/LuckeeDev/csl/commit/2b36ee6ba7c0c5cac7a464d9f60e1f9bc0711e7d))


### Performance Improvements

* :zap: added redis session store ([14f4855](https://github.com/LuckeeDev/csl/commit/14f48554340efec41f954a7c0b074756d130b6a6))
* :zap: minimize passport db calls ([ef1a4f1](https://github.com/LuckeeDev/csl/commit/ef1a4f174477c6a9dcbd8cd92e9ca504c8dd2b09))
* made express session rolling ([cf67737](https://github.com/LuckeeDev/csl/commit/cf6773769d3af8bf43b6854d00040049ef8d9445))



## [1.10.9](https://github.com/LuckeeDev/csl/compare/v1.10.8...v1.10.9) (2021-03-25)



## [1.10.8](https://github.com/LuckeeDev/csl/compare/v1.10.7...v1.10.8) (2021-03-25)


### Bug Fixes

* :ambulance: fix courses' errors ([b874e44](https://github.com/LuckeeDev/csl/commit/b874e44d623ef582fd9637204e31f2892c9d2b30))
* :ambulance: remove signupsCount ([44b2eb8](https://github.com/LuckeeDev/csl/commit/44b2eb87c7522261127a35ad3d56ea043f287496))



## [1.10.7](https://github.com/LuckeeDev/csl/compare/v1.10.6...v1.10.7) (2021-03-25)


### Bug Fixes

* :ambulance: unsubscribe error users ([bfd7b2a](https://github.com/LuckeeDev/csl/commit/bfd7b2aaea75c59f2f79fb6d6697ee44bd2592a7))



## [1.10.6](https://github.com/LuckeeDev/csl/compare/v1.10.5...v1.10.6) (2021-03-25)


### Bug Fixes

* show duplicates and their count ([1ef0855](https://github.com/LuckeeDev/csl/commit/1ef08555f1200bd2a1f5f586f5b47c1a91b358da))



## [1.10.5](https://github.com/LuckeeDev/csl/compare/v1.10.4...v1.10.5) (2021-03-25)


### Bug Fixes

* further checking ([5e2c233](https://github.com/LuckeeDev/csl/commit/5e2c233176115d82bbe3752b0a5df0f73c6ca150))



## [1.10.4](https://github.com/LuckeeDev/csl/compare/v1.10.3...v1.10.4) (2021-03-25)


### Bug Fixes

* :ambulance: show signups ([d4b2ba1](https://github.com/LuckeeDev/csl/commit/d4b2ba14a4a7f30e9aa1ab58c71b874712053c94))



## [1.10.3](https://github.com/LuckeeDev/csl/compare/v1.10.2...v1.10.3) (2021-03-25)


### Bug Fixes

* :ambulance: filter array ([1e709b3](https://github.com/LuckeeDev/csl/commit/1e709b3d540109996d8bf2033f18dda992f83472))



## [1.10.2](https://github.com/LuckeeDev/csl/compare/v1.10.1...v1.10.2) (2021-03-25)


### Bug Fixes

* :ambulance: show users to remove ([20b5f49](https://github.com/LuckeeDev/csl/commit/20b5f49642b95ec96dab588caa683ad982f7247d))



## [1.10.1](https://github.com/LuckeeDev/csl/compare/v1.10.0...v1.10.1) (2021-03-25)


### Bug Fixes

* :ambulance: update query in coge ([86dbd27](https://github.com/LuckeeDev/csl/commit/86dbd27e1809fa2d1f1c858e0bf40a9ea8ccfd4d))



# [1.10.0](http:///home/luckee/projects/web/csl/compare/v1.8.33...v1.10.0) (2021-03-25)


### Bug Fixes

* :alembic: full service account process doesnt work ([ccef190](http:///home/luckee/projects/web/csl/commits/ccef190f0bed37cbdb7ce4149246bb9f92c01ee4))
* :ambulance: make coge page inactive ([0d131d3](http:///home/luckee/projects/web/csl/commits/0d131d318ef1a66fbd8367016711fc3a0ff45981))
* moved service account auth to passport ([f778290](http:///home/luckee/projects/web/csl/commits/f778290452f3a21b2f5c4f4814ff9c8a2fca3687))


### Features

* :sparkles: full service account flow works ([6aca701](http:///home/luckee/projects/web/csl/commits/6aca701855fea07ed9b061d62b13833de66560e2))
* create calendar events ([6d5898d](http:///home/luckee/projects/web/csl/commits/6d5898d93a336a44b18b8b727a4f435131a871a9))
* retrieve access token ([5d5d38b](http:///home/luckee/projects/web/csl/commits/5d5d38b20217c5e0614ce3e85c420047f00cbf08))



## [1.9.1](http:///home/luckee/projects/web/csl/compare/v1.9.0...v1.9.1) (2021-03-25)


### Bug Fixes

* server passport google strategy ([7a24eba](http:///home/luckee/projects/web/csl/commits/7a24eba90d88a3a488a98ef7626eb5326377756b))



# [1.9.0](http:///home/luckee/projects/web/csl/compare/v1.8.32...v1.9.0) (2021-03-25)


### Features

* create event with google meet call ([5c5c27c](http:///home/luckee/projects/web/csl/commits/5c5c27c0d85fb5759235dcead8b0c6b3281e1fd0))
* logging in and retrieving events works ([aa31b03](http:///home/luckee/projects/web/csl/commits/aa31b035aa7d1c9fedf6ba9489b3f7190fdba1ae))
* setup service account from ui ([fa5d768](http:///home/luckee/projects/web/csl/commits/fa5d7688dca77add85f2aa74689107715e973be0))



## [1.8.32](http:///home/luckee/projects/web/csl/compare/v1.8.31...v1.8.32) (2021-03-24)



## [1.9.1](https://github.com/LuckeeDev/csl/compare/v1.9.0...v1.9.1) (2021-03-25)


### Bug Fixes

* server passport google strategy ([7a24eba](https://github.com/LuckeeDev/csl/commit/7a24eba90d88a3a488a98ef7626eb5326377756b))



# [1.9.0](https://github.com/LuckeeDev/csl/compare/v1.8.32...v1.9.0) (2021-03-25)


### Features

* create event with google meet call ([5c5c27c](https://github.com/LuckeeDev/csl/commit/5c5c27c0d85fb5759235dcead8b0c6b3281e1fd0))
* logging in and retrieving events works ([aa31b03](https://github.com/LuckeeDev/csl/commit/aa31b035aa7d1c9fedf6ba9489b3f7190fdba1ae))
* setup service account from ui ([fa5d768](https://github.com/LuckeeDev/csl/commit/fa5d7688dca77add85f2aa74689107715e973be0))



## [1.8.32](https://github.com/LuckeeDev/csl/compare/v1.8.31...v1.8.32) (2021-03-24)


### Bug Fixes

* :lock: https in google redirect ([9bbfa6d](https://github.com/LuckeeDev/csl/commit/9bbfa6dcc641d4bfc649302091060dc2d08142ac))



## [1.8.31](https://github.com/LuckeeDev/csl/compare/v1.8.30...v1.8.31) (2021-03-24)



## [1.8.30](https://github.com/LuckeeDev/csl/compare/v1.8.29...v1.8.30) (2021-03-24)



## [1.8.29](https://github.com/LuckeeDev/csl/compare/v1.8.28...v1.8.29) (2021-03-24)



## [1.8.28](https://github.com/LuckeeDev/csl/compare/v1.8.27...v1.8.28) (2021-03-24)



## [1.8.27](https://github.com/LuckeeDev/csl/compare/v1.8.26...v1.8.27) (2021-03-24)



## [1.8.26](https://github.com/LuckeeDev/csl/compare/v1.8.25...v1.8.26) (2021-03-24)



## [1.8.25](https://github.com/LuckeeDev/csl/compare/v1.8.24...v1.8.25) (2021-03-24)



## [1.8.24](https://github.com/LuckeeDev/csl/compare/v1.8.23...v1.8.24) (2021-03-24)



## [1.8.23](https://github.com/LuckeeDev/csl/compare/v1.8.22...v1.8.23) (2021-03-24)



## [1.8.22](https://github.com/LuckeeDev/csl/compare/v1.8.21...v1.8.22) (2021-03-24)



## [1.8.21](https://github.com/LuckeeDev/csl/compare/v1.8.20...v1.8.21) (2021-03-23)


### Bug Fixes

* :ambulance: course id instead of course in subscription ([912c0c4](https://github.com/LuckeeDev/csl/commit/912c0c486044838187b15aaaaf8ea066b4fdebca))



## [1.8.20](https://github.com/LuckeeDev/csl/compare/v1.8.19...v1.8.20) (2021-03-23)



## [1.8.19](https://github.com/LuckeeDev/csl/compare/v1.8.18...v1.8.19) (2021-03-23)


### Bug Fixes

* :ambulance: server check on course limit ([bfec949](https://github.com/LuckeeDev/csl/commit/bfec949d6f86862c365e154c50c359becb524671))



## [1.8.18](https://github.com/LuckeeDev/csl/compare/v1.8.17...v1.8.18) (2021-03-23)



## [1.8.17](https://github.com/LuckeeDev/csl/compare/v1.8.16...v1.8.17) (2021-03-23)



## [1.8.16](https://github.com/LuckeeDev/csl/compare/v1.8.15...v1.8.16) (2021-03-23)



## [1.8.15](https://github.com/LuckeeDev/csl/compare/v1.8.14...v1.8.15) (2021-03-23)



## [1.8.14](https://github.com/LuckeeDev/csl/compare/v1.8.13...v1.8.14) (2021-03-23)



## [1.8.13](https://github.com/LuckeeDev/csl/compare/v1.8.12...v1.8.13) (2021-03-23)



## [1.8.12](https://github.com/LuckeeDev/csl/compare/v1.8.11...v1.8.12) (2021-03-23)



## [1.8.11](https://github.com/LuckeeDev/csl/compare/v1.8.10...v1.8.11) (2021-03-23)


### Bug Fixes

* correctly retrieve markdown guides ([c5ac861](https://github.com/LuckeeDev/csl/commit/c5ac861323416b66848488445ba57419185c9eb2))



## [1.8.10](https://github.com/LuckeeDev/csl/compare/v1.8.9...v1.8.10) (2021-03-22)



## [1.8.9](https://github.com/LuckeeDev/csl/compare/v1.8.8...v1.8.9) (2021-03-22)



## [1.8.8](https://github.com/LuckeeDev/csl/compare/v1.8.7...v1.8.8) (2021-03-22)



## [1.8.7](https://github.com/LuckeeDev/csl/compare/v1.8.6...v1.8.7) (2021-03-22)



## [1.8.6](https://github.com/LuckeeDev/csl/compare/v1.8.5...v1.8.6) (2021-03-22)



## [1.8.5](https://github.com/LuckeeDev/csl/compare/v1.8.4...v1.8.5) (2021-03-22)



## [1.8.4](https://github.com/LuckeeDev/csl/compare/v1.8.3...v1.8.4) (2021-03-22)



## [1.8.3](https://github.com/LuckeeDev/csl/compare/v1.8.2...v1.8.3) (2021-03-22)



## [1.8.2](https://github.com/LuckeeDev/csl/compare/v1.8.1...v1.8.2) (2021-03-22)


### Bug Fixes

* prevent user from subscribing to a full course ([7d2e856](https://github.com/LuckeeDev/csl/commit/7d2e8562866dcfbf413ecb02eccdb4bef6b47a68))



## [1.8.1](https://github.com/LuckeeDev/csl/compare/v1.8.0...v1.8.1) (2021-03-22)



# [1.8.0](https://github.com/LuckeeDev/csl/compare/v1.7.10...v1.8.0) (2021-03-22)



## [1.7.10](https://github.com/LuckeeDev/csl/compare/v1.7.9...v1.7.10) (2021-03-22)



## [1.7.9](https://github.com/LuckeeDev/csl/compare/v1.7.8...v1.7.9) (2021-03-22)



## [1.7.8](https://github.com/LuckeeDev/csl/compare/v1.7.7...v1.7.8) (2021-03-22)



## [1.7.7](https://github.com/LuckeeDev/csl/compare/v1.7.6...v1.7.7) (2021-03-22)



## [1.7.6](https://github.com/LuckeeDev/csl/compare/v1.7.5...v1.7.6) (2021-03-22)



## [1.7.5](https://github.com/LuckeeDev/csl/compare/v1.7.4...v1.7.5) (2021-03-22)



## [1.7.4](https://github.com/LuckeeDev/csl/compare/v1.7.3...v1.7.4) (2021-03-22)



## [1.7.3](https://github.com/LuckeeDev/csl/compare/v1.7.2...v1.7.3) (2021-03-22)



## [1.7.2](https://github.com/LuckeeDev/csl/compare/v1.7.1...v1.7.2) (2021-03-22)



## [1.7.1](https://github.com/LuckeeDev/csl/compare/v1.7.0...v1.7.1) (2021-03-22)



# [1.7.0](https://github.com/LuckeeDev/csl/compare/v1.6.15...v1.7.0) (2021-03-22)


### Bug Fixes

* last fixes before deployment ([fb19d70](https://github.com/LuckeeDev/csl/commit/fb19d70cc10955134b25df7a0ddfcbe8d220ddb8))
* made course creation exclusive to admin ([37cc9a8](https://github.com/LuckeeDev/csl/commit/37cc9a83abf53bcb0575ead1d87355ba205aa372))
* og:image ([a36599f](https://github.com/LuckeeDev/csl/commit/a36599f029bc1f50aac032572a0e17257a90c882))
* show course details in admin page ([58d9553](https://github.com/LuckeeDev/csl/commit/58d95538720edec700d9815d54c3aa215efd27b3))
* show courses subscription count in the ui ([af83823](https://github.com/LuckeeDev/csl/commit/af83823df1532ee21dbc563e0e4c1a23be4ce8ee))


### Features

* change way signups work ([2fa5e69](https://github.com/LuckeeDev/csl/commit/2fa5e695d566bbee1856c4cb1ec88ee9bf7e70a2))
* course sign up ([1546acf](https://github.com/LuckeeDev/csl/commit/1546acfcfb2fa192ec9c77ad8631a418decd5d0f))
* create courses from the admin dashboard ([ac7c7d9](https://github.com/LuckeeDev/csl/commit/ac7c7d91d2a6e2cccb6570b160af38e78a2a9dee))
* retrieve courses from the backend ([958eda0](https://github.com/LuckeeDev/csl/commit/958eda084a0b24472c7f77804de51dd5ffffba2e))



## [1.6.15](https://github.com/LuckeeDev/csl/compare/v1.6.14...v1.6.15) (2021-02-05)



## [1.6.14](https://github.com/LuckeeDev/csl/compare/v1.6.13...v1.6.14) (2021-02-05)



## [1.6.13](https://github.com/LuckeeDev/csl/compare/v1.6.12...v1.6.13) (2021-02-05)



## [1.6.12](https://github.com/LuckeeDev/csl/compare/v1.6.11...v1.6.12) (2021-02-05)



## [1.6.11](https://github.com/LuckeeDev/csl/compare/v1.6.10...v1.6.11) (2021-02-05)



## [1.6.10](https://github.com/LuckeeDev/csl/compare/v1.6.9...v1.6.10) (2021-02-05)



## [1.6.9](https://github.com/LuckeeDev/csl/compare/v1.6.8...v1.6.9) (2021-02-05)



## [1.6.8](https://github.com/LuckeeDev/csl/compare/v1.6.7...v1.6.8) (2021-02-04)



## [1.6.7](https://github.com/LuckeeDev/csl/compare/v1.6.6...v1.6.7) (2021-02-04)


### Bug Fixes

* **do:** :rocket: make env available to do process ([a875232](https://github.com/LuckeeDev/csl/commit/a875232ef6c6afbedbd5f34834a1efed007ef1a0))
* **do:** :rocket: moved service account in env variables ([e787d49](https://github.com/LuckeeDev/csl/commit/e787d49e74d929bc31d4aedeec4c8d6eada2d8f6))
* **do:** :wrench: moved all env to a .env file ([11a66f6](https://github.com/LuckeeDev/csl/commit/11a66f6cd3b80b281a7a826028987a57684c5fd8))
* **do:** :wrench: moved service account json to environments ([6755d87](https://github.com/LuckeeDev/csl/commit/6755d87a13abdff7e2a68fb12aba1c9453201b47))
* **env:** :wrench: added firebase credentials to env variables ([3a32e65](https://github.com/LuckeeDev/csl/commit/3a32e65ae36a120c2d83e94300be17007b838da0))
* **env:** :wrench: changed env port ([658be63](https://github.com/LuckeeDev/csl/commit/658be635774f4568ffb2df77e8e11de3178ee713))



## [1.6.6](https://github.com/LuckeeDev/csl/compare/v1.6.5...v1.6.6) (2021-02-04)



## [1.6.5](https://github.com/LuckeeDev/csl/compare/v1.6.4...v1.6.5) (2021-02-04)



## [1.6.4](https://github.com/LuckeeDev/csl/compare/v1.6.3...v1.6.4) (2021-02-04)



## [1.6.3](https://github.com/LuckeeDev/csl/compare/v1.6.2...v1.6.3) (2021-02-04)



## [1.6.2](https://github.com/LuckeeDev/csl/compare/v1.6.1...v1.6.2) (2021-02-04)



## [1.6.1](https://github.com/LuckeeDev/csl/compare/v1.6.0...v1.6.1) (2021-02-01)



# [1.6.0](https://github.com/LuckeeDev/csl/compare/v1.5.0...v1.6.0) (2021-02-01)
