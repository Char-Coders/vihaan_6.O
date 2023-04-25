import cv2
import sys
import os

def main(buffer, name):
    """ If reading from args
    if len(sys.argv) > 2:
        print("Excess arguments passed.\nExiting...\n")
        sys.exit(0)
    name = sys.argv[1]
    """
    #name = input("Enter your name\n> ")
    os.chdir("dataset\\")
    if os.path.isdir(name):
        os.chdir(name)
        if len(os.listdir()) == 0:
            print("Empty dataset for {0}".format(name))
        else:
            print("Dataset for {0} already exists".format(name))
            sys.exit(0)
    else:
        print("Creating dataset at dataset\\{0}\n".format(name))
        os.mkdir(name)
        os.chdir(name)
# Opens the inbuilt camera of laptop to capture video.
    cap = cv2.VideoCapture(0)
    i = 0
    while(cap.isOpened() and i < 100):
        ret, frame = cap.read()

        # This condition prevents from infinite looping
        # incase video ends.
        if ret == False:
            break

        # cv2.imshow("Frames",frame)
        # Save Frame by Frame into disk using imwrite method
        cv2.imwrite('Frame'+str(i)+'.jpg', frame)
        i += 1

    cap.release()
    print("Dataset Saved successfully")
    cv2.destroyAllWindows()
main()