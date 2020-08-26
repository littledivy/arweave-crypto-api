### HTTP API for Arweave's crypto function

This is a fork of `arweave-js`'s node cyrpto driver. The aim is to make arweave's crypto functions universal for use in multiple languages regardless of it's crypto support.

### API

The API corresponds to the crypto functions.

* `/generateJWK` 
* `/encrypt`
* `/decrypt`
* `/hash`
* `/sign`
* `/verify`

### Why?

Languages and runtimes that lack support for crypto can use this API. For example, Deno lacks the webcrypto API (as of now) therefore a standalone arweave SDK for Deno is impossible. 

PS: It is still preferred to use the native cyrpto function :)
