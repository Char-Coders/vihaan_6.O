import numpy as np
import cv2
import os


output_name = []
# Knn


def distance(v1, v2):
    # print(v1.size)
    # print(v2.size)
    return np.sqrt(((v1 - v2) ** 2).sum())


def knn(train, test, k=3):
    dist = []

    for i in range(train.shape[0]):
        ix = train[i, :-1]
        iy = train[i, -1]

        d = distance(test, ix)
        dist.append([d, iy])

    # print(dist)

    dk = sorted(dist, key=lambda x: x[0])[:k]

    labels = np.array(dk)[:, -1]

    output = np.unique(labels, return_counts=True)

    index = np.argmax(output[1])
    return output[0][index]


cap = cv2.VideoCapture(0)

face_cascade = cv2.CascadeClassifier(
    r"C:\Users\DELL\OneDrive\Desktop\ML\Open_cv\haarcascade_frontalface_alt.xml"
)
skip = 0


dataset_path = "C:/Users/DELL/OneDrive/Desktop/ML/Open_cv/"


face_data = []
labels = []

class_id = 0
names = {}

for fx in os.listdir(dataset_path):
    if fx.endswith(".npy"):
        # creating mapping between class-id and name

        names[class_id] = fx[:-4]
        print("Loaded " + fx)
        data_item = np.load(dataset_path + fx)
        face_data.append(data_item)

        target = class_id * np.ones((data_item.shape[0],))
        class_id += 1
        labels.append(target)


face_dataset = np.concatenate(face_data, axis=0)  # here
face_labels = np.concatenate(labels, axis=0).reshape((-1, 1))

print(face_dataset.shape)
print(face_labels.shape)


trainset = np.concatenate((face_dataset, face_labels), axis=1)
print(trainset.shape)


# Testing


while True:
    ret, frame = cap.read()
    if ret == False:
        continue

    faces = face_cascade.detectMultiScale(frame, 1.4, 5)
    for face in faces:
        x, y, w, h = face
        offset = 10

        face_section = frame[y - offset : y + h + offset, x - offset : x + h + offset]
        face_section = cv2.resize(face_section, (80, 80))

        out = knn(trainset, face_section.flatten())

        pred_name = names[int(out)]
        output_name.append(pred_name)
        # cv2.putText(frame,pred_name,(x,y-10),cv2.FONT_HERSHEY_SIMPLEX,1,(255,250,0),2,cv2.LINE_AA)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 255), 2)

    cv2.imshow("Faces", frame)

    key_pressed = cv2.waitKey(1) & 0xFF
    if key_pressed == ord("q"):
        break


cap.release()
print(max(output_name))
cv2.destroyAllWindows()
