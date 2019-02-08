### simple_mjpeg-server

##### you need have
- ubuntu (or any linux distribution)
- install gstreamer
- install Node.js (latest lts)
- usb camera

##### test gstreamer can work
```
gst-launch-1.0 v4l2src ! videoconvert ! ximagesink
```

##### run this project
1. run server.js script by command
```
node server.js
```

2. run gstreamer command
```
gst-launch-1.0 v4l2src ! videoconvert ! jpegenc ! tcpclientsink host=127.0.0.1 port=53301
```

3. enjoy

##### issue
1. browser compatibility (only tested on the chrome 71)
