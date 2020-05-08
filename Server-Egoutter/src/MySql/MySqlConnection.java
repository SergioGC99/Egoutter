package MySql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public abstract class MySqlConnection {
      //connection parameters
    private static final String SERVER = "localhost";
    private static final String DATABASE = "testdashboard";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "";
    
    //connection objects
    private static Connection connection = null;
    
    //get connection
     public static Connection getConnection() {
        if (connection == null) {
            try
            {
                //connection strinfg
                String connectionString = "jdbc:mysql://" + SERVER + "/" + DATABASE + "?user=" + USERNAME;
                //add password to connection string if needed
                if(PASSWORD != "") connectionString += "&password=" + PASSWORD;
                //MySQL Java drivers
                Class.forName("com.mysql.jdbc.Driver").newInstance();
                //MySQL connection
                connection = DriverManager.getConnection(connectionString);
            }
            catch (ClassNotFoundException ex) {
                System.out.println(ex.getMessage());
            }
            catch (InstantiationException ex) {
                System.out.println(ex.getMessage());
            }
            catch (IllegalAccessException ex) {
                System.out.println(ex.getMessage());
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return connection;
    }
}
