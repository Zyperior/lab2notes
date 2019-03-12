package iths.andreas.lab2g.notes;

public class NoteNotFoundExeption extends RuntimeException {

    String message;

    public NoteNotFoundExeption(String message){
        this.message = message;
    }
}
