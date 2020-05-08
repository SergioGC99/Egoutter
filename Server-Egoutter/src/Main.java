import Models.Plant;
import java.net.*;
import java.io.*;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;
public class Main {
    //objects
    static ServerSocket ss;
    static Socket s;
    static InputStreamReader isr;
    static BufferedReader br;
    static PrintStream ps;
    public static void main(String[] args) {
        //thread
        Thread socketThread = new Thread(new Runnable()
        {
            @Override 
            public void run(){
                try
                {
                    System.out.println("Opening Socket...");//status
                    ss = new ServerSocket(8080); // socket port
                    System.out.println("Socket opened...");//status
                    //keep reading 
                         s = ss.accept();//read data 
                        isr = new InputStreamReader(s.getInputStream());//read stream
                        br = new BufferedReader(isr);//lector de buffer
                        ps = new PrintStream(s.getOutputStream());//stream writter

                    while(true){
                        
                        String data = br.readLine();//read data
                        System.out.println(data+"\n");//show data
                        //send acknowledge to client
                        if(data != null){
                            System.out.println(data);
                            
                            ps.println("Data received...");
                            System.out.println(data);
                            Plant p = new Plant(data);
                            
                            p.add();
                        }
                    }
                    
                    
                }
                catch(IOException ex){
                    System.out.println(ex.getMessage());
                } catch (ParseException ex) {
                    Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
                } catch (SQLException ex) {
                    Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
                } 
            }
        });
        socketThread.start();
    }
}