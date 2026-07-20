package L2;

public class swipingVar {
      public static void main(String[] args) {

        // another tamp var
        int x = 10;
        int y = 20;

        int z = x;
        x = y;
        y = z;

        System.out.println("x :" + x + " \n" + "y :" + y);
        System.out.println("\n");

        // add Sub + _

        int a = 3;
        int b = 6;

        a = a + b;
        b = a - b;
        a = a - b;

        System.out.println("a :" + a + " \n" + "b :" + b);
        System.out.println("\n");
        // multiply and divide
        int p = 5;
        int q = 9;

        p = p * q;
        q = p / q;
        p = p / q;

        System.out.println("p :" + p + " \n" + "q :" + q);
        System.out.println("\n");
        // XOR method
        int m = 7;
        int n = 12;
        m = m ^ n;
        n = m ^ n;
        m = m ^ n;
        System.out.println("m :" + m + " \n" + "n :" + n);
        System.out.println("\n");


        

    }
}
    

