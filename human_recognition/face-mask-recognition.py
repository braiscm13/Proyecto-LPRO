import argparse
import time

import cv2
import imutils

from cam_video_stream import CamVideoStream
from file_video_stream import FileVideoStream
from yolo import YOLO

from fps import FPS


class FaceDetection:
    fps = []
    yolo = []
    classes = []
    colors = []

    def __init__(self, args):

        if args['network'] == "normal":
            print("loading yolov4...")
            self.classes = ["no mask", "mask"]
            self.colors = [(0, 0, 255), (0, 255, 0)]
            self.yolo = YOLO("/Users/juan/Documents/human_recognition/mask/yolov4-mask.cfg",
                             "/Users/juan/Documents/human_recognition/mask/yolov4_face_mask.weights", self.classes)
        else:
            print("loading yolov3-tiny-prn...")
            self.colors = [(0, 255, 0), (0, 0, 0), (0, 0, 255)]
            self.classes = ["mask", "modo facha, (no mask)q", "no mask"]
            self.yolo = YOLO("/Users/juan/Documents/human_recognition/mask/mask-yolov3-tiny-prn.cfg",
                             "/Users/juan/Documents/human_recognition/mask/mask-yolov3-tiny-prn.weights", self.classes)
        self.yolo.size = int(args['size'])
        self.yolo.confidence = float(args['confidence'])
        self.fps = FPS().start()
        self.frame = None

    def detectByCamera(self):
        self.fps.update()
        cvs = CamVideoStream(src=0).start()
        # url = "rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen02.stream"
        # cvs = CamVideoStream(src=url).start()
        # loop over some frames
        while True:
            self.frame = cvs.read()
            self.fps.update()
            width, height, results = self.yolo.inference(self.frame)
            for detection in results:
                id, name, confidence, x, y, w, h = detection
                if (not name == 'mask') and (self.fps._numFrames % 60 == 0):
                    print("Please, wear your mask")
                cx = x + (w / 2)
                cy = y + (h / 2)

                # draw a bounding box rectangle and label on the image
                color = self.colors[id]
                cv2.rectangle(self.frame, (x, y), (x + w, y + h), color, 2)
                text = "%s (%s)" % (name, round(confidence, 2))
                cv2.putText(self.frame, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
                            0.8, color, 2)

            self.fps.stop()
            cv2.putText(self.frame, "FPS:" + str(round(self.fps.fps(), 2)), (650, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        (125, 125, 0), 2)
            cv2.imshow("preview", self.frame)

            key = cv2.waitKey(20)
            if key == 27:  # exit on ESC
                break

        cv2.destroyAllWindows()
        cvs.stop()

    def detectByPathVideo(self, path):
        self.fps.update()
        fvs = FileVideoStream(path).start()
        time.sleep(1.0)

        while fvs.more():
            # check is True if reading was successful
            self.frame = fvs.read()
            self.fps.update()
            self.frame = imutils.resize(self.frame, width=min(800, self.frame.shape[1]))
            width, height, results = self.yolo.inference(self.frame)
            for detection in results:
                id, name, confidence, x, y, w, h = detection
                cx = x + (w / 2)
                cy = y + (h / 2)

                # draw a bounding box rectangle and label on the image
                color = self.colors[id]
                cv2.rectangle(self.frame, (x, y), (x + w, y + h), color, 2)
                text = "%s (%s)" % (name, round(confidence, 2))
                cv2.putText(self.frame, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
                            0.8, color, 2)

            self.fps.stop()
            cv2.putText(self.frame, "FPS:" + str(round(self.fps.fps(), 2)), (650, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        (125, 125, 0), 2)
            cv2.imshow("preview", self.frame)

            key = cv2.waitKey(20)
            if key == 27:  # exit on ESC
                break
            self.fps.update()
        cv2.destroyAllWindows()

    def mask_detection(self, args):
        video_path = args['video']
        if str(args["camera"]) == 'True':
            camera = True
        else:
            camera = False

        if camera:
            print('[INFO] Opening Web Cam.')
            self.detectByCamera()
        elif video_path is not None:
            print('[INFO] Opening Video from path.')
            self.detectByPathVideo(video_path)


def argsParser():
    args_parse = argparse.ArgumentParser()
    args_parse.add_argument('-n', '--network', default="prn", help='Network Type: normal / prn')
    args_parse.add_argument('-s', '--size', default=416, help='Size for yolo')
    args_parse.add_argument('-c', '--confidence', default=0.9, help='Confidence for yolo')
    args_parse.add_argument("-v", "--video", default=None, help="path to Video File ")
    args_parse.add_argument("-cam", "--camera", default=False, help="Set true if you want to use the camera.")
    return vars(args_parse.parse_args())


if __name__ == "__main__":
    args = argsParser()
    print (args)
    mask = FaceDetection(args)
    mask.mask_detection(args)
