package Main;

import javax.swing.JFrame;
import javax.swing.JLabel;

public class SwingApp {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Nexus Marketplace App");
        frame.setSize(900, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JLabel label = new JLabel("Welcome to the Nexus Marketplace JavaSwing desktop App.", JLabel.CENTER);
        frame.add(label);

        frame.setVisible(true);
    }
}
