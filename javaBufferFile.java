import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class BufferManipulation {

    public static void main(String[] args) {
        byte[] mifn84Model = new byte[1636]; // Substitua por seus próprios dados
        byte[] mifn84Message = createMifn84Message(mifn84Model);

        // Faça o que quiser com o mifn84Message aqui
    }

    public static void replaceForChar(ByteBuffer buffer, int position, String str) {
        byte[] bytes = str.getBytes(StandardCharsets.US_ASCII);
        buffer.position(position);
        buffer.put(bytes);
    }

    public static String getDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSS");
        return LocalDateTime.now().format(formatter);
    }

    public static String padWithSpaces(String str, int size) {
        return String.format("%1$-" + size + "s", str);
    }

    public static byte[] createMifn84Message(byte[] mifn84Model) {
        ByteBuffer mifn84Message = ByteBuffer.wrap(mifn84Model.clone());

        // header
        replaceForChar(mifn84Message, 6, padWithSpaces("", 118)); // limpar

        // YYYYMMDDHHmmssSS
        String dateTimeKey = getDate();
        replaceForChar(mifn84Message, 6, dateTimeKey);

        // msg
        replaceForChar(mifn84Message, 136, padWithSpaces("", 1570)); // limpar

        return mifn84Message.array();
    }
}
