# import the necessary packages
from threading import Thread
import sys
import cv2

# import the Queue class from Python 3
if sys.version_info >= (3, 0):
    from queue import Queue
# otherwise, import the Queue class for Python 2.7
else:
    # from Queue import Queue
    assert False, "Python 3 or higher are required"

queue_size = 512


class FileVideoStream:

    def __init__(self, path, queueSize=queue_size):
        # initialize the file video stream along with the boolean
        # used to indicate if the thread should be stopped or not
        self.stream = cv2.VideoCapture(path)
        self.stopped = False
        # initialize the queue used to store frames read from
        # the video file
        self.Q = Queue(maxsize=queueSize)
        self.video_fps = 0
        self.bool = True
        self.frames_buffered = 0

    # starts a thead separate from the main
    def start(self):
        # start a thread to read frames from the file video stream
        t = Thread(target=self.update, args=())
        t.daemon = True
        t.start()
        return self

    # reading and decoding frames
    def update(self):
        # keep looping infinitely
        while True:
            # if the thread indicator variable is set, stop the
            # thread
            if self.stopped:
                return
            # otherwise, ensure the queue has room in it
            if not self.Q.full():
                # read the next frame from the file
                (grabbed, frame) = self.stream.read()
                if self.bool:
                    self.video_fps = round(self.stream.get(cv2.CAP_PROP_FPS))
                    if grabbed:
                        self.bool = False

                # if the `grabbed` boolean is `False`, then we have
                # reached the end of the video file
                if not grabbed and not self.bool:
                    print('Video read finished, emptying buffer')
                    self.stop()
                    return
                if not grabbed:
                    print('Video Not Found. Please Enter a Valid Path (Full path of Video Should be Provided).')
                    self.stop()
                    return
                # add the frame to the queue
                self.Q.put(frame)
                self.frames_buffered += 1
                #print(self.frames_buffered)

    def read(self):
        # return next frame in the queue
        return self.Q.get()

    def more(self):
        # return True if there are still frames in the queue
        return self.Q.qsize() > 0

    def stop(self):
        # indicate that the thread should be stopped
        self.stopped = True
