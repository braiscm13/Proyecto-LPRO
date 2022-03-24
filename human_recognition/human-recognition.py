import datetime
import math
import sys
import time
import cv2
import imutils
import argparse
import numpy as np
from fps import FPS

from cam_video_stream import CamVideoStream
from file_video_stream import FileVideoStream

# source venv/bin/activate

# Set True to enter debug mode
debug_mode = True
# Sending metrics every X frame
frames_to_send_metrics = 60

# Other global variables
start_time = time.perf_counter()


# credentials_Server


def send_meter_values(people, video_fps, frames):
    # json info
    if video_fps:
        time_elapsed = frames / video_fps
        print(str(datetime.datetime.now() + datetime.timedelta(0, time_elapsed)) + " json with info " + "and there "
                                                                                                        "are " + str(
            people) + " persons")
    else:
        print(str(datetime.datetime.now()) + " json with info " + " and there are " + str(people) + " persons")


class HumanCounting:
    scale = 0.00392
    conf_threshold = 0.8
    nms_threshold = 0.3
    area_threshold = 140000
    outputlayers = []
    net = []
    fps = []

    def __init__(self):
        # read pre-trained model and config file
        self.net = cv2.dnn.readNet("/Users/juan/Documents/human_recognition/weights/yolov3.weights",
                                   "/Users/juan/Documents/human_recognition/weights/yolov3.cfg")
        layer_names = self.net.getLayerNames()
        self.outputlayers = [layer_names[i[0] - 1] for i in self.net.getUnconnectedOutLayers()]
        self.frame = None
        self.fps = FPS().start()

    # function to draw bounding box on the detected object with class name
    def draw_bounding_box(self, class_id, confidence, x, y, x_plus_w, y_plus_h):
        label = 'people'
        color = (225, 225, 0)

        cv2.rectangle(self.frame, (x, y), (x_plus_w, y_plus_h), color, 2)

        cv2.putText(self.frame, label, (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    def detect(self, video_fps):
        people = 0
        Width = self.frame.shape[1]
        Height = self.frame.shape[0]

        if debug_mode:
            blob = cv2.dnn.blobFromImage(self.frame, self.scale, (416, 416), (0, 0, 0), swapRB=True, crop=False)

            # set input blob for the network
            self.net.setInput(blob)

            # run inference through the network
            # and gather predictions from output layers
            outs = self.net.forward(self.outputlayers)

            # initialization
            class_ids = []
            confidences = []
            boxes = []

            # for each detetion from each output layer
            # get the confidence, class id, bounding box params
            # and ignore weak detections (confidence < 0.5)
            for out in outs:
                area = out.shape[0] * out.shape[1]
                for detection in out:
                    scores = detection[5:]
                    class_id = np.argmax(scores)
                    confidence = scores[class_id]
                    if confidence > self.conf_threshold and area > self.area_threshold:
                        center_x = int(detection[0] * Width)
                        center_y = int(detection[1] * Height)
                        w = int(detection[2] * Width)
                        h = int(detection[3] * Height)
                        x = center_x - w / 2
                        y = center_y - h / 2
                        class_ids.append(class_id)
                        confidences.append(float(confidence))
                        boxes.append([x, y, w, h])

            # apply non-max suppression
            indices = cv2.dnn.NMSBoxes(boxes, confidences, self.conf_threshold, self.nms_threshold)
            try:
                people = indices.size
            except AttributeError:
                people = 0
            # go through the detections remaining
            # after nms and draw bounding box
            for i in indices:
                i = i[0]
                box = boxes[i]
                x = box[0]
                y = box[1]
                w = box[2]
                h = box[3]

                self.draw_bounding_box(class_ids[i], confidences[i], math.floor(x), math.floor(y),
                                       math.floor(x + w),
                                       math.floor(y + h))
            cv2.imshow("object detection", self.frame)
            send_meter_values(people, video_fps, self.fps._numFrames)
            key = cv2.waitKey(0)
            if key == 27:
                sys.exit(0)
        else:
            if self.fps._numFrames % frames_to_send_metrics == 0:
                blob = cv2.dnn.blobFromImage(self.frame, self.scale, (416, 416), (0, 0, 0), True, crop=False)

                # set input blob for the network
                self.net.setInput(blob)

                # run inference through the network
                # and gather predictions from output layers
                outs = self.net.forward(self.outputlayers)

                # initialization
                class_ids = []
                confidences = []
                boxes = []

                # for each detetion from each output layer
                # get the confidence, class id, bounding box params
                # and ignore weak detections (confidence < 0.5)
                for out in outs:
                    area = out.shape[0] * out.shape[1]
                    #print (area)
                    for detection in out:
                        scores = detection[5:]
                        # print(scores)
                        class_id = np.argmax(scores)
                        confidence = scores[class_id]
                        if confidence > self.conf_threshold and area > self.area_threshold:
                            center_x = int(detection[0] * Width)
                            center_y = int(detection[1] * Height)
                            w = int(detection[2] * Width)
                            h = int(detection[3] * Height)
                            x = center_x - w / 2
                            y = center_y - h / 2
                            class_ids.append(class_id)
                            confidences.append(float(confidence))
                            boxes.append([x, y, w, h])

                # apply non-max suppression
                indices = cv2.dnn.NMSBoxes(boxes, confidences, self.conf_threshold, self.nms_threshold)
                if not indices.__len__() == 0:
                    people = indices.size
                # go through the detections remaining
                # after nms and draw bounding box
                for i in indices:
                    i = i[0]
                    box = boxes[i]
                    x = box[0]
                    y = box[1]
                    w = box[2]
                    h = box[3]

                    self.draw_bounding_box(class_ids[i], confidences[i], math.floor(x), math.floor(y),
                                           math.floor(x + w),
                                           math.floor(y + h))

                send_meter_values(people, video_fps, self.fps._numFrames)
            self.fps.stop()
            cv2.putText(self.frame, "FPS:" + str(round(self.fps.fps(), 2)), (650, 15), cv2.FONT_HERSHEY_SIMPLEX, 0.7,
                        (125, 125, 0), 2)
            # display output image
            cv2.imshow("object detection", self.frame)

        # wait until any key is pressed

    def detectByPathVideo(self, path):
        self.fps.update()

        '''
        video = cv2.VideoCapture(path)
        check, frame = video.read()
        '''
        fvs = FileVideoStream(path).start()
        time.sleep(1.0)

        while fvs.more():
            # check is True if reading was successful
            self.frame = fvs.read()
            self.frame = imutils.resize(self.frame, width=min(800, self.frame.shape[1]))
            self.detect(30)
            self.fps.update()

            key = cv2.waitKey(20)
            if key == 27:
                break

        cv2.destroyAllWindows()

    def detectByCamera(self):
        self.fps.update()
        cvs = CamVideoStream(src=0).start()
        # url = "rtsp://freja.hiof.no:1935/rtplive/_definst_/hessdalen02.stream"
        # cvs = CamVideoStream(src=url).start()
        # loop over some frames
        while True:
            self.frame = cvs.read()
            # self.frame = imutils.resize(self.frame, width=min(800, self.frame.shape[1]))
            self.detect(False)
            self.fps.update()
            key = cv2.waitKey(20)
            if key == 27:
                break

        cv2.destroyAllWindows()
        cvs.stop()

    def humanDetector(self, args):
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
    arg_parse = argparse.ArgumentParser()
    arg_parse.add_argument("-v", "--video", default=None, help="path to Video File ")
    arg_parse.add_argument("-c", "--camera", default=False, help="Set true if you want to use the camera.")
    return vars(arg_parse.parse_args())


if __name__ == "__main__":
    args = argsParser()
    h = HumanCounting()
    h.humanDetector(args)
