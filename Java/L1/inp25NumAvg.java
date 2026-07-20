package L1;
import java.util.Scanner;

public class inp25NumAvg {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int sum = 0;

        int n = 25;

        for (int i = 0; i < n; i++) {

            int v = sc.nextInt();
            sum = sum + v;
        }
        int avg = sum / n;
        System.out.println("Avg :" + avg);

    }

}