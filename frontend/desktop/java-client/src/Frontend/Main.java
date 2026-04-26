package Frontend;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class Main extends Application {
    @Override
    public void start(Stage stage) {
        Label label = new Label("Hello, Welcome to the Nexus Marketplace desktop application!");
        Scene scene = new Scene(label, 400, 200);
        stage.setScene(scene);
        stage.setTitle("Nexus Marketplace");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}