import cv2
import sys
import os

def extractFrames(name):

    os.mkdir(os.path.dirname(__file__) + "\\dataset\\" + name)
    """ If reading from args
    if len(sys.argv) > 2:
        print("Excess arguments passed.\nExiting...\n")
        sys.exit(0)
    name = sys.argv[1]
    """
    #name = input("Enter your name\n> ")
    
# Opens the inbuilt camera of laptop to capture video.
    cap = cv2.VideoCapture(os.path.dirname(__file__) + "\\videos\\" + name + '.webm')
    i = 0
    #os.chdir("../dataset/"+name+"/")
    while(cap.isOpened() and i < 100):
        ret, frame = cap.read()

        # This condition prevents from infinite looping
        # incase video ends.
        if ret == False:
            break

        # cv2.imshow("Frames",frame)
        # Save Frame by Frame into disk using imwrite method
        cv2.imwrite(os.path.dirname(__file__) + "\\dataset\\" + name + '\\Frame'+str(i)+'.jpg', frame)
        i += 1

    cap.release()
    print("Dataset Saved successfully")
    cv2.destroyAllWindows()

