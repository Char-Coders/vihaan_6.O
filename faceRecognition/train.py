import cv2
import numpy as np

#Web Camera 
cap =cv2.VideoCapture(0)

face_cascade=cv2.CascadeClassifier(r"C:\Users\DELL\OneDrive\Desktop\ML\Open_cv\haarcascade_frontalface_alt.xml")
skip=0
face_data=[]
dataset_path='C:/Users/DELL/OneDrive/Desktop/ML/Open_cv/'
face_section=[]

file_name=input("Enter your name : ")

while True:
    ret,frame=cap.read()

    if ret==False:
        continue

    grey_frame =cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)


    faces=face_cascade.detectMultiScale(frame,1.4,5)
    faces=sorted(faces,key=lambda f:f[2]*f[3])
    # print(faces)

    #picking the last face
    for face in faces[-1:]:
        x,y,w,h=face
        # x,y,w,h=int(x),int(y),int(w),int(h)
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,250,0),2)

        # offset=10
        # face_section=frame[y-offset:y+h+offset,x-offset:x+w+offset]
        # face_section=cv2.resize(face_section,(100,100))   #cv2.resize(face_section, (0, 0), fx = 0.5, fy = 0.5) 

        skip+=1
        if(skip%10==0):
            face_data.append(face)
            print(len(face_data))


    cv2.imshow("Frame",frame)
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