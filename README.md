# meteor-components-proof-of-concept

To run this application use:
```
meteor --settings=config/my_custom_settings.json
```
Before it works, you must add some valid amazon s3 credentials to your settings file, see `config/example.json`:
```javascript
{
    "AWSBucket": "",
    "AWSRegion": "",
    "AWSAccessKeyId": "",
    "AWSSecretAccessKey": "",
    "public": {
        "maxKBytesPerImage": 200
    }
}
```
You are free to leave those values blank but image uploads will be disabled.
