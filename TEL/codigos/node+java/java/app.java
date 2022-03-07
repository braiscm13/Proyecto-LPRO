import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.net.InetAddress;

import java.io.IOException;

import javax.swing.*;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class app{

    private ActionListener ALl;
    private ActionEvent e;
    private JFrame frame;
    private JButton button1;
    public app(/*File QR,InetAddress server*/){
        frame = new JFrame("My First GUI");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(300,300);
        button1 = new JButton("Press");
        /*button1.addActionListener(ALl);
        ALl.actionPerformed(e);*/
        
        frame.getContentPane().add(button1);
        frame.setVisible(true);
    }
    public static void main(String[] args){
        
    }
}
