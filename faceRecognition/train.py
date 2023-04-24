import cv2
import numpy as np

#Web Camera 
cap =cv2.VideoCapture(0)

face_cascade=cv2.CascadeClassifier(r"C:\Users\rajesh gulati\WebDevelopmentProjects\vihaan\faceRecognition\haarcascade_frontalface_alt.xml")
skip=0
face_data=[]
dataset_path=''
face_section=[]

#file_name=input("Enter your name : ")
file_name = "lakshay"
while True:
    ret,frame=cap.read()

    if ret==False:
        continue

    grey_frame =cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)


    faces=face_cascade.detectMultiScale(frame,1.4,5)
    faces=sorted(faces,key=lambda f:f[2]*f[3],reverse=True)
    # print(faces)

    #picking the last face
    for face in faces:
        x,y,w,h=face
        # x,y,w,h=int(x),int(y),int(w),int(h)
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,250,0),2)

        offset=5                        #0 or 5
        face_section=frame[y-offset:y+h+offset,x-offset:x+w+offset]
        face_section=cv2.resize(face_section,(80,80))

        skip+=1
        if(skip%10==0):
            face_data.append(face_section)
            print(len(face_data))
        


    cv2.imshow("Frame",frame)
    # print(face_section)
    if(len(face_section)!=0):
        cv2.imshow("face_section",face_section)

    # cv2.imshow("face_section",face_section)

    key_pressed=cv2.waitKey(1) & 0xFF
    if key_pressed ==ord('q'):
        break   


face_data=np.asarray(face_data)
face_data=face_data.reshape((face_data.shape[0],-1))
print(face_data.shape)



#Saving the data
np.save(dataset_path+file_name+'.npy',face_data)
print("Data successfully saved at ",dataset_path+file_name+'.npy')



cap.release()
cv2.destroyAllWindows()