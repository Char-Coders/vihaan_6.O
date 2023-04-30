import cv2
import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from sklearn.preprocessing import LabelEncoder
import pickle
from keras_facenet import FaceNet
import csv
import datetime

distinct_names = []
count_names = dict()
distinct_names_actual = []

# Initialize FaceNet
facenet = FaceNet()

# Load precomputed face embeddings
faces_embeddings = np.load("model/faces_embeddings.npz")
X = faces_embeddings['arr_0']
Y = faces_embeddings['arr_1']

# Encode labels using sklearn's LabelEncoder
encoder = LabelEncoder()
encoder.fit(Y)

# Load Haar Cascade classifier for face detection
haarcascade = cv2.CascadeClassifier("model/haarcascade_frontalface_default.xml")

# Load SVM model for face recognition
model = pickle.load(open("model/svm_model.pkl", 'rb'))

# Initialize video capture
cap = cv2.VideoCapture(0)

# Run face recognition in a loop
while cap.isOpened():
    # Read a frame from the video capture
    _, frame = cap.read()

    # Convert frame to RGB and grayscale
    rgb_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces using Haar Cascade
    faces = haarcascade.detectMultiScale(gray_img, 1.3, 5)

    # Iterate through detected faces
    for x, y, w, h in faces:
        # Crop and resize face image to 160x160 for FaceNet
        img = rgb_img[y:y+h, x:x+w]
        img = cv2.resize(img, (160, 160))

        # Compute face embedding using FaceNet
        img = np.expand_dims(img, axis=0)
        ypred = facenet.embeddings(img)

        # Recognize face using SVM model
        face_name = model.predict(ypred)

        # Draw rectangle and label on face in original frame
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

        # Convert label encoding back to original names
        final_name = encoder.inverse_transform(face_name)[0]
        print(final_name)
        if [final_name] not in distinct_names:
            distinct_names += [[final_name]]
        
        if final_name not in count_names.keys():
            count_names[final_name] = 1
        else:
            count_names[final_name] += count_names[final_name]

        # Put label text on bounding box
        label_size, baseline = cv2.getTextSize(final_name, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
        cv2.rectangle(frame, (x, y), (x + label_size[0], y - label_size[1] - baseline), (0, 255, 0), cv2.FILLED)
        cv2.putText(frame, str(final_name), (x, y-baseline), cv2.FONT_HERSHEY_SIMPLEX,0.5, (0, 0, 0), 1, cv2.LINE_AA)

    # Show the frame with face recognition annotations
    cv2.imshow("Face Recognition:", frame)

    # Exit if 'q' key is pressed
    # if cv2.waitKey(1) and ord('q') == 27:
    #     break

    key_pressed=cv2.waitKey(1) & 0xFF
    if key_pressed ==ord('q'):
        break 

# Release video capture and close windows
cap.release()
print(count_names)
for i in count_names.keys():
    if count_names[i] > 2000:
        distinct_names_actual += [i]
with open("result.csv", 'w', newline='') as myfile:
    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
    wr.writerow(['Name', 'Attendence', 'Time'])
    for word in distinct_names_actual:
        wr.writerow([[word], 1, datetime.datetime.now().time().__str__()])
    print("CSV written: result.csv")
print("========================\nPeople found: ")
for i in distinct_names_actual:
    print(i)
print("========================")
cv2.destroyAllWindows()