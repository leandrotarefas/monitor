import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Arrays;
import java.util.List;

public class FileToBuffer {

    public static void main(String[] args) {
        List<String> filePaths = Arrays.asList("example1.txt", "example2.txt"); // Altere para os caminhos dos seus arquivos de texto
        StringBuilder combinedContent = readFilesToBuffer(filePaths);

        if (combinedContent != null) {
            sendContentToSocketServer("localhost", 3000, combinedContent.toString());
        } else {
            System.out.println("Erro ao ler os arquivos.");
        }
    }

    public static StringBuilder readFilesToBuffer(List<String> filePaths) {
        StringBuilder content = new StringBuilder();

        for (String filePath : filePaths) {
            try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
                String line;
                while ((line = br.readLine()) != null) {
                    content.append(line).append(System.lineSeparator());
                }
            } catch (IOException e) {
                System.err.println("Erro ao ler o arquivo: " + e.getMessage());
                return null;
            }
        }

        return content;
    }

    public static void sendContentToSocketServer(String host, int port, String content) {
        try (Socket socket = new Socket(host, port);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true)) {
            out.println(content);
        } catch (IOException e) {
            System.err.println("Erro ao enviar o conteúdo para o servidor de soquete: " + e.getMessage());
        }
    }
}
